import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";
import { sendSuccess } from "shared/http/response";
import { LogServices } from "modules/log/log.service";

const router = Router();
const logServices = new LogServices();

const getAllLogs = asyncHandler(async (_req, res) => {
  const response = await logServices.getAllLogs();
  sendSuccess(res, response, "Logs retrieved");
});

router.get(
  "/log/logs",
  auth.authenticate,
  auth.authorizeGlobalRole(["ADMIN"]),
  getAllLogs,
);

export default router;
