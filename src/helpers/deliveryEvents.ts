import {
  DeliveryEventPayload,
  DeliveryEventStatus,
} from "types/delivery-event.types";
import { publishEvent } from "./redisPubliser";

const STATUS_EVENT_MAP: Record<DeliveryEventStatus, string> = {
  PENDING: "delivery:pending",
  ASSIGNED: "delivery:assigned",
  PICKED_UP: "delivery:picked_up",
  ON_THE_WAY: "delivery:on_the_way",
  DELIVERED: "delivery:delivered",
  CANCELLED: "delivery:cancelled",
};

export function publishDeliveryEvent(payload: DeliveryEventPayload) {
  publishEvent("delivery-events", STATUS_EVENT_MAP[payload.status], payload);
}

export function publishDeliveryLocation(payload: DeliveryEventPayload) {
  publishEvent("delivery-events", "delivery:location", payload);
}

export function publishDeliveryAccepted(payload: DeliveryEventPayload) {
  publishEvent("delivery-events", "delivery:accepted", payload);
}
