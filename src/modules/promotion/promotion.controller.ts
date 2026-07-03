import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";

import { PromotionService } from "modules/promotion/promotion.service";
import { CreatePromotionInput } from "types/promotion-create.types";

const promotionService = new PromotionService();

export class PromotionController {
  static async createPromotion(req: Request, res: Response) {      const data: CreatePromotionInput = req.body;

      const promotion = await runService(() => promotionService.createPromotion(data));

      return sendSuccess(res, promotion, "Promotion added to this venue", 201);
    
  }

  static async approvePromotion(req: Request, res: Response) {      const { promotionId } = req.params;

      const adminId = req.user?.id as string;

      const promotion = await runService(() => promotionService.approvePromotion(
        promotionId,
        adminId,
      ));

      return sendSuccess(res, promotion, "Promotion approved");
    
  }

  static async rejectPromotion(req: Request, res: Response) {      const { promotionId } = req.params;

      const promotion =
        await runService(() => promotionService.rejectPromotion(promotionId));

      return sendSuccess(res, promotion, "Promotion rejected");
    
  }

  static async getPromotionSummary(req: Request, res: Response) {      const { venueId } = req.params;

      const result = await runService(() => promotionService.getSummary(venueId));

      return sendSuccess(res, result, "Promotion summary fetched");
    
  }

  static async getPromotionByVenue(req: Request, res: Response) {      const { venueId } = req.params;

      const { search, status, page = "1", limit = "20" } = req.query;

      const result = await runService(() => promotionService.getByVenue({
        venueId,
        search: search as string,
        status: status as string,
        page: Number(page),
        limit: Number(limit),
      }));

      return sendSuccess(res, result, "Promotions fetched");
    
  }
}
