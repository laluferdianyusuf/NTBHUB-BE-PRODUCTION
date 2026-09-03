import { Job } from "bullmq";
import { prisma } from "config/prisma";
import { addJob, createWorker } from "./index";
import { publishPaymentEvent } from "helpers/paymentEvents";
import { PaymentEventPayload } from "types/payment-event.types";

import { AccountRepository } from "modules/account/account.repository";
import { InvoiceRepository } from "modules/invoice/invoice.repository";
import { LedgerRepository } from "modules/ledger/ledger.repository";
import { PaymentRepository } from "modules/payment/payment.repository";
import { PointsRepository } from "modules/points/points.repository";
import { UserBalanceRepository } from "modules/user-balance/user-balance.repository";

const paymentRepository = new PaymentRepository();
const invoiceRepository = new InvoiceRepository();
const ledgerRepository = new LedgerRepository();
const pointsRepository = new PointsRepository();
const balanceRepository = new UserBalanceRepository();
const accountRepository = new AccountRepository();

const QUEUE_NAME = "payment-processing";
const JOB_NAME = "process-payment-webhook";

interface PaymentWebhookJob {
  payload: {
    order_id?: string;
    merchantOrderId?: string;
    transaction_status?: string;
    resultCode?: string;
    provider?: "MIDTRANS" | "DUITKU";
    [key: string]: any;
  };
}

function getTopupNetAmount(payment: {
  amount: unknown;
  method: string | null;
}) {
  const gross = Number(payment.amount);

  if (
    payment.method === "QRIS" ||
    payment.method === "SP" ||
    payment.method === "NQ" ||
    payment.method === "GQ"
  ) {
    const fee = Math.ceil((gross / (1 + 0.007)) * 0.007);
    return gross - fee;
  }

  return gross - 4440;
}

createWorker<PaymentWebhookJob>(
  QUEUE_NAME,
  async (job: Job<PaymentWebhookJob>) => {
    const payload = job.data.payload;

    const orderId = payload.merchantOrderId || payload.order_id;
    const reference = payload.reference || "";

    let isSuccess = false;
    let isExpired = false;
    let isFailed = false;

    if (payload.resultCode !== undefined) {
      isSuccess = payload.resultCode === "00";
      isFailed = payload.resultCode !== "00";
    } else if (payload.transaction_status) {
      const status = payload.transaction_status;
      isSuccess = ["capture", "settlement"].includes(status);
      isExpired = status === "expire";
      isFailed = ["cancel", "deny"].includes(status);
    }

    if (!orderId) {
      console.error("[QUEUE] Invalid payload: Order ID is missing");
      return;
    }

    console.log(`[QUEUE] Processing payment for Order ID: ${orderId}`);

    const eventPayload = await prisma.$transaction(async (tx) => {
      const payment = await paymentRepository.findByProviderRef(reference, tx);

      if (!payment) {
        console.log(`[QUEUE] Payment not found for reference: ${orderId}`);
        return null;
      }

      if (payment.status === "SUCCESS") {
        console.log(`[QUEUE] Payment ${payment.id} already processed`);
        return null;
      }

      const userId = payment.invoice.entityId;

      if (isSuccess) {
        await paymentRepository.markSuccess(payment.id, tx);
        await invoiceRepository.markPaid(payment.invoiceId, tx);

        const userAccount = await accountRepository.findUserAccount(userId, tx);
        const platformAccount = await accountRepository.findPlatformAccount(tx);

        if (!userAccount || !platformAccount) {
          throw new Error("Account not found");
        }

        const actualAmount = getTopupNetAmount(payment);

        await ledgerRepository.createMany(
          [
            {
              accountId: userAccount.id,
              type: "CREDIT",
              amount: actualAmount,
              referenceType: "TOPUP",
              referenceId: payment.invoiceId,
            },
          ],
          tx,
        );

        await balanceRepository.incrementBalance(userId, actualAmount, tx);

        await pointsRepository.generatePoints(
          {
            userId,
            points: 10,
            activity: "PAYMENT",
            reference: payment.id,
          },
          tx,
        );

        const newBalance = await balanceRepository.getBalanceByUserId(
          userId,
          tx,
        );

        return {
          userId,
          paymentId: payment.id,
          invoiceId: payment.invoiceId,
          entityType: "TOPUP" as const,
          entityId: userId,
          status: "SUCCESS" as const,
          amount: actualAmount,
          newBalance: newBalance ?? 0,
          method: payment.method as PaymentEventPayload["method"],
          provider: (payload.provider || "DUITKU") as any,
        };
      }

      if (isExpired) {
        await paymentRepository.markExpired(payment.id, tx);
        await invoiceRepository.markExpired(payment.invoiceId, tx);

        return {
          userId,
          paymentId: payment.id,
          invoiceId: payment.invoiceId,
          entityType: "TOPUP" as const,
          entityId: userId,
          status: "EXPIRED" as const,
          amount: Number(payment.amount),
          method: payment.method as PaymentEventPayload["method"],
          provider: (payload.provider || "DUITKU") as any,
        };
      }

      if (isFailed) {
        await paymentRepository.markFailed(payment.id, tx);
        await invoiceRepository.markFailed(payment.invoiceId, tx);

        return {
          userId,
          paymentId: payment.id,
          invoiceId: payment.invoiceId,
          entityType: "TOPUP" as const,
          entityId: userId,
          status: "FAILED" as const,
          amount: Number(payment.amount),
          method: payment.method as PaymentEventPayload["method"],
          provider: (payload.provider || "DUITKU") as any,
        };
      }

      return null;
    });

    if (eventPayload) {
      console.log(
        `[QUEUE] Publishing SSE Event for Payment ID: ${eventPayload.paymentId}`,
      );
      publishPaymentEvent(eventPayload);
    }
  },
);

export async function enqueuePaymentWebhook(payload: any) {
  await addJob<PaymentWebhookJob>(QUEUE_NAME, JOB_NAME, { payload });
}
