import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { EventController } from "./event.controller";
import { EventOrderController } from "modules/event-order/event-order.controller";
import { EventTicketController } from "modules/event-ticket/event-ticket.controller";
import { EventTicketTypeController } from "modules/event-ticket-type/event-ticket-type.controller";
import { auth } from "shared/middleware/auth";

import { upload } from "middlewares/upload";

const router = Router();
const eventController = new EventController();
const eventTicketController = new EventTicketController();
const eventTicketTypeController = new EventTicketTypeController();

// PUBLIC
router.get("/list-events", auth.authenticate, asyncHandler(EventController.listEvent),
);
router.get("/list-merged-events", auth.authenticate, asyncHandler(EventController.listMergedEvent),
);
router.get("/detail-event/:id", auth.authenticate, asyncHandler(EventController.detailEvent),
);
router.get("/event/dashboard/:eventId", auth.authenticate, asyncHandler(EventController.getEventDashboard),
);

// ADMIN
router.post(
  "/create-event",
  auth.authenticate,
  upload.single("image"),
  asyncHandler(EventController.create),
);

router.get("/events-with-details", auth.authenticate, asyncHandler(EventController.getAllEventsWithDetails),
);

router.put("/update/:id/status", auth.authenticate, asyncHandler(EventController.updateStatusEvent),
);

router.delete("/remove/:id", auth.authenticate, asyncHandler(EventController.removeEvent),
);

// event scan qr code
router.post(
  "/scan-qrCode",
  auth.authenticate,
  auth.authorizeGlobalRole(["VENUE_OWNER", "EVENT_OWNER", "ADMIN"]),
  asyncHandler(EventOrderController.scanQrCode),
);

// event ticket DETAIL
router.get(
  "/detail-ticket/:id",
  auth.authenticate,
  auth.authorizeGlobalRole(["VENUE_OWNER", "EVENT_OWNER", "ADMIN", "CUSTOMER"]),
  asyncHandler(EventTicketController.getTicketById),
);

router.get(
  "/tickets-user/:userId",
  auth.authenticate,
  auth.authorizeGlobalRole(["VENUE_OWNER", "EVENT_OWNER", "ADMIN", "CUSTOMER"]),
  asyncHandler(EventTicketController.getTicketByUserId),
);

router.get(
  "/orders-tickets/:orderId",
  auth.authenticate,
  auth.authorizeGlobalRole(["VENUE_OWNER", "EVENT_OWNER", "ADMIN", "CUSTOMER"]),
  asyncHandler(EventTicketController.getTicketByOrderId),
);

// event ticket type
router.post("/ticket/type/create", auth.authenticate, asyncHandler(EventTicketTypeController.create),
);

router.put("/ticket/type/update/:id", auth.authenticate, asyncHandler(EventTicketTypeController.update),
);

router.delete("/ticket/type/delete/:id", auth.authenticate, asyncHandler(EventTicketTypeController.delete),
);

router.get("/ticket/type/event/:eventId", asyncHandler(EventTicketTypeController.getByEvent),
);

// event order
// router.post(
//   "/order/checkout-ticket",
//   auth.authenticate,
//   auth.authorizeGlobalRole(["CUSTOMER"]),
//   asyncHandler(EventOrderController.checkout),
// );

// router.post("/order/ticket-payment/webhook", auth.authenticate, (req, res) =>
//   eventOrderController.paymentWebhook(req, res),
// );

router.post("/order/checkout-pay", auth.authenticate, asyncHandler(EventOrderController.checkoutAndPay),
);

router.get(
  "/detail-order/:id",
  auth.authenticate,
  auth.authorizeGlobalRole(["CUSTOMER"]),
  asyncHandler(EventOrderController.getDetail),
);

router.get(
  "/orders",
  auth.authenticate,
  auth.authorizeGlobalRole(["CUSTOMER"]),
  asyncHandler(EventOrderController.getUsersOrder),
);

router.get("/orders/by-events/:eventId", auth.authenticate, asyncHandler(EventOrderController.getEventsOrder),
);

export default router;
