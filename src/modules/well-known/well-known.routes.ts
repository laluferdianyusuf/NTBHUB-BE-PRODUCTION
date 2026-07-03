import { WellKnownController } from "modules/well-known/well-known.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";

const router = Router();

router.get("/.well-known/assetlinks.json", asyncHandler(WellKnownController.assetLinks));
router.get(
  "/.well-known/apple-app-site-association",
  asyncHandler(WellKnownController.appleAppSite),
);

export default router;
