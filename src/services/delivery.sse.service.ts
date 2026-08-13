import { Response } from "express";
import Redis from "ioredis";
import { DELIVERY_SSE_CHANNEL } from "helpers/deliveryEvents";

const clients = new Map<string, Set<Response>>();

const sseSubscriber = new Redis({
  host: process.env.REDIS_HOST ?? "127.0.0.1",
  port: Number(process.env.REDIS_PORT ?? 6379),
  maxRetriesPerRequest: null,
});

let subscriberReady = false;

const TERMINAL_EVENTS = new Set(["delivery:delivered", "delivery:cancelled"]);

async function ensureSubscriber() {
  if (subscriberReady) return;

  await sseSubscriber.subscribe(DELIVERY_SSE_CHANNEL);

  sseSubscriber.on("message", (channel, message) => {
    if (channel !== DELIVERY_SSE_CHANNEL) {
      return;
    }

    try {
      const { deliveryId, event, payload } = JSON.parse(message);

      deliverToClients(deliveryId, event, payload);
    } catch (err) {
      console.error("[Delivery SSE] Failed to process message:", err);
    }
  });

  subscriberReady = true;
}

function deliverToClients(deliveryId: string, event: string, payload: unknown) {
  const connections = clients.get(deliveryId);

  if (!connections?.size) {
    return;
  }

  const chunk = `event: ${event}\n` + `data: ${JSON.stringify(payload)}\n\n`;

  for (const res of connections) {
    try {
      res.write(chunk);

      if (TERMINAL_EVENTS.has(event)) {
        res.end();
      }
    } catch (error) {
      connections.delete(res);
    }
  }

  if (TERMINAL_EVENTS.has(event)) {
    clients.delete(deliveryId);
  }
}

function addClient(deliveryId: string, res: Response) {
  if (!clients.has(deliveryId)) {
    clients.set(deliveryId, new Set());
  }

  clients.get(deliveryId)!.add(res);
}

function removeClient(deliveryId: string, res: Response) {
  const connections = clients.get(deliveryId);

  if (!connections) {
    return;
  }

  connections.delete(res);

  if (connections.size === 0) {
    clients.delete(deliveryId);
  }
}

export async function subscribeDeliveryStream(
  deliveryId: string,
  res: Response,
) {
  await ensureSubscriber();

  res.setHeader("Content-Type", "text/event-stream");

  res.setHeader("Cache-Control", "no-cache");

  res.setHeader("Connection", "keep-alive");

  res.setHeader("X-Accel-Buffering", "no");

  res.flushHeaders();

  addClient(deliveryId, res);

  res.write(
    `event: connected\n` +
      `data: ${JSON.stringify({
        deliveryId,
      })}\n\n`,
  );

  const heartbeat = setInterval(() => {
    try {
      res.write(": keepalive\n\n");
    } catch {
      clearInterval(heartbeat);
    }
  }, 25_000);

  res.on("close", () => {
    clearInterval(heartbeat);

    removeClient(deliveryId, res);
  });
}
