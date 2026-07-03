import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { CommunityEventController } from "./community-event.controller";
import { CommunityEventTicketController } from "modules/community-event-ticket/community-event-ticket.controller";
import { CommunityEventTicketTypeController } from "modules/community-event-ticket-type/community-event-ticket-type.controller";
import { CommunityEventOrderController } from "modules/community-event-order/community-event-order.controller";
import { auth } from "shared/middleware/auth";

import { upload } from "middlewares/upload";

const router = Router();
const eventController = new CommunityEventController();
const eventTicketController = new CommunityEventTicketController();
const eventTicketTypeController = new CommunityEventTicketTypeController();

router.get("/list/:communityId", auth.authenticate, asyncHandler(CommunityEventController.listByCommunity),
);

router.post(
  "/create-event/:communityId",
  auth.authenticate,
  upload.single("image"),
  asyncHandler(CommunityEventController.create),
);

router.post("/create-collaboration", auth.authenticate, asyncHandler(CommunityEventController.addCollaboration),
);

router.get("/detail/:eventId", auth.authenticate, asyncHandler(CommunityEventController.detail),
);

router.get("/event/dashboard/:eventId", auth.authenticate, asyncHandler(CommunityEventController.getCommunityEventDashboard),
);

// event scan qr code
router.post("/scan-community-qrCode", auth.authenticate, asyncHandler(CommunityEventOrderController.scanQrCode),
);

// event ticket DETAIL
router.get(
  "/detail-ticket/:id",
  auth.authenticate,

  asyncHandler(CommunityEventTicketController.getTicketById),
);

router.get(
  "/tickets-user/:userId",
  auth.authenticate,

  asyncHandler(CommunityEventTicketController.getTicketByUserId),
);

router.get(
  "/orders-tickets/:orderId",
  auth.authenticate,

  asyncHandler(CommunityEventTicketController.getTicketByOrderId),
);

// event ticket type
router.post(
  "/ticket/type/create/:communityEventId",
  auth.authenticate,
  asyncHandler(CommunityEventTicketTypeController.createTicketType),
);

router.get("/ticket/type/event/:communityEventId", asyncHandler(CommunityEventTicketTypeController.findAllTicketTypes),
);

// event order
// router.post("/order/checkout-ticket", auth.authenticate, (req, res) =>
//   eventOrderController.createOrder(req, res),
// );

// router.post("/order/ticket-payment/webhook", auth.authenticate, (req, res) =>
//   eventOrderController.handlePaymentSuccess(req, res),
// );

router.post("/order/checkout-pay", auth.authenticate, asyncHandler(CommunityEventOrderController.checkoutAndPay),
);

router.get("/detail-order/:id", auth.authenticate, asyncHandler(CommunityEventOrderController.getDetail),
);

router.get("/orders", auth.authenticate, asyncHandler(CommunityEventOrderController.getEventOrders),
);

router.post("/scan-qrCode", auth.authenticate, asyncHandler(CommunityEventOrderController.scanQrCode),
);

export default router;
