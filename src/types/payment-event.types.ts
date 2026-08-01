export type PaymentEntityType =
  | "TOPUP"
  | "BOOKING"
  | "ORDER"
  | "EVENT_ORDER"
  | "COMMUNITY_EVENT_ORDER";

export type PaymentEventStatus = "SUCCESS" | "FAILED" | "EXPIRED" | "PENDING";

export type PaymentMethod = "VA" | "QRIS" | "WALLET";

export type PaymentProvider = "MIDTRANS" | "NTB_HUB";

export interface PaymentEventPayload {
  userId: string;
  paymentId: string;
  invoiceId: string;
  entityType: PaymentEntityType;
  entityId: string;
  status: PaymentEventStatus;
  amount: number;
  newBalance?: number;
  method: PaymentMethod;
  provider: PaymentProvider;
}
