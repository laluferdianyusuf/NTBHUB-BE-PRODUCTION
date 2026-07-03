import { Router } from "express";
import { auth } from "shared/middleware/auth";
import { asyncHandler } from "shared/http/asyncHandler";
import { PresenceController } from "./presence.controller";

const router = Router();

router.post(
  "/heartbeat",
  auth.authenticate,
  asyncHandler(PresenceController.heartbeat),
);
router.get(
  "/online",
  auth.authenticate,
  asyncHandler(PresenceController.listOnline),
);
router.get(
  "/nearby",
  auth.authenticate,
  asyncHandler(PresenceController.nearbyOnline),
);

export default router;
