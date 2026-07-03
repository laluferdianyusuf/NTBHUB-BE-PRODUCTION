import { OrderControllers } from "modules/order/order.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();

const orderController = new OrderControllers();

router.post(
  "/create-order",
  auth.authenticate,
  auth.authorizeGlobalRole(["CUSTOMER"]),
  asyncHandler(OrderControllers.createNewOrder),
);

router.post(
  "/cancel-order/:orderId",
  auth.authenticate,
  auth.authorizeGlobalRole(["CUSTOMER"]),
  asyncHandler(OrderControllers.cancelOrder),
);

router.post(
  "/pay-order/:orderId",
  auth.authenticate,
  auth.authorizeGlobalRole(["CUSTOMER"]),
  asyncHandler(OrderControllers.payOrder),
);

router.get("/users", auth.authenticate, asyncHandler(OrderControllers.findAllUsersOrder),
);

export default router;
