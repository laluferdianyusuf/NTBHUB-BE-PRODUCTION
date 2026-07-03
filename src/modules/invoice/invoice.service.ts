import { Invoice } from "@prisma/client";
import { BookingRepository } from "modules/booking/booking.repository";
import { CommunityEventOrderRepository } from "modules/community-event-order/community-event-order.repository";
import { EventOrderRepository } from "modules/event-order/event-order.repository";
import { OrderRepository } from "modules/order/order.repository";
import { InvoiceRepository } from "./invoice.repository";

const invoiceRepository = new InvoiceRepository();
const bookingRepository = new BookingRepository();
const orderRepository = new OrderRepository();
const eventOrderRepository = new EventOrderRepository();
const communityEventOrderRepository = new CommunityEventOrderRepository();

export class InvoiceService {
  async findAllInvoice() {
    const invoices = await invoiceRepository.findAllInvoices();

    const grouped = invoices.reduce<Record<string, Invoice[]>>((acc, invoice) => {
      const key = invoice.entityType;
      if (!acc[key]) acc[key] = [];
      acc[key].push(invoice);
      return acc;
    }, {});

    const bookingIds = (grouped.BOOKING ?? []).map((invoice) => invoice.entityId);
    const orderIds = (grouped.ORDER ?? []).map((invoice) => invoice.entityId);
    const eventOrderIds = (grouped.EVENT_ORDER ?? []).map(
      (invoice) => invoice.entityId,
    );
    const communityEventOrderIds = (grouped.COMMUNITY_EVENT_ORDER ?? []).map(
      (invoice) => invoice.entityId,
    );

    const [bookings, orders, eventOrders, communityEventOrders] =
      await Promise.all([
        bookingIds.length
          ? bookingRepository.findBookingsByIds(bookingIds)
          : Promise.resolve([]),
        orderIds.length
          ? orderRepository.findByIds(orderIds)
          : Promise.resolve([]),
        eventOrderIds.length
          ? eventOrderRepository.findByIds(eventOrderIds)
          : Promise.resolve([]),
        communityEventOrderIds.length
          ? communityEventOrderRepository.findByIds(communityEventOrderIds)
          : Promise.resolve([]),
      ]);

    const bookingMap = new Map(bookings.map((booking) => [booking.id, booking]));
    const orderMap = new Map(orders.map((order) => [order.id, order]));
    const eventOrderMap = new Map(
      eventOrders.map((order) => [order.id, order]),
    );
    const communityEventOrderMap = new Map(
      communityEventOrders.map((order) => [order.id, order]),
    );

    const activities = invoices
      .map((invoice) => {
        switch (invoice.entityType) {
          case "BOOKING": {
            const booking = bookingMap.get(invoice.entityId);
            if (!booking) return null;
            return {
              type: "BOOKING",
              title: `Booking di ${booking.venue.name}`,
              amount: invoice.amount,
              status: invoice.status,
              createdAt: invoice.createdAt,
            };
          }
          case "ORDER": {
            const order = orderMap.get(invoice.entityId);
            if (!order) return null;
            return {
              type: "ORDER",
              title: `Order di ${order.venue.name}`,
              amount: invoice.amount,
              status: invoice.status,
              createdAt: invoice.createdAt,
            };
          }
          case "EVENT_ORDER": {
            const eventOrder = eventOrderMap.get(invoice.entityId);
            if (!eventOrder) return null;
            return {
              type: "EVENT",
              title: `Beli tiket ${eventOrder.event.name}`,
              amount: invoice.amount,
              status: invoice.status,
              createdAt: invoice.createdAt,
            };
          }
          case "COMMUNITY_EVENT_ORDER": {
            const communityEventOrder = communityEventOrderMap.get(
              invoice.entityId,
            );
            if (!communityEventOrder) return null;
            return {
              type: "EVENT",
              title: `Beli tiket ${communityEventOrder.communityEvent.community.name}`,
              amount: invoice.amount,
              status: invoice.status,
              createdAt: invoice.createdAt,
            };
          }
          case "TOPUP":
            return {
              type: "TOPUP",
              title: "Topup saldo",
              amount: invoice.amount,
              status: invoice.status,
              createdAt: invoice.createdAt,
            };
          default:
            return null;
        }
      })
      .filter(Boolean);

    return activities;
  }
}
