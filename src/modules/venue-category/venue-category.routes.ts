import { VenueCategoryController } from "modules/venue-category/venue-category.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();

router.post("/create", auth.authenticate, asyncHandler(VenueCategoryController.createCategory),
);

router.get("/categories", asyncHandler(VenueCategoryController.getAllCategory),
);

export default router;
