export type DeliveryEventStatus =
  | "PENDING"
  | "ASSIGNED"
  | "PICKED_UP"
  | "ON_THE_WAY"
  | "DELIVERED"
  | "CANCELLED";

export interface DeliveryEventPayload {
  deliveryId: string;
  orderId?: string | null;
  bookingId?: string | null;
  userId?: string | null;
  courierId?: string | null;
  courierUserId?: string | null;
  status: DeliveryEventStatus;
  pickupAddress?: string;
  dropoffAddress?: string;
  latitude?: number;
  longitude?: number;
}
