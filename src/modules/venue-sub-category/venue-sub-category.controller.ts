import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { VenueSubCategoryService } from "modules/venue-sub-category/venue-sub-category.service";

const venueSubCategoryService = new VenueSubCategoryService();

export class VenueSubCategoryController {
  static async createSubCategory(req: Request, res: Response) {      const { categoryId, name, code, description, defaultConfig } = req.body;

      if (!categoryId || !name || !code || !defaultConfig) {
        return res.status(400).json({
          message: "categoryId, name, code, and defaultConfig are required",
        });
      }

      const subCategory = await runService(() => venueSubCategoryService.create({
        categoryId,
        name,
        code,
        description,
        defaultConfig,
      }));

      return sendSuccess(res, subCategory, "Venue sub-category created successfully", 201);
  }

  static async getSubCategoryByCategory(req: Request, res: Response) {      const { categoryId } = req.params;

      const subCategories =
        await runService(() => venueSubCategoryService.getByCategory(categoryId));

      return res.status(200).json({
        status: true,
        message: "Sub-category retrieved successful",
        data: subCategories,
      });
  }

  static async getAllSubCategory(req: Request, res: Response) {      const subCategories =
        await runService(() => venueSubCategoryService.getAllSubCategory());

      return res.status(200).json({
        status: true,
        message: "Sub-categories retrieved successful",
        data: subCategories,
      });
  }
  static async createMany(req: Request, res: Response) {      const { categoryId, items } = req.body;

      if (!categoryId || !items) {
        return res
          .status(400)
          .json({ message: "categoryId and items are required" });
      }

      const result = await runService(() => venueSubCategoryService.createMany(
        categoryId,
        items,
      ));
      return res
        .status(201)
        .json({ message: "VenueSubCategories created", data: result });
    
  }
}
