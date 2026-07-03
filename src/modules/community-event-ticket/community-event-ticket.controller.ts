import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { CommunityEventTicketService } from "modules/community-event-ticket/community-event-ticket.service";


const service = new CommunityEventTicketService();

export class CommunityEventTicketController {
  static async getTicketById(req: Request, res: Response) {      const { id } = req.params;

      const result = await runService(() => service.getTicketById(id));

      return sendSuccess(res, result, "Ticket found");
    
  }

  static async getTicketByUserId(req: Request, res: Response) {      const { userId } = req.params;

      const result = await runService(() => service.getTicketByUserId(userId));

      return sendSuccess(res, result, "Ticket found");
    
  }

  static async getTicketByOrderId(req: Request, res: Response) {      const { orderId } = req.params;

      const result = await runService(() => service.getTicketByOrderId(orderId));

      return sendSuccess(res, result, "Ticket found");
    
  }
}
