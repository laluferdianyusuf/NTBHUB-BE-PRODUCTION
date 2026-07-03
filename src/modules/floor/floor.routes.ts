import { FloorControllers } from "modules/floor/floor.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();

const floorController = new FloorControllers();

router.post(
  "/floor/venues/:venueId",
  auth.authenticate,
  auth.authorizeGlobalRole(["VENUE_OWNER"]),
  asyncHandler(FloorControllers.createFloor),
);
router.get("/floor/venues/:venueId", asyncHandler(FloorControllers.getFloorByVenueId),
);
router.get("/floor/:id", asyncHandler(FloorControllers.getFloorById));
router.put(
  "/floor/update/:id",
  auth.authenticate,
  auth.authorizeGlobalRole(["VENUE_OWNER"]),
  asyncHandler(FloorControllers.updateFloor),
);
router.delete(
  "/floor/delete/:id",
  auth.authenticate,
  auth.authorizeGlobalRole(["VENUE_OWNER"]),
  asyncHandler(FloorControllers.deleteFloor),
);

export default router;
