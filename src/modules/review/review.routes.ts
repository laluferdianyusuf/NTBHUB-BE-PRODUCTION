import { ReviewControllers } from "modules/review/review.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";

import { upload } from "middlewares/upload";

const router = Router();

const reviewController = new ReviewControllers();

router.post(
  "/review/create",
  auth.authenticate,
  upload.single("image"),
  asyncHandler(ReviewControllers.createReview),
);

router.get("/review/by-booking/:bookingId", asyncHandler(ReviewControllers.getReviewByBookingId),
);

router.get("/review/:venueId", asyncHandler(ReviewControllers.getVenueRating),
);

export default router;
