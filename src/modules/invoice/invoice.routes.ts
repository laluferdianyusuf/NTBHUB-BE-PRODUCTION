import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";
import { InvoiceController } from "./invoice.controller";

const router = Router();

router.get(
  "/invoice/invoices",
  auth.authenticate,
  asyncHandler(InvoiceController.findAllInvoice),
);

export default router;
