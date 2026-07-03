import { PromotionBannerController } from "modules/promotion-banner/promotion-banner.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();

// PUBLIC
router.get(
  "/banners",
  auth.authenticate,
  asyncHandler(PromotionBannerController.getActiveBanners),
);
router.post(
  "/:id/view",
  auth.authenticate,
  asyncHandler(PromotionBannerController.recordView),
);
router.post(
  "/:id/click",
  auth.authenticate,
  asyncHandler(PromotionBannerController.recordClick),
);

// ADMIN
router.post(
  "/",
  auth.authenticate,
  asyncHandler(PromotionBannerController.createPromotion),
);

router.put(
  "/update/:id",
  auth.authenticate,
  asyncHandler(PromotionBannerController.updatePromotion),
);

router.delete(
  "/delete/:id",
  auth.authenticate,
  asyncHandler(PromotionBannerController.deactivatePromotion),
);

router.get(
  "/:id/analytics",
  auth.authenticate,
  asyncHandler(PromotionBannerController.getAnalytics),
);

export default router;
