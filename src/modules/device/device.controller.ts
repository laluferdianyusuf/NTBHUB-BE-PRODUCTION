import { Request, Response } from "express";
import {
  ForbiddenError,
  NotFoundError,
} from "shared/errors";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { UserRoleRepository } from "modules/user-role/user-role.repository";
import { VenueRepository } from "modules/venue/venue.repository";
import { DeviceService } from "./device.service";

const service = new DeviceService();
const userRoleRepository = new UserRoleRepository();
const venueRepository = new VenueRepository();

export class DeviceController {
  static async registerDevice(req: Request, res: Response) {
    const authenticatedUserId = req.user!.id;
    const { venueId, ...rest } = req.body;

    if (venueId) {
      const venue = await runService(() => venueRepository.findVenueById(venueId));
      if (!venue) throw new NotFoundError("Venue not found");

      const isVenueOwner = await runService(() =>
        userRoleRepository.hasRole({
          userId: authenticatedUserId,
          role: "VENUE_OWNER",
          venueId,
        }),
      );
      const isAdmin = await runService(() =>
        userRoleRepository.hasRole({
          userId: authenticatedUserId,
          role: "ADMIN",
        }),
      );

      if (!isVenueOwner && !isAdmin) throw new ForbiddenError();

      const result = await runService(() =>
        service.registerDevice({ ...rest, venueId }),
      );
      return sendSuccess(res, result, "Device registered", 201);
    }

    const result = await runService(() =>
      service.registerDevice({ ...rest, userId: authenticatedUserId }),
    );
    return sendSuccess(res, result, "Device registered", 201);
  }

  static async getUserDevices(req: Request, res: Response) {
    const requestedUserId = req.params.userId;
    const authenticatedUserId = req.user!.id;

    if (requestedUserId !== authenticatedUserId) {
      throw new ForbiddenError();
    }

    const result = await runService(() => service.getUserDevices(requestedUserId));
    return sendSuccess(res, result, "Device retrieved");
  }
}
