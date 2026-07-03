import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";

import { VenueStaffService } from "modules/venue-staff/venue-staff.service";

const service = new VenueStaffService();

export class VenueStaffController {
  static async create(req: Request, res: Response) {      const { venueId } = req.params;

      const result = await runService(() => service.createStaff(
        venueId,
        req.body,
        req.file as Express.Multer.File,
      ));

      return sendSuccess(res, result, "Staff created", 201);
    
  }

  static async update(req: Request, res: Response) {      const { staffId } = req.params;

      const result = await runService(() => service.updateStaff(
        staffId,
        req.body,
        req.file as Express.Multer.File,
      ));
      return sendSuccess(res, result, "Staff updated");
    
  }

  static async delete(req: Request, res: Response) {      const { staffId } = req.params;

      await runService(() => service.deleteStaff(staffId));
      return sendSuccess(res, "Staff updated");
    
  }

  static async detail(req: Request, res: Response) {      const { staffId } = req.params;

      const result = await runService(() => service.detailStaff(staffId));
      return sendSuccess(res, result);
    
  }

  static async list(req: Request, res: Response) {      const venueId = req.query.venueId?.toString() || "";

      const page = Number(req.query.page || 1);

      const limit = Number(req.query.limit || 10);

      const search = req.query.search?.toString();
      console.log(venueId);

      const result = await runService(() => service.listStaff(venueId, page, limit, search));
      return sendSuccess(res, result);
    
  }
}
