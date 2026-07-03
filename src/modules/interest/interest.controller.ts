import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";

import { InterestService } from "modules/interest/interest.service";

const interestService = new InterestService();

export class InterestController {
  static async getAll(req: Request, res: Response) {      const interests = await runService(() => interestService.getAllInterests());

      return sendSuccess(res, interests, "Interest retrieved successfully");
    
  }

  static async getMine(req: Request, res: Response) {      const userId = req.user?.id as string;

      const interests = await runService(() => interestService.getMyInterests(userId));

      return sendSuccess(res, interests, "My interest successfully retrieve");
    
  }

  static async updateMine(req: Request, res: Response) {      const userId = req.user?.id as string;

      const { interestIds } = req.body;

      const data = await runService(() => interestService.updateUserInterests(
        userId,
        interestIds,
      ));

      return sendSuccess(res, data, "Interests updated successfully");
    
  }
}
