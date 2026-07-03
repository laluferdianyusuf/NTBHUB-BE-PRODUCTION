import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { VenueBalanceServices } from "./venue-balance.service";

const venueBalanceServices = new VenueBalanceServices();

export class VenueBalanceController {
  static async getVenueBalance(req: Request, res: Response) {
    const venueId = req.params.venueId;
    const result = await runService(() =>
      venueBalanceServices.getVenueBalance(venueId),
    );
    return sendSuccess(res, result, "Balance retrieved");
  }
}
