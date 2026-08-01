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
const JOB_NAME = "process-midtrans-webhook";

interface PaymentWebhookJob {
  payload: any;
}

function getTopupNetAmount(payment: { amount: unknown; method: string | null }) {
  const gross = Number(payment.amount);

  if (payment.method === "QRIS") {
    const fee = Math.ceil((gross / (1 + 0.007)) * 0.007);
    return gross - fee;
  }

  return gross - 4440;
}

createWorker<PaymentWebhookJob>(
  QUEUE_NAME,
  async (job: Job<PaymentWebhookJob>) => {
    const payload = job.data.payload;

    console.log(`[QUEUE] Processing payment ${payload.order_id}`);

    const eventPayload = await prisma.$transaction(async (tx) => {
      const payment = await paymentRepository.findByProviderRef(
        payload.order_id,
        tx,
      );

      if (!payment) {
        console.log("Payment not found");
        return null;
      }

      if (payment.status === "SUCCESS") {
        console.log("Payment already processed");
        return null;
      }

      const userId = payment.invoice.entityId;
      const status = payload.transaction_status;

      if (["capture", "settlement"].includes(status)) {
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
          provider: "MIDTRANS" as const,
        };
      }

      if (status === "expire") {
        await paymentRepository.markExpired(payment.id, tx);
        await invoiceRepository.markExpired(payment.invoiceId, tx);

        console.log(`[QUEUE] Payment expired ${payment.id}`);

        return {
          userId,
          paymentId: payment.id,
          invoiceId: payment.invoiceId,
          entityType: "TOPUP" as const,
          entityId: userId,
          status: "EXPIRED" as const,
          amount: Number(payment.amount),
          method: payment.method as PaymentEventPayload["method"],
          provider: "MIDTRANS" as const,
        };
      }

      if (["cancel", "deny"].includes(status)) {
        await paymentRepository.markFailed(payment.id, tx);
        await invoiceRepository.markFailed(payment.invoiceId, tx);

        console.log(`[QUEUE] Payment failed ${payment.id}`);

        return {
          userId,
          paymentId: payment.id,
          invoiceId: payment.invoiceId,
          entityType: "TOPUP" as const,
          entityId: userId,
          status: "FAILED" as const,
          amount: Number(payment.amount),
          method: payment.method as PaymentEventPayload["method"],
          provider: "MIDTRANS" as const,
        };
      }

      return null;
    });

    if (eventPayload) {
      publishPaymentEvent(eventPayload);
    }
  },
);

export async function enqueuePaymentWebhook(payload: any) {
  await addJob<PaymentWebhookJob>(QUEUE_NAME, JOB_NAME, { payload });
}
