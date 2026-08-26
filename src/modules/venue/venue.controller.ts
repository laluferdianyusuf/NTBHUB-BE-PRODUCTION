import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";

import { VenueServices } from "modules/venue/venue.service";

const venueServices = new VenueServices();

export class VenueControllers {
  static async createVenue(req: Request, res: Response) {
    const files = req.files as {
      image?: Express.Multer.File[];
      gallery?: Express.Multer.File[];
    };

    const result = await runService(() =>
      venueServices.createVenue(req.body, files),
    );

    return sendSuccess(res, result, "Venues created successfully", 201);
  }

  static async getVenues(req: Request, res: Response) {
    const {
      latitude,
      longitude,
      search,
      category,
      subCategory,
      page,
      limit,
      includeServices,
    } = req.query;
    const result = await runService(() =>
      venueServices.getVenues({
        latitude: Number(latitude),
        longitude: Number(longitude),
        search: search as string,
        category: category as string,
        subCategory: subCategory as string,
        page: Number(page) || 1,
        limit: Number(limit) || 20,
        includeServices: Boolean(includeServices) || false,
      }),
    );

    return sendSuccess(res, result, "Venues retrieved successfully");
  }

  static async getOverview(req: Request, res: Response) {
    const range = String(req.query.range ?? "30d");

    const result = await runService(() => venueServices.getOverview(range));

    return sendSuccess(res, result, "report retrieved successfully");
  }

  static async getPopularVenues(req: Request, res: Response) {
    const {
      latitude,
      longitude,
      search,
      category,
      subCategory,
      page,
      limit,
      includeServices,
    } = req.query;
    const result = await runService(() =>
      venueServices.getPopularVenues({
        latitude: Number(latitude),
        longitude: Number(longitude),
        search: search as string,
        category: category as string,
        subCategory: subCategory as string,
        page: Number(page) || 1,
        limit: Number(limit) || 20,
        includeServices: Boolean(includeServices) || false,
      }),
    );

    return sendSuccess(res, result, "Venues retrieved successfully");
  }

  static async getActiveVenues(req: Request, res: Response) {
    const result = await runService(() => venueServices.getActiveVenues());

    return sendSuccess(res, result, "Venues retrieved successfully");
  }

  static async getCustomers(req: Request, res: Response) {
    const venueId = req.params.venueId;
    const search = req.query.search as string | undefined;
    const segment = req.query.segment as
      | "all"
      | "vip"
      | "returning"
      | "new"
      | "blocked"
      | undefined;

    const result = await runService(() =>
      venueServices.getCustomers(venueId, search, segment),
    );
    return sendSuccess(res, result, "Customers retrieved successfully");
  }

  static async getVenueLikedByUser(req: Request, res: Response) {
    const { userId } = req.params;

    const result = await runService(() =>
      venueServices.getVenueLikedByUser(userId),
    );

    return sendSuccess(res, result, "Venues retrieved successfully");
  }

  static async activateVenue(req: Request, res: Response) {
    const { id } = req.params;

    const result = await runService(() => venueServices.activateVenue(id));

    return sendSuccess(res, result, "Venues retrieved successfully");
  }

  static async getVenueDetail(req: Request, res: Response) {
    const id = req.params.id;
    const userId = req.user?.id;
    const result = await runService(() =>
      venueServices.getVenueById(id, String(userId)),
    );

    return sendSuccess(res, result, "Venues retrieved successfully");
  }

  static async updateVenue(req: Request, res: Response) {
    const id = req.params.id;
    const data = req.body;
    const files = req.files as {
      image?: Express.Multer.File[];
      gallery?: Express.Multer.File[];
    };
    const result = await runService(() =>
      venueServices.updateVenue(id, data, files),
    );

    return sendSuccess(res, result, "Venues updated successfully");
  }

  static async deleteVenue(req: Request, res: Response) {
    const id = req.params.id;
    const result = await runService(() => venueServices.deleteVenue(id));

    return sendSuccess(res, result, "Venues deleted successfully", 203);
  }

  static async toggleLike(req: Request, res: Response) {
    const venueId = req.params.venueId;
    const userId = req.user?.id;

    const result = await runService(() =>
      venueServices.toggleLike(venueId, String(userId)),
    );
    return sendSuccess(res, result, "You like this venue", 201);
  }

  static async getLikeCount(req: Request, res: Response) {
    const venueId = req.params.venueId;
    const userId = req.user?.id;
    const result = await runService(() =>
      venueServices.getLikeCount(venueId, String(userId)),
    );

    return sendSuccess(res, result, "Venue likes retrieved successfully");
  }

  static async createImpression(req: Request, res: Response) {
    const venueId = req.params.venueId;
    const userId = req.user?.id;
    const ipAddress = req.ip;
    const userAgent = req.headers["user-agent"];

    await runService(() =>
      venueServices.createImpression({
        venueId,
        userId,
        ipAddress,
        userAgent,
      }),
    );

    return sendSuccess(res, "Venue visited");
  }

  static async getImpressionCount(req: Request, res: Response) {
    const venueId = req.params.venueId;

    const result = await runService(() =>
      venueServices.getImpressionCount(venueId),
    );

    return sendSuccess(res, result, "Venue impression retrieved successfully");
  }
}
