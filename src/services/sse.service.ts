import { Response } from "express";
import Redis from "ioredis";
import { PAYMENT_SSE_CHANNEL } from "helpers/paymentEvents";

const clients = new Map<string, Set<Response>>();

const sseSubscriber = new Redis({
  host: process.env.REDIS_HOST ?? "127.0.0.1",
  port: Number(process.env.REDIS_PORT ?? 6379),
  maxRetriesPerRequest: null,
});

let subscriberPromise: Promise<void> | null = null;

const TERMINAL_EVENTS = new Set([
  "payment:completed",
  "payment:failed",
  "payment:expired",
]);

function ensureSubscriber() {
  if (subscriberPromise) {
    return subscriberPromise;
  }

  subscriberPromise = initializeSubscriber();

  return subscriberPromise;
}

async function initializeSubscriber() {
  await sseSubscriber.subscribe(PAYMENT_SSE_CHANNEL);

  sseSubscriber.on("message", (channel, message) => {
    if (channel !== PAYMENT_SSE_CHANNEL) {
      return;
    }

    try {
      const { paymentId, event, payload } = JSON.parse(message);

      deliverToClients(paymentId, event, payload);
    } catch (error) {
      console.error("[SSE] Failed to process message:", error);
    }
  });
}

function deliverToClients(paymentId: string, event: string, payload: unknown) {
  const connections = clients.get(paymentId);
  if (!connections?.size) return;

  const chunk = `event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`;

  for (const res of connections) {
    res.write(chunk);

    if (TERMINAL_EVENTS.has(event)) {
      res.end();
    }
  }

  if (TERMINAL_EVENTS.has(event)) {
    clients.delete(paymentId);
  }
}

function addClient(paymentId: string, res: Response) {
  if (!clients.has(paymentId)) {
    clients.set(paymentId, new Set());
  }
  clients.get(paymentId)!.add(res);
}

function removeClient(paymentId: string, res: Response) {
  const connections = clients.get(paymentId);
  if (!connections) return;

  connections.delete(res);
  if (connections.size === 0) {
    clients.delete(paymentId);
  }
}

export async function subscribePaymentStream(paymentId: string, res: Response) {
  await ensureSubscriber();

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders();

  addClient(paymentId, res);

  res.write(`event: connected\ndata: ${JSON.stringify({ paymentId })}\n\n`);

  const heartbeat = setInterval(() => {
    res.write(": keepalive\n\n");
  }, 25000);

  res.on("close", () => {
    clearInterval(heartbeat);
    removeClient(paymentId, res);
  });
}
