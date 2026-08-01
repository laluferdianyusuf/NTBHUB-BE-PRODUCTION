import { publisher } from "config/redis.config";
import {
  PaymentEventPayload,
  PaymentEventStatus,
} from "types/payment-event.types";
import { publishEvent } from "./redisPubliser";

export const PAYMENT_SSE_CHANNEL = "payment-sse-events";

const STATUS_EVENT_MAP: Record<
  Exclude<PaymentEventStatus, "PENDING">,
  string
> = {
  SUCCESS: "payment:completed",
  FAILED: "payment:failed",
  EXPIRED: "payment:expired",
};

const LEGACY_TRANSACTION_EVENT_MAP: Record<
  Exclude<PaymentEventStatus, "PENDING">,
  string
> = {
  SUCCESS: "transaction:success",
  FAILED: "transaction:failed",
  EXPIRED: "transaction:expired",
};

export function publishBalanceUpdated(userId: string, balance: number) {
  publishEvent("balance-events", "balance:updated", { userId, balance });
}

export function publishPaymentEvent(payload: PaymentEventPayload) {
  if (payload.status === "PENDING") return;

  const event = STATUS_EVENT_MAP[payload.status];

  publishEvent("payment-events", event, payload);
  publishEvent(
    "transactions-events",
    LEGACY_TRANSACTION_EVENT_MAP[payload.status],
    payload,
  );

  if (payload.newBalance !== undefined) {
    publishBalanceUpdated(payload.userId, payload.newBalance);
  }

  publisher.publish(
    PAYMENT_SSE_CHANNEL,
    JSON.stringify({ paymentId: payload.paymentId, event, payload }),
  );
}
