import { Queue } from "bullmq";
import { redis } from "config/redis.config";

const ASSIGN_QUEUE = "assign-delivery";
const TIMEOUT_QUEUE = "assignment-timeout";

export const assignQueue = new Queue(ASSIGN_QUEUE, {
  connection: redis,
});

export const timeoutQueue = new Queue(TIMEOUT_QUEUE, {
  connection: redis,
});

const timeoutJobId = (deliveryId: string) => `timeout-${deliveryId}`;

export const dispatchAssignDelivery = async (
  deliveryId: string,
  options?: {
    delay?: number;
  },
) => {
  await assignQueue.add(
    "assign-delivery",
    {
      deliveryId,
    },
    {
      delay: options?.delay ?? 0,

      attempts: 3,

      backoff: {
        type: "exponential",
        delay: 3000,
      },

      removeOnComplete: true,

      removeOnFail: false,
    },
  );
};

export const scheduleAssignmentTimeout = async (deliveryId: string) => {
  await timeoutQueue.add(
    "assignment-timeout",
    { deliveryId },
    {
      jobId: timeoutJobId(deliveryId),
      delay: 30000,
      attempts: 1,
      removeOnComplete: true,
      removeOnFail: false,
    },
  );
};

export const cancelAssignmentTimeout = async (deliveryId: string) => {
  const job = await timeoutQueue.getJob(timeoutJobId(deliveryId));
  if (job) {
    await job.remove();
  }
};
