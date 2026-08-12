import { EventTicketTypeController } from "modules/event-ticket-type/event-ticket-type.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";

const router = Router();

const eventOwnerRoles = ["EVENT_OWNER", "VENUE_OWNER", "ADMIN"] as const;

router.post(
  "/create-ticket",
  auth.authenticate,
  auth.authorizeEventRole([...eventOwnerRoles]),
  asyncHandler(EventTicketTypeController.create),
);

router.get(
  "/event-ticket/:eventId",
  auth.authenticate,
  asyncHandler(EventTicketTypeController.getByEvent),
);

router.get(
  "/event-tickets/:eventId",
  auth.authenticate,
  asyncHandler(EventTicketTypeController.getAll),
);

router.put(
  "/update-ticket/:id",
  auth.authenticate,
  auth.authorizeEventRoleFromTicketType([...eventOwnerRoles]),
  asyncHandler(EventTicketTypeController.update),
);

router.delete(
  "/delete-ticket/:id",
  auth.authenticate,
  auth.authorizeEventRoleFromTicketType([...eventOwnerRoles]),
  asyncHandler(EventTicketTypeController.delete),
);

export default router;
