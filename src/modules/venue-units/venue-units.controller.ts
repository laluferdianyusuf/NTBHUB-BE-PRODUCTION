import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { VenueUnitService } from "modules/venue-units/venue-units.service";

const venueUnitServices = new VenueUnitService();

export class VenueUnitControllers {
  static async createVenueUnit(req: Request, res: Response) {
      const { venueId, serviceId, floorId, name, price, type, isActive } =
        req.body;

      if (!venueId || !serviceId || !name || !price || !type) {
        return res.status(400).json({
          status: false,
          message: "venueId, serviceId, name, price, type are required",
        });
      }

      const result = await runService(() => venueUnitServices.create({
        venueId,
        serviceId,
        floorId,
        name,
        price: Number(price),
        type,
        isActive,
      }));

      return sendSuccess(res, result, "Venue unit created successfully", 201);
  }

  static async bulkCreateVenueUnit(req: Request, res: Response) {
      const { venueId, serviceId, type, units } = req.body;

      const result = await runService(() => venueUnitServices.bulkCreate({
        venueId,
        serviceId,
        type,
        units,
      }));

      return sendSuccess(res, result, "Bulk units created successfully", 201);
  }

  static async getUnitByService(req: Request, res: Response) {
      const { serviceId } = req.params;

      const result = await runService(() => venueUnitServices.getByService(serviceId));

      return res.status(200).json({
        status: true,
        message: "Units retrieved successfully",
        data: result,
      });
  }

  static async getUnitByVenue(req: Request, res: Response) {
      const { venueId } = req.params;

      const result = await runService(() => venueUnitServices.getByVenue(venueId));

      return res.status(200).json({
        status: true,
        message: "Venue units retrieved successfully",
        data: result,
      });
  }

  static async getAllUnits(req: Request, res: Response) {
      const { venueId } = req.params;

      const { search, serviceId, floorId, isActive, page, limit } = req.query;

      const result = await runService(() => venueUnitServices.getAll(venueId, {
        search: search as string,
        serviceId: serviceId as string,
        floorId: floorId as string,
        isActive: isActive !== undefined ? isActive === "true" : undefined,
        page: Number(page || 1),
        limit: Number(limit || 20),
      }));

      return res.status(200).json({
        status: true,
        message: "Units list retrieved successfully",
        ...result,
      });
  }

  static async getDetailUnit(req: Request, res: Response) {
      const { id } = req.params;

      const result = await runService(() => venueUnitServices.getDetail(id));

      return res.status(200).json({
        status: true,
        message: "Unit detail retrieved successfully",
        data: result,
      });
  }

  static async getSummary(req: Request, res: Response) {
      const { serviceId } = req.params;

      const result = await runService(() => venueUnitServices.getSummary(serviceId));

      return res.status(200).json({
        status: true,
        message: "Summary retrieved successfully",
        data: result,
      });
  }

  static async getAvailabilityUnits(req: Request, res: Response) {
      const { venueId } = req.params;
      const { serviceId, date } = req.query;

      const result = await runService(() => venueUnitServices.getAvailabilityUnits(
        venueId,
        serviceId as string,
        date as string,
      ));

      return res.status(200).json({
        status: true,
        message: "Availability retrieved successfully",
        data: result,
      });
  }

  static async updateVenueUnit(req: Request, res: Response) {
      const { id } = req.params;
      const { name, price, type, floorId, isActive } = req.body;

      const result = await runService(() => venueUnitServices.update(id, {
        name,
        price: price ? Number(price) : undefined,
        type,
        floorId,
        isActive,
      }));

      return res.status(200).json({
        status: true,
        message: "Venue unit updated successfully",
        data: result,
      });
  }

  static async toggleStatus(req: Request, res: Response) {
      const { id } = req.params;

      const result = await runService(() => venueUnitServices.toggleStatus(id));

      return res.status(200).json({
        status: true,
        message: "Unit status updated successfully",
        data: result,
      });
  }

  static async deactivateVenueUnit(req: Request, res: Response) {
      const { id } = req.params;

      await runService(() => venueUnitServices.deactivate(id));

      return res.status(200).json({
        status: true,
        message: "Venue unit deleted successfully",
      });
  }
}
