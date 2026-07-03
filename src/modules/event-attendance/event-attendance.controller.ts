import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";

import { EventAttendanceServices } from "modules/event-attendance/event-attendance.service";

const attendanceService = new EventAttendanceServices();

export class EventAttendanceControllers {
  static async checkIn(req: Request, res: Response) {      const userId = req.user?.id as string;
      const { eventId } = req.params;

      const result = await runService(() => attendanceService.checkIn(userId, eventId));
      return sendSuccess(res, result, "Checked in to this event", 201);
    
  }
}
