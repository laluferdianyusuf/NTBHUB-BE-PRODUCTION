import { Response } from "express";
import Redis from "ioredis";
import { BOOKING_SSE_CHANNEL } from "helpers/bookingEvents";

const clients = new Map<string, Set<Response>>();

const bookingSubscriber = new Redis({
  host: process.env.REDIS_HOST ?? "127.0.0.1",
  port: Number(process.env.REDIS_PORT ?? 6379),
  maxRetriesPerRequest: null,
});

let subscriberReady = false;

const TERMINAL_EVENTS = new Set([
  "booking:cancelled",
  "booking:completed",
  "booking:expired",
]);

async function ensureBookingSubscriber() {
  if (subscriberReady) return;

  await bookingSubscriber.subscribe(BOOKING_SSE_CHANNEL);

  bookingSubscriber.on("message", (channel, message) => {
    if (channel !== BOOKING_SSE_CHANNEL) {
      return;
    }

    try {
      const { bookingId, event, payload } = JSON.parse(message);

      deliverToBookingClients(bookingId, event, payload);
    } catch (error) {
      console.error("[BOOKING SSE] Failed to process:", error);
    }
  });

  subscriberReady = true;
}

function deliverToBookingClients(
  bookingId: string,
  event: string,
  payload: unknown,
) {
  const connections = clients.get(bookingId);

  if (!connections?.size) {
    console.log("[BOOKING SSE] No clients:", bookingId);

    return;
  }

  const chunk = `event: ${event}\n` + `data: ${JSON.stringify(payload)}\n\n`;

  for (const res of connections) {
    res.write(chunk);

    if (TERMINAL_EVENTS.has(event)) {
      res.end();
    }
  }

  if (TERMINAL_EVENTS.has(event)) {
    clients.delete(bookingId);
  }
}

function addBookingClient(bookingId: string, res: Response) {
  if (!clients.has(bookingId)) {
    clients.set(bookingId, new Set());
  }

  clients.get(bookingId)!.add(res);
}

function removeBookingClient(bookingId: string, res: Response) {
  const connections = clients.get(bookingId);

  if (!connections) return;

  connections.delete(res);

  if (connections.size === 0) {
    clients.delete(bookingId);
  }
}

export async function subscribeBookingStream(bookingId: string, res: Response) {
  await ensureBookingSubscriber();

  res.setHeader("Content-Type", "text/event-stream");

  res.setHeader("Cache-Control", "no-cache");

  res.setHeader("Connection", "keep-alive");

  res.setHeader("X-Accel-Buffering", "no");

  res.flushHeaders();

  addBookingClient(bookingId, res);

  res.write(
    `event: connected\n` +
      `data: ${JSON.stringify({
        bookingId,
      })}\n\n`,
  );

  const heartbeat = setInterval(() => {
    res.write(": keepalive\n\n");
  }, 25000);

  res.on("close", () => {
    clearInterval(heartbeat);

    removeBookingClient(bookingId, res);
  });
}
