import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";

import { OrderServices } from "modules/order/order.service";

const orderService = new OrderServices();

export class OrderControllers {
  static async createNewOrder(req: Request, res: Response) {      const userId = req.user?.id as string;
      const { venueId, items, promoCode } = req.body;

      const result = await runService(() => orderService.createNewOrder({
        venueId,
        userId,
        items,
        promoCode,
      }));

      return sendSuccess(res, result, "Order created", 201);
    
  }

  static async cancelOrder(req: Request, res: Response) {      const { orderId } = req.params;
      const userId = req.user?.id as string;

      const result = await runService(() => orderService.cancelOrder(orderId, userId));

      return sendSuccess(res, result, "Order created", 203);
    
  }

  static async payOrder(req: Request, res: Response) {      const { orderId } = req.params;
      const userId = req.user?.id as string;
      const { pin } = req.body;

      const result = await runService(() => orderService.payOrder(orderId, userId, pin));

      return sendSuccess(res, result, "Order payed", 203);
    
  }

  static async findAllUsersOrder(req: Request, res: Response) {      const userId = req.user?.id as string;

      const result = await runService(() => orderService.getAllByUser(userId));

      return sendSuccess(res, result, "Order retrieved");
    
  }
}
