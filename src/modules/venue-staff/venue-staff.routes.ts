import { VenueStaffController } from "modules/venue-staff/venue-staff.controller";
import express from "express";
import { auth } from "shared/middleware/auth";
import { asyncHandler } from "shared/http/asyncHandler";

import { upload } from "middlewares/upload";

const router = express.Router();


router.post(
  "/create/:venueId",
  auth.authenticate,
  upload.single("photo"),
  asyncHandler(VenueStaffController.create),
);

router.get("/list", auth.authenticate, asyncHandler(VenueStaffController.list));

router.get("/detail/:staffId", auth.authenticate, asyncHandler(VenueStaffController.detail),
);

router.put(
  "/update/:staffId",
  auth.authenticate,
  upload.single("photo"),
  asyncHandler(VenueStaffController.update),
);

router.delete("/delete/:staffId", auth.authenticate, asyncHandler(VenueStaffController.delete),
);

export default router;
