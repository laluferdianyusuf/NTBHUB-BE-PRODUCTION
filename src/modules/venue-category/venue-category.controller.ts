import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";

import { VenueCategoryService } from "modules/venue-category/venue-category.service";

const venueCategoryService = new VenueCategoryService();

export class VenueCategoryController {
  static async createCategory(req: Request, res: Response) {      const { name, code, icon } = req.body;

      if (!name || !code) {
        return res.status(400).json({
          message: "name and code are required",
        });
      }

      const category = await runService(() => venueCategoryService.create({
        name,
        code,
        icon,
      }));

      return sendSuccess(res, category, "Venue category created successfully", 201);
  }

  static async getAllCategory(_req: Request, res: Response) {      const categories = await runService(() => venueCategoryService.getAll());

      return sendSuccess(res, categories, "Categories retrieved");
    
  }
}
