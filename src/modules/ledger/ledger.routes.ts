import { LedgerController } from "modules/ledger/ledger.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();

router.get("/account/:accountId", auth.authenticate, asyncHandler(LedgerController.getHistory),
);

router.get("/account/:accountId/balance", auth.authenticate, asyncHandler(LedgerController.getBalances),
);

router.get("/account/:accountId/balance", auth.authenticate, asyncHandler(LedgerController.getBalances),
);

router.get("/balance", auth.authenticate, asyncHandler(LedgerController.getBalance),
);

router.get("/user-transactions", auth.authenticate, asyncHandler(LedgerController.getUserTransactions),
);

router.get("/venue-transactions/:venueId", auth.authenticate, asyncHandler(LedgerController.getVenueTransactions),
);

router.get(
  "/community-event-transactions/:communityEventId",
  auth.authenticate,
  asyncHandler(LedgerController.getCommunityEventTransactions),
);

router.get("/event-transactions/:eventId", auth.authenticate, asyncHandler(LedgerController.getEventTransactions),
);

router.get("/courier-transactions/:courierId", auth.authenticate, asyncHandler(LedgerController.getCourierTransactions),
);

// admin
router.get("/all-transactions", auth.authenticate, asyncHandler(LedgerController.getAllTransactions),
);

export default router;
