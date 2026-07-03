import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { PromotionBannerService } from "modules/promotion-banner/promotion-banner.service";

const service = new PromotionBannerService();

export class PromotionBannerController {
  static async getActiveBanners(req: Request, res: Response) {      const data = await runService(() => service.getActiveBanners());

      return res.json({
        status: true,
        message: "Success",
        data,
      });
  }

  static async recordView(req: Request, res: Response) {      const { id } = req.params;

      await runService(() => service.recordView(
        id,
        (req as any).user?.id,
        req.ip,
        req.headers["user-agent"],
      ));

      return res.json({
        status: true,
        message: "View recorded",
      });
  }

  static async recordClick(req: Request, res: Response) {      const { id } = req.params;

      await runService(() => service.recordClick(id, (req as any).user?.id));

      return res.json({
        status: true,
        message: "Click recorded",
      });
  }

  // (admin)
  static async createPromotion(req: Request, res: Response) {      const adminId = (req as any).user?.id;

      const data = await runService(() => service.createPromotion(req.body, adminId));

      return res.json({
        status: true,
        message: "Promotion created",
        data,
      });
  }

  // (admin)
  static async updatePromotion(req: Request, res: Response) {      const { id } = req.params;

      const data = await runService(() => service.updatePromotion(id, req.body));

      return res.json({
        status: true,
        message: "Promotion updated",
        data,
      });
  }

  // (admin)
  static async deactivatePromotion(req: Request, res: Response) {      const { id } = req.params;

      const data = await runService(() => service.deactivatePromotion(id));

      return res.json({
        status: true,
        message: "Promotion deactivated",
        data,
      });
  }

  static async getAnalytics(req: Request, res: Response) {      const { id } = req.params;

      const data = await runService(() => service.getAnalytics(id));

      return res.json({
        status: true,
        message: "Success",
        data,
      });
  }
}
