import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";

import { FinanceService } from "modules/finance/finance.service";

const service = new FinanceService();

export class FinanceController {
  static async dashboard(req: Request, res: Response) {      const venueId = String(req.params.venueId);
      const range = (req.query.range as "7d" | "30d" | "90d" | "1y") || "30d";

      const data = await runService(() => service.getDashboard(venueId, range));

      return sendSuccess(res, data, "Finance dashboard fetched successfully");
    
  }

  static async summary(req: Request, res: Response) {      const venueId = String(req.params.venueId);

      const data = await runService(() => service.getSummary(venueId));

      return sendSuccess(res, data, "Finance summary fetched successfully");
    
  }

  static async transactions(req: Request, res: Response) {      const venueId = String(req.params.venueId);

      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 20);
      const type = req.query.type as string | undefined;

      const data = await runService(() => service.getTransactions(venueId, page, limit, type));

      return sendSuccess(
        res,
        data,
        "Finance transactions fetched successfully",
      );
    
  }

  static async withdrawals(req: Request, res: Response) {      const venueId = String(req.params.venueId);

      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 20);

      const data = await runService(() => service.getWithdrawals(venueId, page, limit));

      return sendSuccess(res, data, "Withdrawals fetched successfully");
    
  }
}
