import { EventAttendanceControllers } from "modules/event-attendance/event-attendance.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();
const attendanceController = new EventAttendanceControllers();


router.post("/events/:eventId/check-in", auth.authenticate, asyncHandler(EventAttendanceControllers.checkIn),
);

export default router;
