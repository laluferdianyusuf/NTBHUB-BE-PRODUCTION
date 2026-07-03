import { CommunityEventOrderController } from "modules/community-event-order/community-event-order.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();


router.get("/orders", auth.authenticate, asyncHandler(CommunityEventOrderController.getEventOrders),
);

export default router;
