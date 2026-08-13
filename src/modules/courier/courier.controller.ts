import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { CourierService } from "modules/courier/courier.service";
import { subscribeDeliveryStream } from "services/delivery.sse.service";

const courierService = new CourierService();

export class CourierController {
  static async register(req: Request, res: Response) {
    const userId = req.user!.id;
    const { vehicleType, plateNumber, photo } = req.body;

    const result = await runService(() =>
      courierService.registerCourier(userId, {
        vehicleType,
        plateNumber,
        photo,
      }),
    );

    return sendSuccess(res, result, "Courier registered", 201);
  }

  static async getProfile(req: Request, res: Response) {
    const result = await runService(() =>
      courierService.getProfile(req.user!.id),
    );
    return sendSuccess(res, result, "Courier profile retrieved");
  }

  static async updateStatus(req: Request, res: Response) {
    const { status } = req.body;
    const result = await runService(() =>
      courierService.updateAvailability(req.user!.id, status),
    );
    return sendSuccess(res, result, "Courier status updated");
  }

  static async updateLocation(req: Request, res: Response) {
    const { latitude, longitude } = req.body;
    const result = await runService(() =>
      courierService.updateLocation(req.user!.id, latitude, longitude),
    );
    return sendSuccess(res, result, "Location updated");
  }

  static async getActiveDelivery(req: Request, res: Response) {
    const result = await runService(() =>
      courierService.getActiveDelivery(req.user!.id),
    );
    return sendSuccess(res, result, "Active delivery retrieved");
  }

  static async getDeliveryHistory(req: Request, res: Response) {
    const result = await runService(() =>
      courierService.getDeliveryHistory(req.user!.id),
    );
    return sendSuccess(res, result, "Delivery history retrieved");
  }

  static async getDelivery(req: Request, res: Response) {
    const result = await runService(() =>
      courierService.getDeliveryById(req.params.deliveryId, req.user!.id),
    );
    return sendSuccess(res, result, "Delivery retrieved");
  }

  static async getDeliveryByOrder(req: Request, res: Response) {
    const result = await runService(() =>
      courierService.getDeliveryByOrderId(req.params.orderId, req.user!.id),
    );
    return sendSuccess(res, result, "Delivery retrieved");
  }

  static async acceptDelivery(req: Request, res: Response) {
    const result = await runService(() =>
      courierService.acceptDelivery(req.params.deliveryId, req.user!.id),
    );
    return sendSuccess(res, result, "Delivery accepted");
  }

  static async rejectDelivery(req: Request, res: Response) {
    const result = await runService(() =>
      courierService.rejectDelivery(req.params.deliveryId, req.user!.id),
    );
    return sendSuccess(res, result, "Delivery rejected");
  }

  static async markPickedUp(req: Request, res: Response) {
    const result = await runService(() =>
      courierService.markPickedUp(req.params.deliveryId, req.user!.id),
    );
    return sendSuccess(res, result, "Order picked up");
  }

  static async markOnTheWay(req: Request, res: Response) {
    const result = await runService(() =>
      courierService.markOnTheWay(req.params.deliveryId, req.user!.id),
    );
    return sendSuccess(res, result, "Courier on the way");
  }

  static async markDelivered(req: Request, res: Response) {
    const result = await runService(() =>
      courierService.markDelivered(req.params.deliveryId, req.user!.id),
    );
    return sendSuccess(res, result, "Delivery completed");
  }

  static async assignDelivery(req: Request, res: Response) {
    const result = await runService(() =>
      courierService.assignDelivery(req.params.deliveryId),
    );
    return sendSuccess(res, result, "Driver assigned");
  }

  static async streamDelivery(req: Request, res: Response) {
    const userId = req.user!.id;
    const { deliveryId } = req.params;

    await runService(() =>
      courierService.verifyDeliveryStreamAccess(deliveryId, userId),
    );

    await subscribeDeliveryStream(deliveryId, res);
  }
}
