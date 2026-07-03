import { CommunityEventAttendanceControllers } from "modules/community-event-attendance/community-event-attendance.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();
const attendanceController = new CommunityEventAttendanceControllers();


router.post("/events/:eventId/check-in", auth.authenticate, asyncHandler(CommunityEventAttendanceControllers.checkIn),
);

export default router;
