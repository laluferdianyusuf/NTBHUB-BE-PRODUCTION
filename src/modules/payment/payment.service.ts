import { midtrans } from "config/midtrans.config";
import { prisma } from "config/prisma";
import crypto from "crypto";
import { enqueuePaymentWebhook } from "queue/paymentQueue";
import { enqueueTransactionExpiry } from "queue/transactionQueue";
import { ForbiddenError, NotFoundError } from "shared/errors";
import { InvoiceRepository } from "modules/invoice/invoice.repository";
import { PaymentRepository } from "modules/payment/payment.repository";
import { UserRepository } from "modules/users/users.repository";
import { BookingRepository } from "modules/booking/booking.repository";
import { OrderRepository } from "modules/order/order.repository";
import { DuitkuService } from "./duitku.service";

const userRepository = new UserRepository();
const paymentRepository = new PaymentRepository();
const invoiceRepository = new InvoiceRepository();
const bookingRepository = new BookingRepository();
const orderRepository = new OrderRepository();
const duitkuService = new DuitkuService();

export class PaymentServices {
  private async verifyPaymentOwnership(
    payment: NonNullable<Awaited<ReturnType<PaymentRepository["findById"]>>>,
    userId: string,
  ) {
    const { invoice } = payment;

    switch (invoice.entityType) {
      case "TOPUP":
        return invoice.entityId === userId;

      case "BOOKING": {
        const booking = await bookingRepository.findBookingById(
          invoice.entityId,
        );
        return booking?.userId === userId;
      }

      case "ORDER": {
        const order = await orderRepository.findById(invoice.entityId);
        return order?.userId === userId;
      }

      default:
        return false;
    }
  }

  async getAvailablePaymentMethods(amount: number) {
    if (amount < 10000) {
      throw new Error("Minimum payment amount is Rp10.000");
    }

    const methods = await duitkuService.getPaymentMethods(amount);

    const allowedMethods = methods.filter((method) => {
      const vaMethods = ["BC", "M2", "I1", "B1", "BT", "BR", "BV", "VA"];

      const qrisMethods = ["SP", "GQ", "SQ", "NQ"];

      return (
        vaMethods.includes(method.paymentMethod) ||
        qrisMethods.includes(method.paymentMethod)
      );
    });

    return allowedMethods.map((method) => ({
      code: method.paymentMethod,

      name: method.paymentName,

      image: method.paymentImage,

      fee: Number(method.totalFee),

      type: ["SP", "GQ", "SQ", "NQ"].includes(method.paymentMethod)
        ? "QRIS"
        : "VA",
    }));
  }

