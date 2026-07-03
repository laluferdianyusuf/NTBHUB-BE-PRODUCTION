import { ProfileController } from "modules/profile/profile.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();

router.get("/detail/:id", auth.authenticate, asyncHandler(ProfileController.getProfile),
);
router.post("/:id/view", auth.authenticate, asyncHandler(ProfileController.viewProfile),
);
router.post("/:id/like", auth.authenticate, asyncHandler(ProfileController.toggleLike),
);

export default router;
