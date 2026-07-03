import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";

import { CommunityEventTicketTypeService } from "modules/community-event-ticket-type/community-event-ticket-type.service";

const ticketTypeService = new CommunityEventTicketTypeService();

export class CommunityEventTicketTypeController {
  static createTicketType = async (req: Request, res: Response) => {      const actorId = req.user?.id as string; // assume auth middleware injects user
      const { communityEventId } = req.params;

      const { name, price, quota, description } = req.body;

      if (!actorId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const result = await runService(() => ticketTypeService.createTicketType({
        actorId,
        communityEventId,
        name,
        price,
        quota,
        description,
      }));

      return sendSuccess(res, result, "Create success", 201);
    
  };

  static findAllTicketTypes = async (req: Request, res: Response) => {      const actorId = req.user?.id; // optional (public allowed)
      const { communityEventId } = req.params;

      const { includeInactive, page, limit, sortBy, sortOrder } = req.query;

      const result = await runService(() => ticketTypeService.findAllTicketTypes({
        actorId,
        communityEventId,
        includeInactive: includeInactive === "true",
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
        sortBy: sortBy as any,
        sortOrder: sortOrder as any,
      }));

      return sendSuccess(res, result, "Tickets retrieved");
    
  };
}
