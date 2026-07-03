import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";

import { MenuServices } from "modules/menu/menu.service";

const menuService = new MenuServices();

export class MenuControllers {
  static async createMenu(req: Request, res: Response) {      const data = req.body;
      const result = await runService(() => menuService.createMenu(
        data,
        req.file as Express.Multer.File,
      ));

      return sendSuccess(res, result, "Menu created", 201);
    
  }

  static async createManyMenus(req: Request, res: Response) {      const { venueId, items } = req.body;

      const parsedItems = JSON.parse(items);

      const result = await runService(() => menuService.createManyMenus(
        venueId,
        parsedItems,
        req.files as Express.Multer.File[],
      ));

      return sendSuccess(res, result, "Menu created", 201);
    
  }

  static async getMenuByVenueId(req: Request, res: Response) {      const venueId = req.params.venueId;
      const result = await runService(() => menuService.getMenuByVenueId(venueId));

      res.status(200).json({
        status: true,
        message: "Menu retrieved successful",
        data: result,
      });
    
  }

  static async getMenuById(req: Request, res: Response) {      const id = req.params.id;
      const result = await runService(() => menuService.getMenuById(id));

      res.status(200).json({
        status: true,
        message: "Menu retrieved successful",
        data: result,
      });
    
  }

  static async updateMenu(req: Request, res: Response) {      const id = req.params.id;
      const data = req.body;
      const result = await runService(() => menuService.updateMenu(
        id,
        data,
        req.file as Express.Multer.File,
      ));

      res.status(200).json({
        status: true,
        message: "Menu created successful",
        data: result,
      });
    
  }

  static async deleteMenu(req: Request, res: Response) {      const id = req.params.id;
      const result = await runService(() => menuService.deleteMenu(id));

      res.status(203).json({
        status: true,
        message: "Menu deleted successful",
        data: result,
      });
    
  }
  static async getAllMenus(req: Request, res: Response) {      const result = await runService(() => menuService.getAllMenus());

      res.status(200).json({
        status: true,
        message: "Menu retrieved successful",
        data: result,
      });
    
  }

  static toggleMenuStatus = async (req: Request, res: Response) => {      const { id } = req.params;

      const result = await runService(() => menuService.toggleMenuStatus(id));

      return sendSuccess(res, result.data, result.message);
    
  };
}
