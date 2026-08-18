import { Router } from "express";
import { CourierController } from "modules/courier/courier.controller";
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

router.get(
  "/admin/couriers",
  auth.authenticate,
  auth.authorizeGlobalRole(["ADMIN"]),
  asyncHandler(CourierController.getAllCouriers),
);

router.patch(
  "/admin/couriers/:courierId/approve",
  auth.authenticate,
  auth.authorizeGlobalRole(["ADMIN"]),
  asyncHandler(CourierController.approveCourier),
);

router.patch(
  "/admin/couriers/:courierId/reject",
  auth.authenticate,
  auth.authorizeGlobalRole(["ADMIN"]),
  asyncHandler(CourierController.rejectCourier),
);

router.get(
  "/courier-location",
  auth.authenticate,
  asyncHandler(CourierController.getLocation),
);

router.post(
  "/deliveries",
  auth.authenticate,
  auth.authorizeGlobalRole(["CUSTOMER"]),
  asyncHandler(CourierController.createDelivery),
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

router.post(
  "/pay/:deliveryId",
  auth.authenticate,
  asyncHandler(CourierController.payDelivery),
);

router.get(
  "/:deliveryId/stream",
  auth.authenticate,
  asyncHandler(CourierController.streamDelivery),
);

export default router;
