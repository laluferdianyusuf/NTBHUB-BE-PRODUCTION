import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";

import { CourierService } from "modules/courier/courier.service";

const courierService = new CourierService();

export class CourierController {
  static async assignDelivery(req: Request, res: Response) {      const { deliveryId } = req.params;

      const result = await runService(() => courierService.assignDelivery(deliveryId));

      return sendSuccess(res, result, "Driver assigned");
    
  }

  static async rejectDelivery(req: Request, res: Response) {      const { deliveryId } = req.params;
      const { courierId } = req.body;

      if (!courierId) {
        return res.status(400).json({
          success: false,
          message: "courierId is required",
        });
      }

      const result = await runService(() => courierService.rejectDelivery(deliveryId, courierId));

      return sendSuccess(res, result, "Driver rejected");
    
  }

  static async handleTimeout(req: Request, res: Response) {      const { deliveryId } = req.params;

      const result = await runService(() => courierService.handleAssignmentTimeout(deliveryId));

      return sendSuccess(res, result, "Timeout");
    
  }
}
