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

  status?: string;

  pickupAddress?: string;
  dropoffAddress?: string;

  latitude?: number;
  longitude?: number;
}

export function publishDeliveryEvent(
  payload: DeliveryEventPayload & {
    status: string;
  },
) {
  const event = getDeliveryEvent(payload.status);

  if (!event) return;

  publishEvent("delivery-events", event, payload);

  publisher.publish(
    DELIVERY_SSE_CHANNEL,
    JSON.stringify({
      deliveryId: payload.deliveryId,
      event,
      payload,
    }),
  );
}

export function publishDeliveryAccepted(payload: DeliveryEventPayload) {
  publishEvent("delivery-events", "delivery:accepted", payload);

  publisher.publish(
    DELIVERY_SSE_CHANNEL,
    JSON.stringify({
      deliveryId: payload.deliveryId,
      event: "delivery:accepted",
      payload,
    }),
  );
}

export function publishDeliveryLocation(
  payload: DeliveryEventPayload & {
    latitude: number;
    longitude: number;
  },
) {
  publishEvent("delivery-events", "delivery:location", payload);

  publisher.publish(
    DELIVERY_SSE_CHANNEL,
    JSON.stringify({
      deliveryId: payload.deliveryId,
      event: "delivery:location",
      payload,
    }),
  );
}

function getDeliveryEvent(status: string): DeliverySSEEvent | null {
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
