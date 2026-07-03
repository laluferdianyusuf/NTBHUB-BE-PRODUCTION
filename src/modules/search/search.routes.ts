import { SearchController } from "modules/search/search.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";

const router = Router();
router.get("/global", asyncHandler(SearchController.globalSearch));

export default router;
