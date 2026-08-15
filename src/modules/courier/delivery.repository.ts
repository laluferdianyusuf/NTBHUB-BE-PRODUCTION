import { DeliveryPaymentStatus, DeliveryStatus, Prisma } from "@prisma/client";
import { prisma } from "config/prisma";

const deliveryInclude = {
  courier: {
    select: {
      id: true,
      userId: true,
      vehicleType: true,
      plateNumber: true,
      photo: true,
      rating: true,
      user: {
        select: {
          id: true,
          name: true,
          phone: true,
          photo: true,
        },
      },
    },
  },
  order: {
    select: {
      id: true,
      total: true,
      venue: {
        select: {
          id: true,
          name: true,
          address: true,
        },
      },
    },
  },
} satisfies Prisma.DeliveryInclude;

export class DeliveryRepository {
  async createDelivery(
    data: {
      userId?: string;
      bookingId?: string | null;
      orderId?: string | null;
      pickupAddress: string;
      dropoffAddress: string;
      pickupLatitude?: number | null;
      pickupLongitude?: number | null;
      dropoffLatitude?: number | null;
      dropoffLongitude?: number | null;
      basePrice?: number | null;
      packagePrice?: number | null;
      speedPrice?: number | null;
      totalPrice?: number | null;
      paymentStatus: DeliveryPaymentStatus;
      note?: string;
    },
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx || prisma;

    return client.delivery.create({
      data: {
        userId: data.userId ?? null,
        bookingId: data.bookingId ?? null,
        orderId: data.orderId ?? null,

        pickupAddress: data.pickupAddress,
        dropoffAddress: data.dropoffAddress,

        pickupLatitude: data.pickupLatitude ?? null,
        pickupLongitude: data.pickupLongitude ?? null,
        dropoffLatitude: data.dropoffLatitude ?? null,
        dropoffLongitude: data.dropoffLongitude ?? null,

        status: "PENDING",

        basePrice: data.basePrice ?? null,
        packagePrice: data.packagePrice ?? null,
        speedPrice: data.speedPrice ?? null,
        totalPrice: data.totalPrice ?? null,

        paymentStatus: data.paymentStatus,

        note: data.note ?? null,
      },
    });
  }

  async findByIdPublic(id: string, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;

    return client.delivery.findUnique({
      where: { id },
      include: deliveryInclude,
    });
  }

  async findByOrderId(orderId: string, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;

    return client.delivery.findUnique({
      where: { orderId },
      include: deliveryInclude,
    });
  }

  async findActiveByCourierId(
    courierId: string,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx || prisma;

    return client.delivery.findFirst({
      where: {
        courierId,
        status: {
          in: ["ASSIGNED", "PICKED_UP", "ON_THE_WAY"],
        },
      },
      include: deliveryInclude,
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  async findHistoryByCourierId(
    courierId: string,
    limit = 20,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx || prisma;

    return client.delivery.findMany({
      where: {
        courierId,
      },
      include: deliveryInclude,
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  }

  async updateLastAssignedAt(id: string, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;

    return client.delivery.update({
      where: { id },
      data: {
        lastAssignedAt: new Date(),
      },
    });
  }

  async lockDelivery(id: string, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;

    const result = await client.$queryRaw<any[]>`
      SELECT *
      FROM "Delivery"
      WHERE id = ${id}
      FOR UPDATE
    `;

    return result[0];
  }

  async assignCourier(
    deliveryId: string,
    courierId: string,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx || prisma;

    return client.delivery.update({
      where: {
        id: deliveryId,
      },
      data: {
        courierId,
        status: "ASSIGNED",
        assignedAt: new Date(),
      },
    });
  }

  async markPickedUp(deliveryId: string, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;

    return client.delivery.update({
      where: {
        id: deliveryId,
      },
      data: {
        status: "PICKED_UP",
        pickedUpAt: new Date(),
      },
    });
  }

  async markOnTheWay(deliveryId: string, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;

    return client.delivery.update({
      where: {
        id: deliveryId,
      },
      data: {
        status: "ON_THE_WAY",
      },
    });
  }

  async markDelivered(deliveryId: string, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;

    return client.delivery.update({
      where: {
        id: deliveryId,
      },
      data: {
        status: "DELIVERED",
        deliveredAt: new Date(),
      },
    });
  }

  async updateStatus(
    deliveryId: string,
    status: DeliveryStatus,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx || prisma;

    return client.delivery.update({
      where: {
        id: deliveryId,
      },
      data: {
        status,
      },
    });
  }

  async incrementAttempt(deliveryId: string, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;

    return client.delivery.update({
      where: {
        id: deliveryId,
      },
      data: {
        attemptCount: {
          increment: 1,
        },
      },
    });
  }

  async resetToPending(deliveryId: string, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;

    return client.delivery.update({
      where: {
        id: deliveryId,
      },
      data: {
        status: "PENDING",
        courierId: null,
        assignedAt: null,
      },
    });
  }

  async getRejectedCourierIds(
    deliveryId: string,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx || prisma;

    const data = await client.deliveryRejectedCourier.findMany({
      where: {
        deliveryId,
      },
      select: {
        courierId: true,
      },
    });

    return data.map((d) => d.courierId);
  }

  async addRejectedCourier(
    deliveryId: string,
    courierId: string,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx || prisma;

    return client.deliveryRejectedCourier.upsert({
      where: {
        deliveryId_courierId: {
          deliveryId,
          courierId,
        },
      },
      update: {},
      create: {
        deliveryId,
        courierId,
      },
    });
  }

  async createAssignmentLog(
    data: {
      deliveryId: string;
      courierId: string;
      status: string;
    },
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx || prisma;

    return client.deliveryAssignmentLog.create({
      data,
    });
  }
}
