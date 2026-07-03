import { PaymentController } from "modules/payment/payment.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();

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
router.post("/callback", asyncHandler(PaymentController.midtransCallback),
);

router.get(
  "/lists/:userId",
  auth.authenticate,
  auth.authorizeGlobalRole(["CUSTOMER", "ADMIN"]),
  asyncHandler(PaymentController.getPaymentsByUser),
);

export default router;
