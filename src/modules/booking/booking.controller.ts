import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { BookingService } from "./booking.service";

const bookingService = new BookingService();

export class BookingController {
  static async createBooking(req: Request, res: Response) {
    const result = await runService(() =>
      bookingService.createBooking(req.body),
    );
    return sendSuccess(res, result, "Booking created successfully", 201);
  }

  static async getAllBookings(_req: Request, res: Response) {
    const result = await runService(() => bookingService.getAllBookings());
    return sendSuccess(res, result, "booking retrieved successfully");
  }

  static async getBookingById(req: Request, res: Response) {
    const result = await runService(() =>
      bookingService.getBookingById(req.params.id),
    );
    return sendSuccess(res, result, "booking retrieved successfully");
  }

  static async getBookingByUserId(req: Request, res: Response) {
    const { search, status } = req.query;
    const result = await runService(() =>
      bookingService.getBookingByUserId({
        userId: req.params.userId,
        search: search as string,
        status: status as string,
      }),
    );
    return sendSuccess(res, result, "Booking retrieved successfully");
  }

  static async getBookingByVenueId(req: Request, res: Response) {
    const tab =
      typeof req.query.tab === "string" ? req.query.tab : "all_book";
    const search =
      typeof req.query.search === "string" ? req.query.search : "";
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);

    const result = await runService(() =>
      bookingService.getBookingByVenueId(
        req.params.venueId,
        tab,
        search,
        page,
        limit,
      ),
    );
    return sendSuccess(res, result, "Booking retrieved successfully");
  }

  static async getVenueDashboard(req: Request, res: Response) {
    const result = await runService(() =>
      bookingService.getVenueDashboard(req.params.venueId),
    );
    return sendSuccess(res, result, "Booking retrieved successfully");
  }

  static async getVenueWithDetails(_req: Request, res: Response) {
    const result = await runService(() => bookingService.getVenueWithDetails());
    return sendSuccess(res, result, "Booking retrieved successfully");
  }

  static async getBookingPaidByUserId(req: Request, res: Response) {
    const result = await runService(() =>
      bookingService.getBookingPaidByUserId(req.params.userId),
    );
    return sendSuccess(res, result, "Booking retrieved successfully");
  }

  static async getBookingCompleteByUserId(req: Request, res: Response) {
    const result = await runService(() =>
      bookingService.getBookingCompleteByUserId(req.params.userId),
    );
    return sendSuccess(res, result, "Booking retrieved successfully");
  }

  static async getBookingPendingByUserId(req: Request, res: Response) {
    const result = await runService(() =>
      bookingService.getBookingPendingByUserId(req.params.userId),
    );
    return sendSuccess(res, result, "Booking retrieved successfully");
  }

  static async processBookingPayment(req: Request, res: Response) {
    const userId = req.user?.id as string;
    const result = await runService(() =>
      bookingService.payBooking(req.params.id, userId, req.body.pin),
    );
    return sendSuccess(res, result, "booking retrieved successfully", 201);
  }

  static async cancelBooking(req: Request, res: Response) {
    const result = await runService(() =>
      bookingService.cancelBooking(req.params.id),
    );
    return sendSuccess(res, result, "booking retrieved successfully", 201);
  }

  static async completeBooking(req: Request, res: Response) {
    const result = await runService(() =>
      bookingService.completeBooking(req.params.id),
    );
    return sendSuccess(res, result, "booking retrieved successfully", 201);
  }

  static async getExistingBooking(req: Request, res: Response) {
    const { serviceId, unitId, startTime, endTime } = req.query;
    const result = await runService(() =>
      bookingService.getExistingBooking(
        String(serviceId),
        String(unitId),
        new Date(String(startTime)),
        new Date(String(endTime)),
      ),
    );
    return sendSuccess(res, result, "booking retrieved successfully", 201);
  }
}
