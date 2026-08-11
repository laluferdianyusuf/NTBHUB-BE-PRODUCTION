export type BookingEventStatus =
  | "PENDING"
  | "PAID"
  | "ONGOING"
  | "CANCELLED"
  | "COMPLETED"
  | "EXPIRED";

export type BookingEventType =
  | "booking:created"
  | "booking:paid"
  | "booking:ongoing"
  | "booking:cancelled"
  | "booking:completed"
  | "booking:expired";

export interface BookingEventPayload {
  bookingId: string;
  userId: string;
  venueId: string;

  status: BookingEventStatus;

  // Booking information
  bookingCode?: string;
  bookingDate?: string;
  startTime?: string;
  endTime?: string;

  // Payment / transaction
  totalAmount?: number;
  paidAmount?: number;

  // Venue information
  venueName?: string;
  venueUnitId?: string;
  venueUnitName?: string;

  // Optional message for FE
  message?: string;

  // Timestamp event
  timestamp?: string;

  [key: string]: unknown;
}
