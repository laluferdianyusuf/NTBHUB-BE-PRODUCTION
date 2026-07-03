import { VenueBalanceController } from "modules/venue-balance/venue-balance.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";

const router = Router();

router.get("/balance/venue/:venueId", auth.authenticate, asyncHandler(VenueBalanceController.getVenueBalance),
);

export default router;
