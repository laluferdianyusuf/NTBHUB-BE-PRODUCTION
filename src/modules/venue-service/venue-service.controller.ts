import { BookingType, UnitType } from "@prisma/client";
import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { VenueServiceService } from "modules/venue-service/venue-service.service";

const venueServiceService = new VenueServiceService();

export class VenueServiceController {
  static async createVenueService(req: Request, res: Response) {      const { venueId, subCategoryId, bookingType, unitType, config } =
        req.body;

      const file = req.file;

      const data = await runService(() => venueServiceService.create(
        {
          venueId,
          subCategoryId,
          bookingType,
          unitType,
          config,
        },
        file,
      ));

      return res.status(201).json({
        status: true,
        message: "Venue service created successfully",
        data,
      });
  }

  static async updateVenueService(req: Request, res: Response) {      const { id } = req.params;
      const { bookingType, unitType, config, isActive } = req.body;

      const file = req.file;

      const data = await runService(() => venueServiceService.update(
        id,
        {
          bookingType,
          unitType,
          config,
          isActive,
        },
        file,
      ));

      return res.status(200).json({
        status: true,
        message: "Venue service updated successfully",
        data,
      });
  }

  static async getServiceByVenue(req: Request, res: Response) {      const { venueId } = req.params;

      const data = await runService(() => venueServiceService.getByVenue(venueId));

      return res.status(200).json({
        status: true,
        message: "Venue services retrieved successfully",
        data,
      });
  }

  static async getAllServiceByVenue(req: Request, res: Response) {      const { venueId } = req.params;

      const query = {
        search: req.query.search as string,
        isActive:
          req.query.isActive !== undefined
            ? req.query.isActive === "true"
            : undefined,
        bookingType: req.query.bookingType as BookingType,
        unitType: req.query.unitType as UnitType,
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 20,
      };

      const data = await runService(() => venueServiceService.getAllServiceByVenue(
        venueId,
        query,
      ));

      return res.status(200).json({
        status: true,
        message: "All venue services retrieved successfully",
        data,
      });
  }

  static async getDetailService(req: Request, res: Response) {      const { id } = req.params;

      const data = await runService(() => venueServiceService.getDetail(id));

      return res.status(200).json({
        status: true,
        message: "Venue service detail retrieved successfully",
        data,
      });
  }

  static async toggleStatus(req: Request, res: Response) {      const { id } = req.params;

      const data = await runService(() => venueServiceService.toggleStatus(id));

      return res.status(200).json({
        status: true,
        message: `Service ${
          data.isActive ? "activated" : "deactivated"
        } successfully`,
        data,
      });
  }

  static async deactivateVenueService(req: Request, res: Response) {      const { id } = req.params;

      await runService(() => venueServiceService.deactivate(id));

      return res.status(200).json({
        status: true,
        message: "Venue service deactivated successfully",
      });
  }

  static async deleteVenueService(req: Request, res: Response) {      const { id } = req.params;

      await runService(() => venueServiceService.delete(id));

      return res.status(200).json({
        status: true,
        message: "Venue service deleted successfully",
      });
  }

  static async getSummary(req: Request, res: Response) {      const { venueId } = req.params;

      const data = await runService(() => venueServiceService.getSummary(venueId));

      return res.status(200).json({
        status: true,
        message: "Summary retrieved successfully",
        data,
      });
  }
}
