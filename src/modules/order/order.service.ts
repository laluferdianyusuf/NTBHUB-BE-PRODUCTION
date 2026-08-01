import { Prisma } from "@prisma/client";
import { prisma } from "config/prisma";
import { publishPaymentEvent } from "helpers/paymentEvents";

import { dispatchAssignDelivery } from "queue/dispatch";
import { DeliveryRepository } from "modules/courier/delivery.repository";
import { InvoiceRepository } from "modules/invoice/invoice.repository";
import { LedgerRepository } from "modules/ledger/ledger.repository";
import { MenuRepository } from "modules/menu/menu.repository";
import { OrderItemRepository } from "modules/order/order-item.repository";
import { OrderRepository } from "modules/order/order.repository";
import { PaymentRepository } from "modules/payment/payment.repository";
import { UserBalanceRepository } from "modules/user-balance/user-balance.repository";
import { UserRepository } from "modules/users/users.repository";
import { VenueRepository } from "modules/venue/venue.repository";
import { AccountRepository } from "modules/account/account.repository";
import { PromotionService } from "modules/promotion/promotion.service";
import { UserService } from "modules/users/users.service";

const orderRepository = new OrderRepository();
const orderItemRepository = new OrderItemRepository();
const menuRepository = new MenuRepository();
const userBalanceRepository = new UserBalanceRepository();
const invoiceRepository = new InvoiceRepository();
const venueRepository = new VenueRepository();
const ledgerRepository = new LedgerRepository();
const paymentRepository = new PaymentRepository();
const accountRepository = new AccountRepository();
const promotionService = new PromotionService();
const deliveryRepository = new DeliveryRepository();
const userRepository = new UserRepository();
const userService = new UserService();

export class OrderServices {
  async createNewOrder({
    venueId,
    userId,
    items,
    promoCode,
    requiresDelivery = false,
    dropoffAddress,
    dropoffLatitude,
    dropoffLongitude,
  }: {
    venueId: string;
    userId: string;
    promoCode?: string;
    requiresDelivery?: boolean;
    dropoffAddress?: string;
    dropoffLatitude?: number;
    dropoffLongitude?: number;
    items: { menuId: string; quantity: number }[];
  }) {
    if (!items.length) throw new Error("Order items required");

    if (requiresDelivery && !dropoffAddress) {
      throw new Error("Dropoff address is required for delivery orders");
    }

    const venue = await venueRepository.findVenueById(venueId);
    if (!venue) throw new Error("No venue found");

    const invoiceNumber = `INV-${Date.now()}-${crypto
      .randomUUID()
      .slice(0, 8)}`;

    return prisma.$transaction(async (tx) => {
      const menuIds = items.map((i) => i.menuId);
      const menus = await menuRepository.findMenuByIds(menuIds, tx);

      if (menus.length !== menuIds.length) {
        throw new Error("Some menu not found");
      }

      const menuMap = new Map(menus.map((m) => [m.id, m]));

      let total = 0;

      const orderItems: any[] = [];
      const promoItems: any[] = [];

      for (const item of items) {
        const menu = menuMap.get(item.menuId);
        if (!menu) throw new Error("Invalid menu");

        const subtotal = Number(menu.price) * item.quantity;
        total += subtotal;

        orderItems.push({
          menuId: menu.id,
          quantity: item.quantity,
          price: menu.price,
          subtotal,
        });

        promoItems.push({
          menuId: menu.id,
          price: Number(menu.price),
          quantity: item.quantity,
        });
      }

      const promotions = await promotionService.applyPromotions({
        venueId,
        userId,
        promoCode,
        orderTotal: total,
        items: promoItems,
      });

      let discount = 0;
      const freeItems: any[] = [];

      for (const promo of promotions) {
        discount += promo.discountAmount;
        freeItems.push(...promo.freeItems);
      }

      const finalTotal = total - discount;

      const order = await orderRepository.create(
        {
          venueId,
          userId,
          bookingId: null,
          total: new Prisma.Decimal(finalTotal),
          discount: new Prisma.Decimal(discount),
          requiresDelivery,
          dropoffAddress: requiresDelivery ? dropoffAddress : null,
          dropoffLatitude: requiresDelivery ? dropoffLatitude : null,
          dropoffLongitude: requiresDelivery ? dropoffLongitude : null,
        },
        tx,
      );

      for (const free of freeItems) {
        orderItems.push({
          menuId: free.menuId,
          quantity: free.quantity,
          price: 0,
          subtotal: 0,
        });
      }

      await orderItemRepository.createBulkOrders(
        orderItems.map((item) => ({
          ...item,
          orderId: order.id,
        })),
        tx,
      );

      for (const promo of promotions) {
        await promotionService.recordPromotionUsage(
          promo.promotionId,
          userId,
          order.id,
        );
      }

      const invoice = await invoiceRepository.create(
        {
          entityType: "ORDER",
          entityId: order.id,
          invoiceNumber,
          amount: finalTotal,
          expiredAt: new Date(Date.now() + 5 * 60 * 1000),
        },
        tx,
      );

      return {
        order,
        invoice,
        discount,
        promotions,
      };
    });
  }

