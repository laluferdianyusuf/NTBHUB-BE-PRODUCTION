import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";

import { ReviewServices } from "modules/review/review.service";

const reviewService = new ReviewServices();

export class ReviewControllers {
  static async createReview(req: Request, res: Response) {      const data = req.body;
      const result = await runService(() => reviewService.createReview(data, req.file));
      return sendSuccess(res, result, "Rating success");
    
  }

  static async getReviewByBookingId(req: Request, res: Response) {      const bookingId = req.params.bookingId;
      const result = await runService(() => reviewService.getReviewByBookingId(bookingId));
      return sendSuccess(res, result, "Rating retrieved successful");
    
  }

  static async getVenueRating(req: Request, res: Response) {      const venueId = req.params.venueId;
      const result = await runService(() => reviewService.getVenueRating(venueId));
      return sendSuccess(res, result, "Rating retrieved successful");
    
  }
}
