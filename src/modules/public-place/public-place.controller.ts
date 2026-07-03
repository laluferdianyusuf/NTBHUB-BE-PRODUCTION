import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { PublicPlaceService } from "./public-place.service";

const publicPlaceService = new PublicPlaceService();

export class PublicPlaceController {
  static async list(req: Request, res: Response) {
    const { latitude, longitude, search, type, page, limit } = req.query;
    const result = await runService(() =>
      publicPlaceService.getAll({
        latitude: Number(latitude),
        longitude: Number(longitude),
        search: search as string,
        type: type as string,
        page: Number(page) || 1,
        limit: Number(limit) || 20,
      }),
    );
    return sendSuccess(res, result, "Places retrieved successfully");
  }

  static async detail(req: Request, res: Response) {
    const id = req.params.id;
    const userId = req.user?.id;
    const result = await runService(() =>
      publicPlaceService.getDetail(id, String(userId)),
    );
    return sendSuccess(res, result, "Places retrieved successfully");
  }

  static async create(req: Request, res: Response) {
    const files = req.files as {
      image?: Express.Multer.File[];
      gallery?: Express.Multer.File[];
    };
    const data = await runService(() =>
      publicPlaceService.create(req.body, files),
    );
    return sendSuccess(res, data, "Public place created", 201);
  }

  static async update(req: Request, res: Response) {
    const data = await runService(() =>
      publicPlaceService.update(req.params.id, req.body),
    );
    return sendSuccess(res, data, "Success");
  }

  static async deactivate(req: Request, res: Response) {
    await runService(() => publicPlaceService.deactivate(req.params.id));
    return sendSuccess(res, { success: true }, "Public place deactivated");
  }

  static async toggleLike(req: Request, res: Response) {
    const placeId = req.params.placeId;
    const userId = req.user?.id;
    const result = await runService(() =>
      publicPlaceService.toggleLike(placeId, String(userId)),
    );
    return sendSuccess(res, result, "Place liked");
  }

  static async getLikeCount(req: Request, res: Response) {
    const placeId = req.params.placeId;
    const userId = req.user?.id;
    const result = await runService(() =>
      publicPlaceService.getLikeCount(placeId, String(userId)),
    );
    return res.status(result.status_code).json(result);
  }

  static async createImpression(req: Request, res: Response) {
    const placeId = req.params.placeId;
    const userId = req.user?.id;
    await runService(() =>
      publicPlaceService.createImpression({ placeId, userId }),
    );
    return sendSuccess(res, { success: true }, "Venue visited");
  }

  static async getImpressionCount(req: Request, res: Response) {
    const placeId = req.params.placeId;
    const result = await runService(() =>
      publicPlaceService.getImpressionCount(placeId),
    );
    return res.status(result.status_code).json(result);
  }
}
