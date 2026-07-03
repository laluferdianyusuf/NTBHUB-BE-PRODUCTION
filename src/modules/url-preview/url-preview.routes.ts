import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { getLinkPreview } from "./url-preview.controller";

const router = Router();

router.post("/link-preview", asyncHandler(getLinkPreview));

export default router;
