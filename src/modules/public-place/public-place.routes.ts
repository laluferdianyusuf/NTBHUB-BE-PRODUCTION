import { PublicPlaceController } from "modules/public-place/public-place.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";

import { upload } from "middlewares/upload";

const router = Router();

// public
router.get("/list-places", asyncHandler(PublicPlaceController.list));
router.get("/detail-place/:id", auth.authenticate, asyncHandler(PublicPlaceController.detail),
);

// admin only
router.post(
  "/create-place",
  auth.authenticate,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 5 },
  ]),
  asyncHandler(PublicPlaceController.create),
);
router.put("/update-place/:id", auth.authenticate, asyncHandler(PublicPlaceController.update),
);
router.delete("/delete-place/:id", auth.authenticate, asyncHandler(PublicPlaceController.deactivate),
);

// interactions with place
router.post("/place/:placeId/like", auth.authenticate, asyncHandler(PublicPlaceController.toggleLike),
);
router.post("/place/:placeId/impression", auth.authenticate, asyncHandler(PublicPlaceController.createImpression),
);
router.get("/place/:placeId/likes/count", auth.authenticate, asyncHandler(PublicPlaceController.getLikeCount),
);
router.get("/place/:placeId/impressions/count", asyncHandler(PublicPlaceController.getImpressionCount),
);

export default router;
