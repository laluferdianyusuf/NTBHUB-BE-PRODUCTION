import { Job, Worker } from "bullmq";
import { redis } from "config/redis.config";
import { CourierService } from "modules/courier/courier.service";
import { dispatchAssignDelivery } from "./dispatch";

const ASSIGN_QUEUE = "assign-delivery";
const TIMEOUT_QUEUE = "assignment-timeout";

let courierService: CourierService;

function getCourierService() {
  if (!courierService) courierService = new CourierService();
  return courierService;
}

export const assignWorker = new Worker(
  ASSIGN_QUEUE,
  async (job: Job<{ deliveryId: string }>) => {
    const { deliveryId } = job.data;

    console.log(`[ASSIGN] Processing delivery ${deliveryId}`);

    const service = getCourierService();
    const result = await service.assignDelivery(deliveryId);

    if ("skipped" in result && result.skipped) {
      console.log(`[ASSIGN] Skipped delivery ${deliveryId}`);
      return result;
    }

    if ("failed" in result && result.failed) {
      console.log(`[ASSIGN] Failed delivery ${deliveryId}: ${result.reason}`);
      return result;
    }

    if ("success" in result && result.success) {
      console.log(
        `[ASSIGN SUCCESS] Delivery ${deliveryId} -> Courier ${result.courierId}`,
      );
    }

    return result;
  },
  {
    connection: redis,
    concurrency: 10,
  },
);

export const timeoutWorker = new Worker(
  TIMEOUT_QUEUE,
  async (job: Job<{ deliveryId: string }>) => {
    const { deliveryId } = job.data;

    console.log(`[TIMEOUT CHECK] Delivery ${deliveryId}`);

    const service = getCourierService();
    const result = await service.handleAssignmentTimeout(deliveryId);

    if (result?.reassign) {
      console.log(`[REASSIGN] Delivery ${deliveryId}`);
      await dispatchAssignDelivery(deliveryId);
    }

    return result;
  },
  {
    connection: redis,
    concurrency: 5,
  },
);

assignWorker.on("failed", (job, err) => {
  console.error(`[ASSIGN FAILED] Job ${job?.id}:`, err.message);
});

timeoutWorker.on("failed", (job, err) => {
  console.error(`[TIMEOUT FAILED] Job ${job?.id}:`, err.message);
});

console.log("[COURIER WORKER] Assign + timeout workers started");