  async createTopUpPaymentDuitku(data: {
    userId: string;

    amount: number;

    paymentMethod: string;
  }) {
    const user = await userRepository.findById(data.userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const methods = await duitkuService.getPaymentMethods(data.amount);

    const selectedMethod = methods.find(
      (method) => method.paymentMethod === data.paymentMethod,
    );

    if (!selectedMethod) {
      throw new Error("Payment method is not available");
    }

    const paymentFee = Number(selectedMethod.totalFee);
    const qrisFee = Math.ceil((data.amount / (1 + 0.007)) * 0.007);

    const topUpId = `TOPUP-${crypto.randomUUID().slice(0, 12).toUpperCase()}`;

    const qrisMethods = ["SP", "GQ", "SQ", "NQ"];

    const isQris = qrisMethods.includes(data.paymentMethod);

    const grossAmount = isQris ? data.amount + qrisFee : data.amount + 4440;

    const expiryMinutes = isQris ? 10 : 60;

    const expiredAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

    const duitkuTransaction = await duitkuService.createTransaction({
      merchantOrderId: topUpId,

      paymentAmount: grossAmount,

      paymentMethod: data.paymentMethod,

      productDetails: `Top Up NTB Hub`,

      customerVaName: user.name.slice(0, 20),

      email: user.email,

      phoneNumber: user.phone,

      expiryPeriod: expiryMinutes,
    });

    return prisma.$transaction(async (tx) => {
      const invoice = await invoiceRepository.create(
        {
          entityType: "TOPUP",

          entityId: data.userId,

          amount: Number(duitkuTransaction.amount),

          invoiceNumber: topUpId,

          expiredAt,
        },
        tx,
      );

      const payment = await paymentRepository.create(
        {
          invoiceId: invoice.id,

          amount: Number(duitkuTransaction.amount),

          method: isQris ? "QRIS" : "VA",

          provider: "DUITKU",

          providerRef: duitkuTransaction.reference,

          vaNumber: duitkuTransaction.vaNumber ?? null,

          qrisUrl: duitkuTransaction.qrString ?? null,

          expiredAt,
        },
        tx,
      );

      await enqueueTransactionExpiry(payment.id, payment.expiredAt as Date);

      return {
        paymentId: payment.id,

        invoiceId: invoice.id,

        reference: duitkuTransaction.reference,

        amount: data.amount,

        paymentFee,

        grossAmount: Number(duitkuTransaction.amount),

        method: selectedMethod.paymentName,

        paymentType: isQris ? "QRIS" : "VA",

        vaNumber: duitkuTransaction.vaNumber ?? null,

        qrString: duitkuTransaction.qrString ?? null,

        paymentUrl: duitkuTransaction.paymentUrl ?? null,

        expiredAt: invoice.expiredAt,
      };
    });
  }

  async duitkuCallback(payload: any) {
    const apiKey = process.env.DUITKU_API_KEY!;

    const stringToSign = `${payload.merchantCode}${payload.amount}${payload.merchantOrderId}${apiKey}`;

    const signature = crypto
      .createHash("md5")
      .update(stringToSign)
      .digest("hex");

    if (signature.toLowerCase() !== payload.signature?.toLowerCase()) {
      console.error("[Duitku Callback Error] Invalid signature", {
        expected: signature,
        received: payload.signature,
        stringToSign,
      });
      throw new Error("Invalid Duitku signature");
    }

    await enqueuePaymentWebhook({
      provider: "DUITKU",
      merchantCode: payload.merchantCode,
      amount: payload.amount,
      merchantOrderId: payload.merchantOrderId,
      paymentCode: payload.paymentCode,
      resultCode: payload.resultCode,
      reference: payload.reference,
      signature: payload.signature,
    });

    return {
      message: "Webhook received",
    };
  }

  async TopUp(data: { userId: string; amount: number; bankCode: string }) {
    const user = await userRepository.findById(data.userId);
    if (!user) {
      throw new Error("User not found");
    }

    const adminFee = 4440;
    const grossAmount = data.amount + adminFee;

    const topUpId = `TOPUP-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const expiredAt = new Date(Date.now() + 5 * 60 * 1000);

    return prisma.$transaction(async (tx) => {
      const parameter = {
        payment_type: "bank_transfer",
        transaction_details: {
          order_id: topUpId,
          gross_amount: grossAmount,
        },
        bank_transfer: {
          bank: data.bankCode.toLowerCase(),
        },
        custom_expiry: {
          expiry_duration: 5,
          unit: "minute",
        },
        customer_details: {
          first_name: user.name,
          email: user.email,
        },
      };

      const charge = await midtrans.charge(parameter);
      const vaNumber =
        charge.va_numbers?.[0]?.va_number ||
        charge.permata_va_number ||
        charge.bill_key ||
        null;

      if (!vaNumber) {
        throw new Error("Failed to generate VA");
      }

      const invoice = await invoiceRepository.create(
        {
          entityType: "TOPUP",
          entityId: data.userId,
          amount: Number(grossAmount),
          invoiceNumber: topUpId,
          expiredAt: expiredAt,
        },
        tx,
      );

      const payment = await paymentRepository.create(
        {
          invoiceId: invoice.id,
          amount: grossAmount,
          method: "VA",
          provider: "MIDTRANS",
          providerRef: invoice.invoiceNumber,
          vaNumber: vaNumber,
          bankCode: data.bankCode,
          expiredAt: expiredAt,
        },
        tx,
      );

      await enqueueTransactionExpiry(payment.id, payment.expiredAt as Date);

      return {
        paymentId: payment.id,
        invoiceId: invoice.id,
        amount: data.amount,
        grossAmount,
        vaNumber: vaNumber,
        bankCode: data.bankCode,
        expiredAt: invoice.expiredAt,
      };
    });
  }

  async TopUpQris(data: { userId: string; amount: number }) {
    const user = await userRepository.findById(data.userId);
    if (!user) {
      throw new Error("User not found");
    }

    const fee = Math.ceil(data.amount * 0.007);
    const grossAmount = data.amount + fee;

    const topUpId = `TOPUP-QRIS-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const expiredAt = new Date(Date.now() + 5 * 60 * 1000);

    return prisma.$transaction(async (tx) => {
      const parameter = {
        payment_type: "qris",
        transaction_details: {
          order_id: topUpId,
          gross_amount: grossAmount,
        },
        qris: {
          acquirer: "gopay",
        },
        customer_details: {
          first_name: user.name,
          email: user.email,
        },
        custom_expiry: {
          expiry_duration: 5,
          unit: "minute",
        },
      };
      const charge = await midtrans.charge(parameter);
      const qrUrl =
        charge.actions?.find((a: any) => a.name === "generate-qr-code")?.url ||
        null;

      if (!qrUrl) {
        throw new Error("Failed to generate QRIS");
      }

      const invoice = await invoiceRepository.create(
        {
          entityType: "TOPUP",
          entityId: data.userId,
          amount: Number(grossAmount),
          invoiceNumber: topUpId,
          expiredAt: expiredAt,
        },
        tx,
      );

      const payment = await paymentRepository.create(
        {
          invoiceId: invoice.id,
          amount: grossAmount,
          method: "QRIS",
          provider: "MIDTRANS",
          providerRef: invoice.invoiceNumber,
          qrisUrl: qrUrl,
          expiredAt: expiredAt,
        },
        tx,
      );

      await enqueueTransactionExpiry(payment.id, payment.expiredAt as Date);

      return {
        paymentId: payment.id,
        invoiceId: invoice.id,
        amount: data.amount,
        grossAmount,
        qrisUrl: qrUrl,
        expiredAt: invoice.expiredAt,
      };
    });
  }

  async midtransCallback(payload: any) {
    const serverKey = process.env.MIDTRANS_SERVER_KEY!;
    const grossAmount = payload.gross_amount;

    const hash = crypto
      .createHash("sha512")
      .update(payload.order_id + payload.status_code + grossAmount + serverKey)
      .digest("hex");

    if (hash !== payload.signature_key) {
      throw new Error("Invalid signature");
    }

    await enqueuePaymentWebhook(payload);

    return {
      message: "Webhook received",
    };
  }

  async getPaymentStatus(paymentId: string, userId: string) {
    const payment = await paymentRepository.findById(paymentId);
    if (!payment) throw new NotFoundError("Payment not found");

    const owned = await this.verifyPaymentOwnership(payment, userId);
    if (!owned) throw new ForbiddenError();

    return {
      paymentId: payment.id,
      invoiceId: payment.invoiceId,
      status: payment.status,
      amount: Number(payment.amount),
      method: payment.method,
      provider: payment.provider,
      entityType: payment.invoice.entityType,
      entityId: payment.invoice.entityId,
      expiredAt: payment.expiredAt,
      vaNumber: payment.vaNumber,
      qrisUrl: payment.qrisUrl,
    };
  }

  async verifyPaymentStreamAccess(paymentId: string, userId: string) {
    const payment = await paymentRepository.findById(paymentId);
    if (!payment) throw new NotFoundError("Payment not found");

    const owned = await this.verifyPaymentOwnership(payment, userId);
    if (!owned) throw new ForbiddenError();

    return payment;
  }

  async findAllPaymentsByUserId(
    id: string,
    cursor?: string,
    limit: number = 20,
  ) {
    const payments = await paymentRepository.findByUserId(id, cursor, limit);
    const nextCursor =
      payments.length === limit ? payments[payments.length - 1].id : null;

    return {
      data: payments,
      nextCursor,
    };
  }
}
