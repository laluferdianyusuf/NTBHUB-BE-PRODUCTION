import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";

import { FloorServices } from "modules/floor/floor.service";
const floorServices = new FloorServices();

export class FloorControllers {
  static async createFloor(req: Request, res: Response) {      const data = req.body;
      const venueId = req.params.venueId;
      const result = await runService(() => floorServices.createFloor(data, venueId));

      return sendSuccess(res, result, "Floor created", 201);
    
  }

  static async getFloorByVenueId(req: Request, res: Response) {      const venueId = req.params.venueId;
      const result = await runService(() => floorServices.getFloorsByVenueId(venueId));

      return sendSuccess(res, result, "Floor retrieved");
    
  }

  static async getFloorById(req: Request, res: Response) {      const id = req.params.id;
      const result = await runService(() => floorServices.getFloorById(id));

      return sendSuccess(res, result, "Floor retrieved");
    
  }

  static async updateFloor(req: Request, res: Response) {      const id = req.params.id;
      const data = req.body;
      const result = await runService(() => floorServices.updateFloor(id, data));

      return sendSuccess(res, result, "Floor updated");
    
  }

  static async deleteFloor(req: Request, res: Response) {      const id = req.params.id;
      const result = await runService(() => floorServices.deleteFloor(id));

      return sendSuccess(res, result, "Floor deleted");
    
  }
}
