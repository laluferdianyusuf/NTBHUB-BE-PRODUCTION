import { Request, Response } from "express";
import { ValidationError } from "shared/errors";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { EventTicketTypeService } from "./event-ticket-type.service";

const service = new EventTicketTypeService();

export class EventTicketTypeController {
  static async create(req: Request, res: Response) {
    const { eventId, name, price, quota, description } = req.body;
    const ticketType = await runService(() =>
      service.createTicketType({ eventId, name, price, quota, description }),
    );
    return sendSuccess(res, ticketType, "Ticket type created", 201);
  }

  static async getByEvent(req: Request, res: Response) {
    const { eventId } = req.params;
    const data = await runService(() => service.getByEvent(eventId));
    return sendSuccess(res, data, "Ticket types retrieved");
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const updated = await runService(() => service.updateTicketType(id, req.body));
    return sendSuccess(res, updated, "Ticket type updated");
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    await runService(() => service.deleteTicketType(id));
    return sendSuccess(res, { success: true }, "Ticket type deleted");
  }
}
