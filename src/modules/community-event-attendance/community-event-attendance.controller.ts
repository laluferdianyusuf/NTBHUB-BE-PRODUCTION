import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";

import { CommunityEventAttendanceServices } from "modules/community-event-attendance/community-event-attendance.service";

const attendanceService = new CommunityEventAttendanceServices();

export class CommunityEventAttendanceControllers {
  static async checkIn(req: Request, res: Response) {      const userId = req.user?.id as string;
      const { eventId } = req.params;

      const result = await runService(() => attendanceService.checkIn(userId, eventId));
      return sendSuccess(res, result, "Checked in to this event", 201);
    
  }
}
