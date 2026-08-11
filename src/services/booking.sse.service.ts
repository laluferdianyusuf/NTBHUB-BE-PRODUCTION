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
let subscriberInitializing: Promise<void> | null = null;

async function ensureBookingSubscriber(): Promise<void> {
  if (subscriberReady) {
    return;
  }

  if (subscriberInitializing) {
    return subscriberInitializing;
  }

  subscriberInitializing = (async () => {
    try {
      bookingSubscriber.on("message", (channel, message) => {
        if (channel !== BOOKING_SSE_CHANNEL) {
          return;
        }

        try {
          const parsed = JSON.parse(message);

          const { bookingId, event, payload } = parsed;

          if (!bookingId || !event) {
            console.warn("[BOOKING SSE] Invalid Redis event:", parsed);

            return;
          }

          console.log("[BOOKING SSE] Redis event:", {
            bookingId,
            event,
          });

          deliverToBookingClients(String(bookingId), String(event), payload);
        } catch (error) {
          console.error(
            "[BOOKING SSE] Failed to process Redis message:",
            error,
          );
        }
      });

      await bookingSubscriber.subscribe(BOOKING_SSE_CHANNEL);

      subscriberReady = true;

      console.log("[BOOKING SSE] Redis subscriber ready:", BOOKING_SSE_CHANNEL);
    } catch (error) {
      subscriberReady = false;

      console.error("[BOOKING SSE] Failed to initialize subscriber:", error);

      throw error;
    } finally {
      subscriberInitializing = null;
    }
  })();

  return subscriberInitializing;
}

function deliverToBookingClients(
  bookingId: string,
  event: string,
  payload: unknown,
) {
  const connections = clients.get(bookingId);

  if (!connections || connections.size === 0) {
    console.log("[BOOKING SSE] No active clients:", bookingId);

    return;
  }

  const chunk = `event: ${event}\n` + `data: ${JSON.stringify(payload)}\n\n`;

  const isTerminal = TERMINAL_EVENTS.has(event);

  console.log("[BOOKING SSE] Delivering:", {
    bookingId,
    event,
    clients: connections.size,
    terminal: isTerminal,
  });

  for (const res of connections) {
    try {
      if (res.writableEnded || res.destroyed) {
        removeBookingClient(bookingId, res);
        continue;
      }

      res.write(chunk);

      if (isTerminal) {
        res.end();
      }
    } catch (error) {
      console.error("[BOOKING SSE] Failed to write:", error);

      removeBookingClient(bookingId, res);

      try {
        res.end();
      } catch {
        // ignore
      }
    }
  }

  if (isTerminal) {
    clients.delete(bookingId);
  }
}

function addBookingClient(bookingId: string, res: Response) {
  let connections = clients.get(bookingId);

  if (!connections) {
    connections = new Set<Response>();

    clients.set(bookingId, connections);
  }

  connections.add(res);

  console.log("[BOOKING SSE] Client added:", {
    bookingId,
    totalClients: connections.size,
  });
}

function removeBookingClient(bookingId: string, res: Response) {
  const connections = clients.get(bookingId);

  if (!connections) {
    return;
  }

  connections.delete(res);

  console.log("[BOOKING SSE] Client removed:", {
    bookingId,
    totalClients: connections.size,
  });

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
