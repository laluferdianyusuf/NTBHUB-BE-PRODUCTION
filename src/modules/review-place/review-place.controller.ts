import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { ReviewPublicPlaceServices } from "./review-place.service";

const reviewService = new ReviewPublicPlaceServices();

export class ReviewPlaceControllers {
  static async createReview(req: Request, res: Response) {
    const data = req.body;
    const userId = req.user?.id;
    const result = await runService(() =>
      reviewService.createPlaceReview(data, String(userId), req.file),
    );
    return sendSuccess(res, result, "Rating successful", 201);
  }

  static async getReviewById(req: Request, res: Response) {
    const id = req.params.id;
    const result = await runService(() => reviewService.getReviewPlaceById(id));
    return sendSuccess(res, result, "Rating retrieved successful");
  }

  static async getPlaceRating(req: Request, res: Response) {
    const placeId = req.params.placeId;
    const result = await runService(() => reviewService.getPlaceRating(placeId));
    return sendSuccess(res, result, "Rating retrieved successful");
  }
}
