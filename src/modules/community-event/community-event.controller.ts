import { z } from "zod";
import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { CommunityEventService } from "./community-event.service";

const service = new CommunityEventService();

const collabSchema = z.object({
  eventId: z.string().uuid(),
  communityId: z.string().uuid(),
});

export class CommunityEventController {
  static create = async (req: Request, res: Response) => {
    const {
      title,
      description,
      startAt,
      endAt,
      type,
      location,
      meetingLink,
      latitude,
      longitude,
      collaborations,
      includeTicket,
    } = req.body;
    const { communityId } = req.params;
    const createdById = String(req.user?.id) as string;
    const event = await runService(() =>
      service.createEvent(
        communityId,
        createdById,
        {
          title,
          description,
          startAt: new Date(startAt),
          endAt: endAt ? new Date(endAt) : undefined,
          type,
          location,
          latitude,
          longitude,
          meetingLink,
          collaborations: collaborations ? JSON.parse(collaborations) : [],
          includeTicket,
        },
        req.file as Express.Multer.File,
      ),
    );
    return sendSuccess(res, event, "Event created", 201);
  };

  static getCommunityEventDashboard = async (req: Request, res: Response) => {
    const eventId = req.params.eventId;
    const result = await runService(() =>
      service.getCommunityEventDashboard(eventId),
    );
    return sendSuccess(res, result, "Dashboard retrieved successfully");
  };

  static addCollaboration = async (req: Request, res: Response) => {
    const { eventId } = req.params;
    const body = collabSchema.parse(req.body);
    const result = await runService(() =>
      service.addCollaboration(eventId, body.communityId),
    );
    return sendSuccess(res, result, "Collaboration created", 201);
  };

  static listByCommunity = async (req: Request, res: Response) => {
    const { communityId } = req.params;
    const events = await runService(() => service.listByCommunity(communityId));
    return sendSuccess(res, events, "Events retrieved");
  };

  static detail = async (req: Request, res: Response) => {
    const { eventId } = req.params;
    const data = await runService(() => service.getEventDetail(eventId));
    return sendSuccess(res, data, "Detail event");
  };
}
