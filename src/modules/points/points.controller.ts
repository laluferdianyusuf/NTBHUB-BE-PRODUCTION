import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";

import { PointsServices } from "modules/points/points.service";

const pointsServices = new PointsServices();

export class PointsController {
  static async getUserTotalPoints(req: Request, res: Response) {      const userId = req.params.userId;
      const result = await runService(() => pointsServices.getUserTotalPoints(userId));
      return sendSuccess(res, result, "Points retrieved");
    
  }

  static async getPointByUserId(req: Request, res: Response) {      const userId = req.params.userId;
      const result = await runService(() => pointsServices.getPointByUserId(userId));
      return sendSuccess(res, result, "Points retrieved");
    
  }
}
