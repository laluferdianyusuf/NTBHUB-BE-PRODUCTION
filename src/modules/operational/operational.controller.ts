import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";

import { OperationalService } from "modules/operational/operational.service";

const operationalServices = new OperationalService();

export class OperationalControllers {
  static async createOperationalHours(req: Request, res: Response) {      const { venueId } = req.params;
      const { operationalHours } = req.body;

      const result = await runService(() => operationalServices.createOperationalHours(
        venueId,
        operationalHours,
      ));

      return sendSuccess(res, result, "Operational hours saved");
    
  }

  static async getOperationalHours(req: Request, res: Response) {      const { venueId } = req.params;

      const result = await runService(() => operationalServices.getOperationalHours(venueId));

      return sendSuccess(res, result, "Operational hours retrieved");
    
  }

  static async editHours(req: Request, res: Response) {      const { venueId } = req.params;
      const { dayOfWeek, opensAt, closesAt } = req.body;

      const result = await runService(() => operationalServices.editHours({
        venueId,
        dayOfWeek,
        opensAt,
        closesAt,
      }));

      return sendSuccess(res, result, "Hours updated");
    
  }

  static async toggleDay(req: Request, res: Response) {      const { venueId } = req.params;
      const { dayOfWeek, isOpen } = req.body;

      const result = await runService(() => operationalServices.toggleDay({
        venueId,
        dayOfWeek,
        isOpen,
      }));

      return sendSuccess(res, result, "Day updated");
    
  }

  static async copyNextDay(req: Request, res: Response) {      const { venueId } = req.params;
      const { fromDay, toDay } = req.body;

      const result = await runService(() => operationalServices.copyNextDay({
        venueId,
        fromDay,
        toDay,
      }));

      return sendSuccess(res, result, "Schedule copied");
    
  }

  static async holidayClosure(req: Request, res: Response) {      const { venueId } = req.params;

      const result = await runService(() => operationalServices.holidayClosure(venueId));

      return sendSuccess(res, result, "Venue closed");
    
  }

  static async specialEventHours(req: Request, res: Response) {      const { venueId } = req.params;
      const { opensAt, closesAt } = req.body;

      const result = await runService(() => operationalServices.specialEventHours(
        venueId,
        opensAt,
        closesAt,
      ));

      return sendSuccess(res, result, "Special event hours updated");
    
  }
}
