import { CourierController } from "modules/courier/courier.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";

const router = Router();
router.post("/assign/:deliveryId", asyncHandler(CourierController.assignDelivery));
router.post("/reject/:deliveryId", asyncHandler(CourierController.rejectDelivery));
router.post("/timeout/:deliveryId", asyncHandler(CourierController.handleTimeout));

export default router;
