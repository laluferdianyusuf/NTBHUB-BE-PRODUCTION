import { Request, Response } from "express";
import {
  UnauthorizedError,
  ValidationError,
} from "shared/errors";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { PresenceService } from "./presence.service";

const presenceService = new PresenceService();

export class PresenceController {
  static async heartbeat(req: Request, res: Response) {
    const userId = req.user?.id;
    const { context, contextId, latitude, longitude } = req.body;

    if (!userId) {
      throw new UnauthorizedError();
    }

    if (!context || latitude == null || longitude == null) {
      throw new ValidationError(
        "context, latitude, and longitude are required",
      );
    }

    await runService(() => presenceService.heartbeat(
      String(userId),
      context,
      Number(latitude),
      Number(longitude),
      contextId,
    ));

    return sendSuccess(res, { success: true }, "Heartbeat recorded");
  }

  static async listOnline(req: Request, res: Response) {
    const { context, contextId } = req.query;

    if (!context) {
      throw new ValidationError("context is required");
    }

    const users = await runService(() => presenceService.listOnline(
      context as string,
      contextId as string | undefined,
    ));

    return sendSuccess(res, { total: users.length, users }, "Online users");
  }

  static async nearbyOnline(req: Request, res: Response) {
    const { context, contextId, latitude, longitude, radius } = req.query;

    if (!context || !latitude || !longitude) {
      throw new ValidationError(
        "context, latitude and longitude are required",
      );
    }

    const users = await runService(() => presenceService.getNearbyOnlineUsers(
      Number(latitude),
      Number(longitude),
      Number(radius ?? 5),
      context as string,
      contextId as string | undefined,
    ));

    return sendSuccess(res, { total: users.length, users }, "Nearby users");
  }
}

/** @deprecated Use PresenceController — kept for legacy barrel exports. */
export const heartbeat = PresenceController.heartbeat;
export const listOnline = PresenceController.listOnline;
export const nearbyOnline = PresenceController.nearbyOnline;
