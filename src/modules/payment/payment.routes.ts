import { PaymentController } from "modules/payment/payment.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";

const router = Router();

router.get(
  "/duitku/methods",
  auth.authenticate,
  asyncHandler(PaymentController.getPaymentMethods),
);

router.post(
  "/duitku/topUp",
  auth.authenticate,
  asyncHandler(PaymentController.createTopUpPayment),
);

router.post("/duitku/callback", asyncHandler(PaymentController.duitkuCallback));

router.post(
  "/topUp",
  auth.authenticate,
  auth.authorizeGlobalRole(["CUSTOMER"]),
  asyncHandler(PaymentController.topUp),
);
router.post(
  "/topUpQris",
  auth.authenticate,
  auth.authorizeGlobalRole(["CUSTOMER"]),
  asyncHandler(PaymentController.topUpQris),
);
router.post("/callback", asyncHandler(PaymentController.duitkuCallback));

router.get(
  "/lists/:userId",
  auth.authenticate,
  auth.authorizeGlobalRole(["CUSTOMER", "ADMIN"]),
  asyncHandler(PaymentController.getPaymentsByUser),
);

router.get(
  "/:paymentId/status",
  auth.authenticate,
  asyncHandler(PaymentController.getPaymentStatus),
);

router.get(
  "/:paymentId/stream",
  auth.authenticate,
  auth.authorizeGlobalRole(["CUSTOMER"]),
  asyncHandler(PaymentController.streamPaymentStatus),
);

export default router;
