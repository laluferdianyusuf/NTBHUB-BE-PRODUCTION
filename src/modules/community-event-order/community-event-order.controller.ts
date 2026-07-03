import { Request, Response } from "express";
import { NotFoundError } from "shared/errors";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { CommunityEventOrderService } from "./community-event-order.service";

const orderService = new CommunityEventOrderService();

export class CommunityEventOrderController {
  static checkoutAndPay = async (req: Request, res: Response) => {
    const userId = req.user?.id as string;
    const { selectedUserId, eventId, items, pin } = req.body;
    const result = await runService(() =>
      orderService.checkoutAndPay(userId, selectedUserId, eventId, items, pin),
    );
    return sendSuccess(res, result, "Order payment successful");
  };

  static scanQrCode = async (req: Request, res: Response) => {
    const { qrCode } = req.body;
    const order = await runService(() => orderService.scanQrCode(qrCode));
    return sendSuccess(res, order, "Qr Code scanned");
  };

  static getEventOrders = async (req: Request, res: Response) => {
    const userId = req.user?.id as string;
    const result = await runService(() => orderService.getEventOrders(userId));
    return sendSuccess(res, result, "Tickets retrieved");
  };

  static async getDetail(req: Request, res: Response) {
    const orderId = req.params.id;
    const order = await runService(() => orderService.getOrderDetail(orderId));
    if (!order) throw new NotFoundError("Order not found");
    return sendSuccess(res, order, "Event orders retrieved");
  }
}
