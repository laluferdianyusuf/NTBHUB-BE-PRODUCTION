import { WithdrawStatus } from "@prisma/client";
import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";

import { WithdrawService } from "modules/withdraw/withdraw.service";

const service = new WithdrawService();

export class WithdrawController {
  static async request(req: Request, res: Response) {      const { accountId } = req.params;
      const currentUserId = req.user?.id as string;

      const result = await runService(() => service.requestWithdraw(
        currentUserId,
        accountId,
        req.body,
      ));

      return sendSuccess(res, result, "Withdraw created", 201);
    
  }

  static async approve(req: Request, res: Response) {      const { id } = req.params;
      const adminId = req.user?.id as string;

      const result = await runService(() => service.approveWithdraw(id, adminId));

      return sendSuccess(res, result, "Withdraw approved");
    
  }

  static async processing(req: Request, res: Response) {      const { id } = req.params;
      const adminId = req.user?.id as string;

      const result = await runService(() => service.markProcessing(id, adminId));
      return sendSuccess(res, result, "Withdraw marked as processing");
    
  }

  static async paid(req: Request, res: Response) {      const { id } = req.params;
      const adminId = req.user?.id as string;
      const { proofUrl } = req.body;

      const result = await runService(() => service.markAsPaid(id, adminId, proofUrl));

      return sendSuccess(res, result, "Withdraw marked as paid");
    
  }

  static async reject(req: Request, res: Response) {      const { id } = req.params;
      const adminId = req.user?.id as string;
      const { reason } = req.body;

      if (!reason) {      }

      const result = await runService(() => service.rejectWithdraw(id, adminId, reason));

      return sendSuccess(res, result, "Withdraw rejected");
    
  }

  static async list(req: Request, res: Response) {      const { status, page, limit } = req.query;

      const result = await runService(() => service.getAllWithdraws({
        status: status as WithdrawStatus,
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 20,
      }));
      return sendSuccess(res, result, "Withdrawal retrieved");
    
  }

  static async listByAccount(req: Request, res: Response) {      const { accountId } = req.params;
      const currentUserId = req.user?.id as string;
      const { status, page, limit } = req.query;

      const result = await runService(() => service.getWithdrawsByAccount(
        accountId,
        currentUserId,
        {
          status: status as WithdrawStatus,
          page: page ? Number(page) : 1,
          limit: limit ? Number(limit) : 20,
        },
      ));
      return sendSuccess(res, result, "Withdrawal retrieved");
    
  }

  static async byVenue(req: Request, res: Response) {      const { venueId } = req.params;

      const result = await runService(() => service.getWithdrawsByVenue(venueId));

      return sendSuccess(res, result, "Withdrawal retrieved");
    
  }
}
