import { publisher } from "config/redis.config";
import { publishEvent } from "./redisPubliser";

export const DELIVERY_SSE_CHANNEL = "delivery-sse-events";

export type DeliverySSEEvent =
  | "delivery:assigned"
  | "delivery:accepted"
  | "delivery:picked_up"
  | "delivery:on_the_way"
  | "delivery:delivered"
  | "delivery:cancelled"
  | "delivery:location";

export interface DeliveryEventPayload {
  deliveryId: string;

  orderId?: string | null;
  bookingId?: string | null;

  userId?: string | null;

  courierId?: string | null;
  courierUserId?: string | null;

  status: string;

  pickupAddress?: string;
  dropoffAddress?: string;
}

export interface DeliveryLocationPayload {
  deliveryId: string;

  orderId?: string | null;
  bookingId?: string | null;

  userId?: string | null;

  courierId: string;
  courierUserId?: string | null;

  status: string;

  latitude: number;
  longitude: number;

  timestamp: string;
}

interface DeliverySSEMessage<T> {
  deliveryId: string;
  event: DeliverySSEEvent;
  payload: T;
}

export async function publishDeliveryEvent(payload: DeliveryEventPayload) {
  const event = getDeliveryEvent(payload.status);

  if (!event) return;

  await publishEvent("delivery-events", event, payload);

  const message: DeliverySSEMessage<DeliveryEventPayload> = {
    deliveryId: payload.deliveryId,
    event,
    payload,
  };

  await publisher.publish(DELIVERY_SSE_CHANNEL, JSON.stringify(message));
}

export async function publishDeliveryAccepted(payload: DeliveryEventPayload) {
  const message: DeliverySSEMessage<DeliveryEventPayload> = {
    deliveryId: payload.deliveryId,
    event: "delivery:accepted",
    payload,
  };

  await publishEvent("delivery-events", "delivery:accepted", payload);

  await publisher.publish(DELIVERY_SSE_CHANNEL, JSON.stringify(message));
}

export async function publishDeliveryLocation(
  payload: DeliveryLocationPayload,
) {
  const message: DeliverySSEMessage<DeliveryLocationPayload> = {
    deliveryId: payload.deliveryId,
    event: "delivery:location",
    payload,
  };

  await publishEvent("delivery-events", "delivery:location", payload);

  await publisher.publish(DELIVERY_SSE_CHANNEL, JSON.stringify(message));
}

function getDeliveryEvent(
  status: string,
): Exclude<DeliverySSEEvent, "delivery:accepted" | "delivery:location"> | null {
  switch (status) {
    case "ASSIGNED":
      return "delivery:assigned";

    case "PICKED_UP":
      return "delivery:picked_up";

    case "ON_THE_WAY":
      return "delivery:on_the_way";

    case "DELIVERED":
      return "delivery:delivered";

    case "CANCELLED":
      return "delivery:cancelled";

    default:
      return null;
  }
}
