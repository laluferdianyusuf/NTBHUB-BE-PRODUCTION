import { Job } from "bullmq";
import { addDelayedJob, cancelJob, createWorker } from "./index";
import { publishPaymentEvent } from "helpers/paymentEvents";
import { PaymentRepository } from "modules/payment/payment.repository";

const paymentRepository = new PaymentRepository();
const QUEUE_NAME = "transaction-expiry";
const JOB_NAME = "expire-invoice";

interface TransactionQueueJobData {
  transactionId: string;
}

createWorker<TransactionQueueJobData>(
  QUEUE_NAME,
  async (job: Job<TransactionQueueJobData>) => {
    const { transactionId } = job.data;

    console.log(`[QUEUE] Running expiry job for ${transactionId}`);

    const transaction = await paymentRepository.findById(transactionId);

    if (!transaction) return;

    if (transaction.status !== "SUCCESS") {
      const expired = await paymentRepository.markExpired(transaction.id);

      publishPaymentEvent({
        userId: expired.invoice.entityId,
        paymentId: expired.id,
        invoiceId: expired.invoiceId,
        entityType: "TOPUP",
        entityId: expired.invoice.entityId,
        status: "EXPIRED",
        amount: Number(expired.amount),
        method: expired.method as "VA" | "QRIS" | "WALLET",
        provider: "MIDTRANS",
      });

      console.log(`[QUEUE] Transaction ${expired.id} expired`);
    }
  },
);

export async function enqueueTransactionExpiry(
  transactionId: string,
  expiredAt: Date,
) {
  const delay = expiredAt.getTime() - Date.now();

  if (delay <= 0) return;

  await addDelayedJob<TransactionQueueJobData>(
    QUEUE_NAME,
    JOB_NAME,
    { transactionId },
    delay,
    transactionId,
  );
}

export async function cancelInvoiceExpiry(transactionId: string) {
  await cancelJob(QUEUE_NAME, transactionId);
}
