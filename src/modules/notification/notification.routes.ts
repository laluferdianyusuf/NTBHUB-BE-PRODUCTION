import { NotificationController } from "modules/notification/notification.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";




const router = Router();

router.post(
  "/notification/user",
  auth.authenticate,
  auth.authorizeGlobalRole(["ADMIN"]),
  asyncHandler(NotificationController.createNotification),
);

router.get("/notification", auth.authenticate, asyncHandler(NotificationController.getNotification),
);

router.get("/by-recipient/:recipientId", auth.authenticate, asyncHandler(NotificationController.getNotificationByRecipient),
);

router.get("/notification/venue/:venueId", auth.authenticate, asyncHandler(NotificationController.getNotificationByVenue),
);
router.put("/read/:recipientId", auth.authenticate, asyncHandler(NotificationController.markAllAsRead),
);

router.put("/unread/:recipientId", auth.authenticate, asyncHandler(NotificationController.markAllAsUnread),
);

export default router;
