import { Request, Response } from "express";
import { ValidationError } from "shared/errors";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { EventTicketService } from "./event-ticket.service";

const service = new EventTicketService();

export class EventTicketController {
  static async getTicketById(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) throw new ValidationError("ID_REQUIRED");
    const result = await runService(() => service.getTicketById(id));
    return sendSuccess(res, result, "TICKET FOUND");
  }

  static async getTicketByUserId(req: Request, res: Response) {
    const { userId } = req.params;
    if (!userId) throw new ValidationError("USER_ID_REQUIRED");
    const result = await runService(() => service.getTicketByUserId(userId));
    return sendSuccess(res, result, "TICKET FOUND");
  }

  static async getTicketByOrderId(req: Request, res: Response) {
    const { orderId } = req.params;
    if (!orderId) throw new ValidationError("ORDER_ID_REQUIRED");
    const result = await runService(() => service.getTicketByOrderId(orderId));
    return sendSuccess(res, result, "TICKET FOUND");
  }
}
