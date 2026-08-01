import { CourierController } from "modules/courier/courier.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";

const router = Router();

router.post(
  "/register",
  auth.authenticate,
  asyncHandler(CourierController.register),
);

router.get(
  "/profile",
  auth.authenticate,
  auth.authorizeGlobalRole(["COURIER"]),
  asyncHandler(CourierController.getProfile),
);

router.patch(
  "/status",
  auth.authenticate,
  auth.authorizeGlobalRole(["COURIER"]),
  asyncHandler(CourierController.updateStatus),
);

router.post(
  "/location",
  auth.authenticate,
  auth.authorizeGlobalRole(["COURIER"]),
  asyncHandler(CourierController.updateLocation),
);

router.get(
  "/deliveries/active",
  auth.authenticate,
  auth.authorizeGlobalRole(["COURIER"]),
  asyncHandler(CourierController.getActiveDelivery),
);

router.get(
  "/deliveries/history",
  auth.authenticate,
  auth.authorizeGlobalRole(["COURIER"]),
  asyncHandler(CourierController.getDeliveryHistory),
);

router.get(
  "/deliveries/order/:orderId",
  auth.authenticate,
  asyncHandler(CourierController.getDeliveryByOrder),
);

router.get(
  "/deliveries/:deliveryId",
  auth.authenticate,
  asyncHandler(CourierController.getDelivery),
);

router.post(
  "/deliveries/:deliveryId/accept",
  auth.authenticate,
  auth.authorizeGlobalRole(["COURIER"]),
  asyncHandler(CourierController.acceptDelivery),
);

router.post(
  "/deliveries/:deliveryId/reject",
  auth.authenticate,
  auth.authorizeGlobalRole(["COURIER"]),
  asyncHandler(CourierController.rejectDelivery),
);

router.post(
  "/deliveries/:deliveryId/pickup",
  auth.authenticate,
  auth.authorizeGlobalRole(["COURIER"]),
  asyncHandler(CourierController.markPickedUp),
);

router.post(
  "/deliveries/:deliveryId/on-the-way",
  auth.authenticate,
  auth.authorizeGlobalRole(["COURIER"]),
  asyncHandler(CourierController.markOnTheWay),
);

router.post(
  "/deliveries/:deliveryId/deliver",
  auth.authenticate,
  auth.authorizeGlobalRole(["COURIER"]),
  asyncHandler(CourierController.markDelivered),
);

router.post(
  "/assign/:deliveryId",
  auth.authenticate,
  auth.authorizeGlobalRole(["ADMIN"]),
  asyncHandler(CourierController.assignDelivery),
);

export default router;
