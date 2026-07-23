import { OperationalControllers } from "modules/operational/operational.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";

const router = Router();
const operationalController = new OperationalControllers();

const venueStaff = [
  auth.authenticate,
  auth.authorizeVenueRole(["VENUE_OWNER", "ADMIN"]),
];

router.get(
  "/operate/venue/:venueId",
  auth.authenticate,
  asyncHandler(OperationalControllers.getOperationalHours),
);

router.post(
  "/operate/create/:venueId",
  ...venueStaff,
  asyncHandler(OperationalControllers.createOperationalHours),
);

router.patch(
  "/operate/edit/:venueId",
  ...venueStaff,
  asyncHandler(OperationalControllers.editHours),
);

router.patch(
  "/operate/toggle/:venueId",
  ...venueStaff,
  asyncHandler(OperationalControllers.toggleDay),
);

router.patch(
  "/operate/copy-next/:venueId",
  ...venueStaff,
  asyncHandler(OperationalControllers.copyNextDay),
);

router.patch(
  "/operate/holiday/:venueId",
  ...venueStaff,
  asyncHandler(OperationalControllers.holidayClosure),
);

router.patch(
  "/operate/special/:venueId",
  ...venueStaff,
  asyncHandler(OperationalControllers.specialEventHours),
);

export default router;
