import { InterestController } from "modules/interest/interest.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();


router.get("/", asyncHandler(InterestController.getAll));

router.get("/me", auth.authenticate, asyncHandler(InterestController.getMine),
);

router.put("/update/me", auth.authenticate, asyncHandler(InterestController.updateMine),
);

export default router;
