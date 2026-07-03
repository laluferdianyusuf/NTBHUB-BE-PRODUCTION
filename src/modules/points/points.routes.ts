import { PointsController } from "modules/points/points.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();

router.get(
  "/point/user/:userId",
  auth.authenticate,
  auth.authorizeGlobalRole(["CUSTOMER"]),
  asyncHandler(PointsController.getUserTotalPoints),
);

export default router;
