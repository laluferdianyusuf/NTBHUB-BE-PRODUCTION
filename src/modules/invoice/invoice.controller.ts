import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { InvoiceService } from "./invoice.service";

const invoiceService = new InvoiceService();

export class InvoiceController {
  static async findAllInvoice(_req: Request, res: Response) {
    const result = await runService(() => invoiceService.findAllInvoice());
    return sendSuccess(res, result, "All invoices retrieved");
  }
}
