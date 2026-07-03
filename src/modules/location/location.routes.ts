import { LocationController } from "modules/location/location.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();

router.post("/track", auth.authenticate, asyncHandler(LocationController.trackLocation),
);
// router.get("/user/:userId", (req, res) =>
//   locationController.getUserLocations(req, res),
// );

export default router;
