import { Request, Response } from "express";
import { ForbiddenError } from "shared/errors";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { UserRoleRepository } from "modules/user-role/user-role.repository";
import { subscribePaymentStream } from "services/sse.service";
import { PaymentServices } from "./payment.service";

const paymentServices = new PaymentServices();
const userRoleRepository = new UserRoleRepository();

export class PaymentController {
  static async topUp(req: Request, res: Response) {
    const userId = req.user!.id;
    const { amount, bankCode } = req.body;
    const result = await runService(() =>
      paymentServices.TopUp({ userId, amount, bankCode }),
    );
    return sendSuccess(res, result, "Top up successful", 201);
  }

  static async topUpQris(req: Request, res: Response) {
    const userId = req.user!.id;
    const { amount } = req.body;
    const result = await runService(() =>
      paymentServices.TopUpQris({ userId, amount }),
    );
    return sendSuccess(res, result, "Top up successful", 201);
  }

  static async midtransCallback(req: Request, res: Response) {
    res.status(200).send("OK");
    await runService(() => paymentServices.midtransCallback(req.body));
  }

  static async getPaymentsByUser(req: Request, res: Response) {
    const requestedUserId = req.params.userId;
    const authenticatedUserId = req.user!.id;

    if (requestedUserId !== authenticatedUserId) {
      const isAdmin = await runService(() =>
        userRoleRepository.hasRole({
          userId: authenticatedUserId,
          role: "ADMIN",
        }),
      );
      if (!isAdmin) throw new ForbiddenError();
    }

    const cursor = req.query.cursor as string | undefined;
    const limit = parseInt(req.query.limit as string) || 20;
    const result = await runService(() =>
      paymentServices.findAllPaymentsByUserId(requestedUserId, cursor, limit),
    );
    return sendSuccess(res, result, "Transaction retrieved");
  }

  static async getPaymentStatus(req: Request, res: Response) {
    const userId = req.user!.id;
    const { paymentId } = req.params;

    const result = await runService(() =>
      paymentServices.getPaymentStatus(paymentId, userId),
    );

    return sendSuccess(res, result, "Payment status retrieved");
  }

  static async streamPaymentStatus(req: Request, res: Response) {
    const userId = req.user!.id;
    const { paymentId } = req.params;

    await runService(() =>
      paymentServices.verifyPaymentStreamAccess(paymentId, userId),
    );

    await subscribePaymentStream(paymentId, res);
  }
}
