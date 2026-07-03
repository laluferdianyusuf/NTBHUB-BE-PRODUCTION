import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { AccountService } from "./account.service";

const accountService = new AccountService();

export class AccountController {
  static async ensureAccount(req: Request, res: Response) {
    const account = await runService(() => accountService.ensureAccount(req.body));
    return sendSuccess(res, account, "Account created", 201);
  }

  static async getAccountByType(req: Request, res: Response) {
    const { type, id } = req.params;
    const account = await runService(() =>
      accountService.getAccountByType(type.toUpperCase() as any, id),
    );
    return sendSuccess(res, account, "Account retrieved");
  }
}
