import { NotificationRecipientType } from "@prisma/client";
import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { NotificationService } from "./notification.service";

const notificationService = new NotificationService();

export class NotificationController {
  static async createNotification(req: Request, res: Response) {
    const result = await runService(() =>
      notificationService.sendNotification(req.body, req.file),
    );
    return sendSuccess(res, result, "Notification Created", 201);
  }

  static async getNotificationByRecipient(req: Request, res: Response) {
    const { recipientId } = req.params;
    const { recipientType } = req.query;
    const result = await runService(() =>
      notificationService.getNotificationByRecipient(
        recipientType as NotificationRecipientType,
        recipientId,
      ),
    );
    return sendSuccess(res, result, "Notification Retrieved");
  }

  static async getNotification(req: Request, res: Response) {
    const userId = req.user?.id as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const result = await runService(() =>
      notificationService.getUserNotifications(userId, page, limit),
    );
    return sendSuccess(res, result, "Notification Retrieved");
  }

  static async markAllAsRead(req: Request, res: Response) {
    const { recipientId } = req.params;
    const { recipientType } = req.query;
    const result = await runService(() =>
      notificationService.markAllAsRead(
        recipientId,
        recipientType as NotificationRecipientType,
      ),
    );
    return sendSuccess(res, result, "Notification marked as read");
  }

  static async markAllAsUnread(req: Request, res: Response) {
    const { recipientId } = req.params;
    const { recipientType } = req.query;
    const result = await runService(() =>
      notificationService.markAllAsUnread(
        recipientType as NotificationRecipientType,
        recipientId,
      ),
    );
    return sendSuccess(res, result, "Notification marked as unread");
  }

  static async getNotificationByVenue(req: Request, res: Response) {
    const venueId = req.params.venueId;
    const result = await runService(() =>
      notificationService.getNotificationByVenue(venueId),
    );
    return sendSuccess(res, result, "Notification Retrieved");
  }
}