  async cancelOrder(orderId: string, userId: string) {
    return prisma.$transaction(async (tx) => {
      const order = await orderRepository.findById(orderId, tx);

      if (!order) throw new Error("Order not found");
      if (order.userId !== userId) throw new Error("Unauthorized");

      if (order.status !== "PENDING") {
        throw new Error("Order cannot be cancelled");
      }

      await orderRepository.updateStatus(orderId, "CANCELLED", tx);

      await invoiceRepository.cancelByEntity("ORDER", orderId, tx);

      return order;
    });
  }

  async payOrder(orderId: string, userId: string, pin: string) {
    const user = await userRepository.findById(userId);

    if (!user) throw new Error("User not found");

    if (!user.biometricEnabled) {
      await userService.verifyPin(userId, pin);
    }

    const result = await prisma.$transaction(async (tx) => {
      const order = await orderRepository.findById(orderId, tx);

      if (!order || order.userId !== userId) {
        throw new Error("Order not found");
      }

      if (order.status !== "PENDING") {
        throw new Error("Invalid order status");
      }

      const venue = await venueRepository.findVenueById(order.venueId);

      const userAccount = await accountRepository.findUserAccount(order.userId);
      const venueAccount = await accountRepository.findVenueAccount(
        order.venueId,
      );

      if (!userAccount || !venueAccount) {
        throw new Error("Account not found");
      }

      const invoice = await invoiceRepository.findByEntity(
        "ORDER",
        order.id,
        tx,
      );

      if (!invoice) throw new Error("Invoice not found");

      if (invoice.status !== "PENDING") {
        throw new Error("Invoice already paid or cancelled");
      }

      const balance = await ledgerRepository.getBalance(userId);

      if (!balance || balance.totalBalance < Number(order.total)) {
        throw new Error("Insufficient balance");
      }

      const providerRef = `PAY-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

      await userBalanceRepository.decrementBalance(
        userId,
        Number(order.total),
        tx,
      );

      const payment = await paymentRepository.create(
        {
          invoiceId: invoice.id,
          amount: Number(invoice.amount),
          method: "WALLET",
          provider: "NTB_HUB",
          providerRef,
        },
        tx,
      );

      await ledgerRepository.createMany(
        [
          {
            accountId: userAccount.id as string,
            type: "DEBIT",
            amount: Number(order.total),
            referenceType: "ORDER",
            referenceId: order.id,
          },
          {
            accountId: venueAccount.id as string,
            type: "CREDIT",
            amount: Number(order.total),
            referenceType: "ORDER",
            referenceId: order.id,
          },
        ],
        tx,
      );

      await invoiceRepository.markPaid(invoice.id, tx);

      await orderRepository.updateStatus(orderId, "SUCCESS", tx);

      const newBalance =
        (await userBalanceRepository.getBalanceByUserId(userId, tx)) ?? 0;

      let deliveryId: string | null = null;

      if (order.requiresDelivery) {
        const delivery = await deliveryRepository.createDelivery(
          {
            userId: order.userId,
            bookingId: order.bookingId ?? null,
            orderId: order.id,
            pickupAddress: venue?.address ?? "Venue address unavailable",
            dropoffAddress: order.dropoffAddress ?? user?.address ?? "",
            pickupLatitude: venue?.latitude ?? null,
            pickupLongitude: venue?.longitude ?? null,
            dropoffLatitude: order.dropoffLatitude ?? null,
            dropoffLongitude: order.dropoffLongitude ?? null,
          },
          tx,
        );
        deliveryId = delivery.id;
      }

      return {
        payment,
        invoice,
        order,
        newBalance,
        deliveryId,
      };
    });

    if (result.deliveryId) {
      setImmediate(() => {
        dispatchAssignDelivery(result.deliveryId!);
      });
    }

    publishPaymentEvent({
      userId,
      paymentId: result.payment.id,
      invoiceId: result.invoice.id,
      entityType: "ORDER",
      entityId: result.order.id,
      status: "SUCCESS",
      amount: Number(result.invoice.amount),
      newBalance: result.newBalance,
      method: "WALLET",
      provider: "NTB_HUB",
    });

    return {
      ...result.payment,
      newBalance: result.newBalance,
      orderId: result.order.id,
      deliveryId: result.deliveryId,
    };
  }

  async getAllByUser(userId: string) {
    const orders = await orderRepository.findByUser(userId);

    if (!orders) {
      throw new Error("Orders not found");
    }

    return orders;
  }
}
