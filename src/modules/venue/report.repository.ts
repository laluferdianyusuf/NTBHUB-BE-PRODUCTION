import { prisma } from "config/prisma";

type ReportRange = "7d" | "30d" | "90d" | "1y";

function getDateRange(range: ReportRange) {
  const to = new Date();
  const from = new Date(to);

  switch (range) {
    case "7d":
      from.setDate(from.getDate() - 7);
      break;

    case "30d":
      from.setDate(from.getDate() - 30);
      break;

    case "90d":
      from.setDate(from.getDate() - 90);
      break;

    case "1y":
      from.setFullYear(from.getFullYear() - 1);
      break;
  }

  return {
    from,
    to,
  };
}

function getPreviousPeriod(from: Date, to: Date) {
  const duration = to.getTime() - from.getTime();

  return {
    from: new Date(from.getTime() - duration),
    to: new Date(from.getTime()),
  };
}

export class ReportRepository {
  async getReportOverview(range: ReportRange) {
    const { from, to } = getDateRange(range);

    const previous = getPreviousPeriod(from, to);

    const [
      paidRevenue,
      previousRevenue,

      successfulPayments,
      pendingPayments,
      failedPayments,
      refundedPayments,

      totalBookings,
      paidBookings,
      pendingBookings,
      completedBookings,
      cancelledBookings,

      totalTransactions,

      totalCustomers,
      newCustomers,

      totalOrders,
      paidOrders,

      totalEventOrders,
      paidEventOrders,

      totalCommunityEventOrders,
      paidCommunityEventOrders,

      totalDeliveries,
      deliveredDeliveries,
    ] = await Promise.all([
      prisma.invoice.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          status: "PAID",
          createdAt: {
            gte: from,
            lte: to,
          },
        },
      }),

      prisma.invoice.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          status: "PAID",
          createdAt: {
            gte: previous.from,
            lt: previous.to,
          },
        },
      }),

      prisma.payment.count({
        where: {
          status: "SUCCESS",
          createdAt: {
            gte: from,
            lte: to,
          },
        },
      }),

      prisma.payment.count({
        where: {
          status: "PENDING",
          createdAt: {
            gte: from,
            lte: to,
          },
        },
      }),

      prisma.payment.count({
        where: {
          status: "FAILED",
          createdAt: {
            gte: from,
            lte: to,
          },
        },
      }),

      prisma.payment.count({
        where: {
          status: "REFUNDED",
          createdAt: {
            gte: from,
            lte: to,
          },
        },
      }),

      prisma.booking.count({
        where: {
          createdAt: {
            gte: from,
            lte: to,
          },
        },
      }),

      prisma.booking.count({
        where: {
          status: "PAID",
          createdAt: {
            gte: from,
            lte: to,
          },
        },
      }),

      prisma.booking.count({
        where: {
          status: "PENDING",
          createdAt: {
            gte: from,
            lte: to,
          },
        },
      }),

      prisma.booking.count({
        where: {
          status: "COMPLETED",
          createdAt: {
            gte: from,
            lte: to,
          },
        },
      }),

      prisma.booking.count({
        where: {
          status: "CANCELLED",
          createdAt: {
            gte: from,
            lte: to,
          },
        },
      }),

      prisma.payment.count({
        where: {
          createdAt: {
            gte: from,
            lte: to,
          },
        },
      }),

      prisma.user.count(),

      prisma.user.count({
        where: {
          createdAt: {
            gte: from,
            lte: to,
          },
        },
      }),

      prisma.order.count({
        where: {
          createdAt: {
            gte: from,
            lte: to,
          },
        },
      }),

      prisma.order.count({
        where: {
          status: "SUCCESS",
          createdAt: {
            gte: from,
            lte: to,
          },
        },
      }),

      prisma.eventOrder.count({
        where: {
          createdAt: {
            gte: from,
            lte: to,
          },
        },
      }),

      prisma.eventOrder.count({
        where: {
          status: "PAID",
          createdAt: {
            gte: from,
            lte: to,
          },
        },
      }),

      prisma.communityEventOrder.count({
        where: {
          createdAt: {
            gte: from,
            lte: to,
          },
        },
      }),

      prisma.communityEventOrder.count({
        where: {
          status: "PAID",
          createdAt: {
            gte: from,
            lte: to,
          },
        },
      }),

      prisma.delivery.count({
        where: {
          createdAt: {
            gte: from,
            lte: to,
          },
        },
      }),

      prisma.delivery.count({
        where: {
          status: "DELIVERED",
          createdAt: {
            gte: from,
            lte: to,
          },
        },
      }),
    ]);

    const revenue = Number(paidRevenue._sum.amount ?? 0);

    const previousRevenueValue = Number(previousRevenue._sum.amount ?? 0);

    const growth =
      previousRevenueValue === 0
        ? revenue > 0
          ? 100
          : 0
        : ((revenue - previousRevenueValue) / previousRevenueValue) * 100;

    return {
      period: {
        range,
        from,
        to,
      },

      summary: {
        revenue,
        transactions: totalTransactions,
        bookings: totalBookings,
        newCustomers,
      },

      revenue: {
        total: revenue,
        previousPeriod: previousRevenueValue,
        growth: Number(growth.toFixed(2)),
      },

      payments: {
        success: successfulPayments,
        pending: pendingPayments,
        failed: failedPayments,
        refunded: refundedPayments,
      },

      bookings: {
        total: totalBookings,
        paid: paidBookings,
        pending: pendingBookings,
        completed: completedBookings,
        cancelled: cancelledBookings,
      },

      customers: {
        total: totalCustomers,
        new: newCustomers,
      },

      orders: {
        total: totalOrders,
        paid: paidOrders,
      },

      events: {
        totalOrders: totalEventOrders,
        paidOrders: paidEventOrders,
      },

      communityEvents: {
        totalOrders: totalCommunityEventOrders,
        paidOrders: paidCommunityEventOrders,
      },

      deliveries: {
        total: totalDeliveries,
        delivered: deliveredDeliveries,
      },
    };
  }
}
