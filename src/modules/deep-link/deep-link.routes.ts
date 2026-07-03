import { DeepLinkController } from "modules/deep-link/deep-link.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";

const router = Router();

router.get("/:type/:id", asyncHandler(DeepLinkController.handle));

export default router;
