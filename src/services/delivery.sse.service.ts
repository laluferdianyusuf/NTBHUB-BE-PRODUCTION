import { prisma } from "config/prisma";
import { Response } from "express";
import { DELIVERY_SSE_CHANNEL } from "helpers/deliveryEvents";
import Redis from "ioredis";

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
      console.error("[Delivery SSE] Failed to send event:", error);

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

async function getDeliverySnapshot(deliveryId: string) {
  const delivery = await prisma.delivery.findUnique({
    where: {
      id: deliveryId,
    },
    include: {
      courier: {
        select: {
          id: true,
          userId: true,
          vehicleType: true,
          plateNumber: true,
          photo: true,
          rating: true,

          user: {
            select: {
              id: true,
              name: true,
              phone: true,
              photo: true,
            },
          },
        },
      },

      order: {
        select: {
          id: true,
          total: true,

          venue: {
            select: {
              id: true,
              name: true,
              address: true,
            },
          },
        },
      },

      items: true,
    },
  });

  if (!delivery) {
    return null;
  }

  let courierLocation = null;

  if (delivery.courierId) {
    courierLocation = await prisma.courierLocation.findUnique({
      where: {
        courierId: delivery.courierId,
      },
    });
  }

  return {
    deliveryId: delivery.id,

    orderId: delivery.orderId,
    bookingId: delivery.bookingId,

    userId: delivery.userId,

    courierId: delivery.courierId,
    courierUserId: delivery.courier?.userId ?? null,

    status: delivery.status,
    paymentStatus: delivery.paymentStatus,

    pickupAddress: delivery.pickupAddress,
    dropoffAddress: delivery.dropoffAddress,

    pickupLatitude: delivery.pickupLatitude,
    pickupLongitude: delivery.pickupLongitude,

    dropoffLatitude: delivery.dropoffLatitude,
    dropoffLongitude: delivery.dropoffLongitude,

    basePrice: delivery.basePrice,
    packagePrice: delivery.packagePrice,
    speedPrice: delivery.speedPrice,
    totalPrice: delivery.totalPrice,

    note: delivery.note,

    courier: delivery.courier,

    order: delivery.order,

    items: delivery.items,

    courierLocation,

    timestamp: new Date().toISOString(),
  };
}

export async function subscribeDeliveryStream(
  deliveryId: string,
  res: Response,
) {
  await ensureSubscriber();

  res.setHeader("Content-Type", "text/event-stream");

  res.setHeader("Cache-Control", "no-cache, no-transform");

  res.setHeader("Connection", "keep-alive");

  res.setHeader("X-Accel-Buffering", "no");

  res.flushHeaders();

  addClient(deliveryId, res);

  const snapshot = await getDeliverySnapshot(deliveryId);

  if (!snapshot) {
    res.write(
      `event: delivery:error\n` +
        `data: ${JSON.stringify({
          deliveryId,
          message: "Delivery not found",
        })}\n\n`,
    );

    res.end();

    removeClient(deliveryId, res);

    return;
  }

  res.write(
    `event: delivery:connected\n` + `data: ${JSON.stringify(snapshot)}\n\n`,
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
