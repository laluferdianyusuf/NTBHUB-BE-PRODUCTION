import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { ReviewPlaceControllers } from "./review-place.controller";
import { auth } from "shared/middleware/auth";

import { upload } from "middlewares/upload";

const router = Router();

const reviewController = new ReviewPlaceControllers();

router.post(
  "/create-review",
  auth.authenticate,
  upload.single("image"),
  asyncHandler(ReviewPlaceControllers.createReview),
);

router.get("/detail-review/:id", asyncHandler(ReviewPlaceControllers.getReviewById),
);

router.get("/rating/:placeId", asyncHandler(ReviewPlaceControllers.getPlaceRating),
);

export default router;
