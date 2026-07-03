import { UserBalanceController } from "modules/user-balance/user-balance.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();

router.get(
  "/balance/user/:userId",
  auth.authenticate,
  auth.authorizeGlobalRole(["CUSTOMER"]),
  asyncHandler(UserBalanceController.getUserBalance),
);

export default router;
