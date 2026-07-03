import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";

import { EventService } from "modules/event/event.service";

const service = new EventService();

export class EventController {
  static async create(req: Request, res: Response) {      const event = await runService(() => service.createEvent(
        req.body,
        req.file as Express.Multer.File,
      ));

      return sendSuccess(res, event, "Event retrieved successfully");
    
  }

  static getEventDashboard = async (req: Request, res: Response) => {      const eventId = req.params.eventId;
      const result = await runService(() => service.getEventDashboard(eventId));

      return sendSuccess(res, result, "Dashboard retrieved successfully");
    
  };

  static async listEvent(req: Request, res: Response) {      const { search, status, page, limit } = req.query;

      const result = await runService(() => service.getAllEvents({
        search: typeof search === "string" ? search : undefined,
        status:
          typeof status === "string" && status.trim() !== ""
            ? status
            : undefined,
        page: Number(page) > 0 ? Number(page) : 1,
        limit: Number(limit) > 0 ? Number(limit) : 20,
      }));

      return sendSuccess(res, result, "Event retrieved successfully");
    
  }

  static async listMergedEvent(req: Request, res: Response) {      const { search, status, page, limit } = req.query;

      const result = await runService(() => service.getMergedEvents({
        search: typeof search === "string" ? search : undefined,
        status:
          typeof status === "string" && status.trim() !== ""
            ? status
            : undefined,
        page: Number(page) > 0 ? Number(page) : 1,
        limit: Number(limit) > 0 ? Number(limit) : 20,
      }));

      return sendSuccess(res, result, "Event merged retrieved successfully");
    
  }

  static async getAllEventsWithDetails(req: Request, res: Response) {      const { page, limit, status, search } = req.query;

      const result = await runService(() => service.getAllEventsWithDetails({
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
        status: status as string,
        search: search as string,
      }));

      return sendSuccess(res, result, "Event retrieved successfully");
    
  }

  static async detailEvent(req: Request, res: Response) {      const result = await runService(() => service.getEventDetail(req.params.id));
      return sendSuccess(res, result, "Event retrieved successfully");
    
  }

  static async updateStatusEvent(req: Request, res: Response) {
    const { status } = req.body;
    const event = await runService(() => service.changeStatus(req.params.id, status));

    return res.status(200).json({
      status: true,
      message: "Status updated",
      data: event,
    });
  }

  static async removeEvent(req: Request, res: Response) {
    await runService(() => service.deleteEvent(req.params.id));

    return res.status(203).json({
      status: true,
      message: "Event removed",
    });
  }
}
