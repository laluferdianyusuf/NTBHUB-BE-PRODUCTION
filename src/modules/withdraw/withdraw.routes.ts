import { WithdrawController } from "modules/withdraw/withdraw.controller";
import express from "express";
import { auth } from "shared/middleware/auth";
import { asyncHandler } from "shared/http/asyncHandler";


const router = express.Router();

// user
router.post("/request/:accountId", auth.authenticate, asyncHandler(WithdrawController.request),
);

router.get("/by-account/:accountId", auth.authenticate, asyncHandler(WithdrawController.listByAccount),
);

router.get(
  "/venue/:venueId",
  auth.authenticate,
  auth.authorizeVenueRole(["VENUE_OWNER", "ADMIN"]),
  asyncHandler(WithdrawController.byVenue),
);

// admin
router.get(
  "/",
  auth.authenticate,
  auth.authorizeGlobalRole(["ADMIN"]),
  asyncHandler(WithdrawController.list),
);

router.post(
  "/:id/approve",
  auth.authenticate,
  auth.authorizeGlobalRole(["ADMIN"]),
  asyncHandler(WithdrawController.approve),
);

router.post(
  "/:id/processing",
  auth.authenticate,
  auth.authorizeGlobalRole(["ADMIN"]),
  asyncHandler(WithdrawController.processing),
);

router.post(
  "/:id/paid",
  auth.authenticate,
  auth.authorizeGlobalRole(["ADMIN"]),
  asyncHandler(WithdrawController.paid),
);

router.post(
  "/:id/reject",
  auth.authenticate,
  auth.authorizeGlobalRole(["ADMIN"]),
  asyncHandler(WithdrawController.reject),
);

export default router;
