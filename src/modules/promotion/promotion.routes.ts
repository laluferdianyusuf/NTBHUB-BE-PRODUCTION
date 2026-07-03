import { PromotionController } from "modules/promotion/promotion.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();

router.post("/create-promotion", auth.authenticate, asyncHandler(PromotionController.createPromotion),
);

router.patch(
  "/approved-promotion/:promotionId",
  auth.authenticate,
  asyncHandler(PromotionController.approvePromotion),
);

router.patch("/reject-promotion/:promotionId", auth.authenticate, asyncHandler(PromotionController.rejectPromotion),
);

router.get("/summary/:venueId", auth.authenticate, asyncHandler(PromotionController.getPromotionSummary),
);

router.get("/by-venue/:venueId", auth.authenticate, asyncHandler(PromotionController.getPromotionByVenue),
);

export default router;
