import { VenueSubCategoryController } from "modules/venue-sub-category/venue-sub-category.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();

router.post("/create", auth.authenticate, asyncHandler(VenueSubCategoryController.createSubCategory),
);

router.post("/create-many", auth.authenticate, asyncHandler(VenueSubCategoryController.createMany),
);

router.get("/by-category/:categoryId", asyncHandler(VenueSubCategoryController.getSubCategoryByCategory),
);

router.get("/sub-all", asyncHandler(VenueSubCategoryController.getAllSubCategory),
);

export default router;
