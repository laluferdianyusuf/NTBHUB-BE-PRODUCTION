import { LedgerReferenceType } from "@prisma/client";
import { Request, Response } from "express";
import { ValidationError } from "shared/errors";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { AccountRepository } from "modules/account/account.repository";
import { LedgerRepository } from "modules/ledger/ledger.repository";
import { UserRepository } from "modules/users/users.repository";
import { LedgerServices } from "./ledger.service";

const ledgerService = new LedgerServices(
  new LedgerRepository(),
  new UserRepository(),
  new AccountRepository(),
);

export class LedgerController {
  static getHistory = async (req: Request, res: Response) => {
    const { accountId } = req.params;
    const { limit = 20, cursor } = req.query;
    if (!accountId) throw new ValidationError("accountId is required");

    const result = await runService(() =>
      ledgerService.findHistory(
        accountId,
        Number(limit),
        cursor as string | undefined,
      ),
    );
    return sendSuccess(res, result, "Histories retrieved");
  };

  static getAllTransactions = async (req: Request, res: Response) => {
    const { page = 1, limit = 20, type, mode } = req.query;
    const result = await runService(() =>
      ledgerService.getAllTransactions(
        Number(page),
        Number(limit),
        type as string | undefined,
        mode as "USER_TRANSACTION" | "APP_REVENUE" | undefined,
      ),
    );
    return sendSuccess(res, result, "All transactions retrieved");
  };

  static getBalances = async (req: Request, res: Response) => {
    const { accountId } = req.params;
    if (!accountId) throw new ValidationError("accountId is required");

    const result = await runService(() => ledgerService.getBalances(accountId));
    return sendSuccess(res, result, "Balances retrieved");
  };

  static async getBalance(req: Request, res: Response) {
    const { userId, venueId, courierId, eventId, communityEventId } = req.query;
    const result = await runService(() =>
      ledgerService.getBalanceByOwner({
        userId: userId as string | undefined,
        venueId: venueId as string | undefined,
        courierId: courierId as string | undefined,
        eventId: eventId as string | undefined,
        communityEventId: communityEventId as string | undefined,
      }),
    );
    return sendSuccess(res, result, "Balances retrieved");
  }

  static getUserTransactions = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) throw new ValidationError("Unauthorized");

    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const referenceType = req.query.referenceType as LedgerReferenceType;

    const result = await runService(() =>
      ledgerService.getUserTransactions(userId, { page, limit, referenceType }),
    );
    return sendSuccess(res, result, "Histories retrieved");
  };

  static getVenueTransactions = async (req: Request, res: Response) => {
    const { venueId } = req.params;
    const { cursor } = req.query;
    if (!venueId) throw new ValidationError("venueId is required");

    const result = await runService(() =>
      ledgerService.getVenueTransactions(venueId, cursor as string | undefined),
    );
    return sendSuccess(res, result, "Histories retrieved");
  };

  static getCommunityEventTransactions = async (req: Request, res: Response) => {
    const { communityEventId } = req.params;
    const { cursor } = req.query;
    if (!communityEventId) {
      throw new ValidationError("communityEventId is required");
    }

    const result = await runService(() =>
      ledgerService.getCommunityEventTransactions(
        communityEventId,
        cursor as string | undefined,
      ),
    );
    return sendSuccess(res, result, "Histories retrieved");
  };

  static getEventTransactions = async (req: Request, res: Response) => {
    const { eventId } = req.params;
    const { cursor } = req.query;
    if (!eventId) throw new ValidationError("eventId is required");

    const result = await runService(() =>
      ledgerService.getEventTransactions(eventId, cursor as string | undefined),
    );
    return sendSuccess(res, result, "Histories retrieved");
  };

  static getCourierTransactions = async (req: Request, res: Response) => {
    const { courierId } = req.params;
    const { cursor } = req.query;
    if (!courierId) throw new ValidationError("courierId is required");

    const result = await runService(() =>
      ledgerService.getCourierTransactions(courierId, cursor as string | undefined),
    );
    return sendSuccess(res, result, "Histories retrieved");
  };
}
