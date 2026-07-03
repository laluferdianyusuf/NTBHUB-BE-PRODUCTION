import { AccountController } from "modules/account/account.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();

router.post("/ensure", auth.authenticate, asyncHandler(AccountController.ensureAccount),
);

router.get("/:type/:id", asyncHandler(AccountController.getAccountByType));

export default router;
