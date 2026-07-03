import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { MapsController } from "./maps.controller";

const router = Router();

router.get(
  "/places/autocomplete",
  asyncHandler(MapsController.autocomplete),
);
router.get(
  "/places/details/:placeId",
  asyncHandler(MapsController.placeDetails),
);
router.get("/directions", asyncHandler(MapsController.directions));

export default router;
