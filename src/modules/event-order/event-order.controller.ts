import { Request, Response } from "express";
import { NotFoundError } from "shared/errors";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { EventOrderService } from "./event-order.service";

const service = new EventOrderService();

export class EventOrderController {
  static async scanQrCode(req: Request, res: Response) {
    const { qrCode } = req.body;
    const order = await runService(() => service.scanQrCode(qrCode));
    return sendSuccess(res, order, "Qr Code scanned");
  }

  static async getUsersOrder(req: Request, res: Response) {
    const userId = req.user?.id as string;
    const order = await runService(() => service.getUserEvents(userId));
    return sendSuccess(res, order, "Event orders retrieved");
  }

  static async getEventsOrder(req: Request, res: Response) {
    const { eventId } = req.params;
    const order = await runService(() => service.getEventsOrder(eventId));
    return sendSuccess(res, order, "Event orders retrieved");
  }

  static async getDetail(req: Request, res: Response) {
    const orderId = req.params.id;
    const order = await runService(() => service.getOrderDetail(orderId));
    if (!order) throw new NotFoundError("Order not found");
    return sendSuccess(res, order, "Event orders retrieved");
  }

  static async checkoutAndPay(req: Request, res: Response) {
    const userId = req.user?.id as string;
    const { selectedUserId, eventId, items, pin } = req.body;
    const result = await runService(() =>
      service.checkoutAndPay(userId, selectedUserId, eventId, items, pin),
    );
    return sendSuccess(res, result, "Order payment successful");
  }
}
