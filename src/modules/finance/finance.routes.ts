import { FinanceController } from "modules/finance/finance.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();


router.get("/owner/dashboard/:venueId", auth.authenticate, asyncHandler(FinanceController.dashboard),
);

router.get("/owner/summary/:venueId", auth.authenticate, asyncHandler(FinanceController.summary),
);

router.get("/owner/transactions/:venueId", auth.authenticate, asyncHandler(FinanceController.transactions),
);

router.get("/owner/withdrawals/:venueId", auth.authenticate, asyncHandler(FinanceController.withdrawals),
);

export default router;
