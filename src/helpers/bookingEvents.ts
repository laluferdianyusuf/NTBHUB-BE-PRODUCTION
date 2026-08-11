import { publisher } from "config/redis.config";
import { BookingEventPayload } from "types/booking-event.types";

export const BOOKING_SSE_CHANNEL = "booking-sse-events";

const BOOKING_EVENT_MAP: Record<BookingEventPayload["status"], string> = {
  PENDING: "booking:created",
  PAID: "booking:paid",
  ONGOING: "booking:ongoing",
  CANCELLED: "booking:cancelled",
  COMPLETED: "booking:completed",
  EXPIRED: "booking:expired",
};

export function publishBookingEvent(payload: BookingEventPayload) {
  const event = BOOKING_EVENT_MAP[payload.status];

  if (!event) {
    return;
  }

  console.log("[BOOKING SSE] Publishing:", {
    bookingId: payload.bookingId,
    event,
    status: payload.status,
  });

  publisher.publish(
    BOOKING_SSE_CHANNEL,
    JSON.stringify({
      bookingId: payload.bookingId,
      event,
      payload,
    }),
  );
}
