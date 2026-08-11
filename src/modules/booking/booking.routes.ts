import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";
import { BookingController } from "./booking.controller";

const router = Router();

router.post(
  "/booking/create",
  auth.authenticate,
  asyncHandler(BookingController.createBooking),
);
router.put(
  "/booking/payment/:id",
  auth.authenticate,
  asyncHandler(BookingController.processBookingPayment),
);
router.get(
  "/booking/bookings",
  auth.authenticate,
  asyncHandler(BookingController.getAllBookings),
);
router.get(
  "/booking/users/:userId",
  auth.authenticate,
  asyncHandler(BookingController.getBookingByUserId),
);
router.get(
  "/booking/by-venue/:venueId/admin",
  auth.authenticate,
  asyncHandler(BookingController.getBookingByVenueId),
);
router.get(
  "/booking/by-venue/:venueId/venue-owner",
  auth.authenticate,
  asyncHandler(BookingController.getBookingByVenueId),
);
router.get(
  "/booking/venue/dashboard/:venueId",
  auth.authenticate,
  asyncHandler(BookingController.getVenueDashboard),
);
router.get(
  "/booking/status-paid/:userId",
  auth.authenticate,
  asyncHandler(BookingController.getBookingPaidByUserId),
);
router.get(
  "/booking/status-complete/:userId",
  auth.authenticate,
  asyncHandler(BookingController.getBookingCompleteByUserId),
);
router.get(
  "/booking/status-pending/:userId",
  auth.authenticate,
  asyncHandler(BookingController.getBookingPendingByUserId),
);
router.get("/booking/:id", asyncHandler(BookingController.getBookingById));
router.put(
  "/booking/:id/cancel",
  auth.authenticate,
  asyncHandler(BookingController.cancelBooking),
);
router.put(
  "/booking/:id/complete",
  auth.authenticate,
  asyncHandler(BookingController.completeBooking),
);
router.get(
  "/existing/bookings",
  asyncHandler(BookingController.getExistingBooking),
);
router.get(
  "/booking/venue-with-details",
  auth.authenticate,
  asyncHandler(BookingController.getVenueWithDetails),
);

router.get(
  "/:bookingId/stream",
  auth.authenticate,
  auth.authorizeGlobalRole(["CUSTOMER"]),
  asyncHandler(BookingController.streamBookingStatus),
);

export default router;
