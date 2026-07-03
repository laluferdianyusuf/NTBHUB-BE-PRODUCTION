import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { LocationService } from "./location.service";

const locationService = new LocationService();

export class LocationController {
  static async trackLocation(req: Request, res: Response) {
    const { latitude, longitude } = req.body;
    const userId = req.user!.id;
    const location = await runService(() =>
      locationService.trackLocation(userId, latitude, longitude),
    );
    return sendSuccess(res, location, "Location tracked successfully", 201);
  }
}
