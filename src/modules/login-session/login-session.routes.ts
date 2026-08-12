import { Router } from "express";
import { asyncHandler } from "middlewares/asyncHandler";
import { auth } from "shared/middleware/auth";
import { LoginSessionController } from "./login-session.controllers";

const router = Router();

router.get(
  "/",
  auth.authenticate,
  asyncHandler(LoginSessionController.getSessions),
);

router.get(
  "/active",
  auth.authenticate,
  LoginSessionController.getActiveSessions,
);

router.get(
  "/:sessionId",
  auth.authenticate,
  LoginSessionController.getSessionById,
);

router.post(
  "/:sessionId/logout",
  auth.authenticate,
  LoginSessionController.logoutSession,
);

router.post(
  "/:sessionId/revoke",
  auth.authenticate,
  LoginSessionController.revokeSession,
);

router.post(
  "/:sessionId/logout-others",
  auth.authenticate,
  LoginSessionController.logoutAllOtherSessions,
);

export default router;
