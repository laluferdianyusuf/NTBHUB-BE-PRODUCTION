import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";

import { UserBalanceServices } from "modules/user-balance/user-balance.service";

const userBalanceServices = new UserBalanceServices();

export class UserBalanceController {
  static async getUserBalance(req: Request, res: Response) {      const userId = req.params.userId;
      const result = await runService(() => userBalanceServices.getUserBalance(userId));
      return sendSuccess(res, result, "User balance retrieved");
    
  }
}
