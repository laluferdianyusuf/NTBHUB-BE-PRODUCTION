import { Request, Response } from "express";
import { sendSuccess } from "helpers/response";
import { runService } from "shared/index";
import { LoginSessionService } from "./login-session.services";

const loginSessionService = new LoginSessionService();

export class LoginSessionController {
  static async getSessions(req: Request, res: Response) {
    const userId = req.user.id;

    const sessions = await runService(() =>
      loginSessionService.getUserSessions(userId),
    );

    return sendSuccess(res, sessions, "Sessions retrieved");
  }

  static async getActiveSessions(req: Request, res: Response) {
    const userId = req.user.id;

    const sessions = await runService(() =>
      loginSessionService.getActiveSessions(userId),
    );

    return sendSuccess(res, sessions, "Sessions retrieved");
  }

  static async getSessionById(req: Request, res: Response) {
    const userId = req.user.id;
    const { sessionId } = req.params;

    const session = await runService(() =>
      loginSessionService.getSessionById(sessionId, userId),
    );

    return sendSuccess(res, session, "Login session retrieved successfully");
  }

  static async logoutSession(req: Request, res: Response) {
    const userId = req.user.id;
    const { sessionId } = req.params;

    await runService(() =>
      loginSessionService.logoutSession(sessionId, userId),
    );

    return sendSuccess(res, "Session logged out successfully");
  }

  static async revokeSession(req: Request, res: Response) {
    const userId = req.user.id;
    const { sessionId } = req.params;

    await runService(() =>
      loginSessionService.revokeSession(sessionId, userId),
    );

    return sendSuccess(res, "Session revoked successfully");
  }

  static async logoutAllOtherSessions(req: Request, res: Response) {
    const userId = req.user.id;
    const { sessionId } = req.params;

    const result = await runService(() =>
      loginSessionService.logoutAllOtherSessions(userId, sessionId),
    );

    return sendSuccess(
      res,
      result.count,
      "All other sessions have been logged out",
    );
  }
}
