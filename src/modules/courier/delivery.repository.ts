import { DeliveryStatus, Prisma } from "@prisma/client";
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
      },
    });
  }

  async findByIdPublic(id: string) {
    return prisma.delivery.findUnique({
      where: { id },
      include: deliveryInclude,
    });
  }

  async findByOrderId(orderId: string) {
    return prisma.delivery.findUnique({
      where: { orderId },
      include: deliveryInclude,
    });
  }

  async findActiveByCourierId(courierId: string) {
    return prisma.delivery.findFirst({
      where: {
        courierId,
        status: {
          in: ["ASSIGNED", "PICKED_UP", "ON_THE_WAY"],
        },
      },
      include: deliveryInclude,
      orderBy: { updatedAt: "desc" },
    });
  }

  async findHistoryByCourierId(courierId: string, limit = 20) {
    return prisma.delivery.findMany({
      where: { courierId },
      include: deliveryInclude,
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  async updateLastAssignedAt(id: string, tx: Prisma.TransactionClient) {
    return tx.delivery.update({
      where: { id },
      data: {
        lastAssignedAt: new Date(),
      },
    });
  }

  async lockDelivery(id: string, tx: Prisma.TransactionClient) {
    const result = await tx.$queryRawUnsafe<any[]>(
      `
      SELECT * FROM "Delivery"
      WHERE id = $1
      FOR UPDATE
    `,
      id,
    );

    return result[0];
  }

  async assignCourier(
    deliveryId: string,
    courierId: string,
    tx: Prisma.TransactionClient,
  ) {
    return tx.delivery.update({
      where: { id: deliveryId },
      data: {
        courierId,
        status: "ASSIGNED",
        assignedAt: new Date(),
      },
    });
  }

  async markPickedUp(deliveryId: string, tx: Prisma.TransactionClient) {
    return tx.delivery.update({
      where: { id: deliveryId },
      data: {
        status: "PICKED_UP",
        pickedUpAt: new Date(),
      },
    });
  }

  async markOnTheWay(deliveryId: string, tx: Prisma.TransactionClient) {
    return tx.delivery.update({
      where: { id: deliveryId },
      data: { status: "ON_THE_WAY" },
    });
  }

  async markDelivered(deliveryId: string, tx: Prisma.TransactionClient) {
    return tx.delivery.update({
      where: { id: deliveryId },
      data: {
        status: "DELIVERED",
        deliveredAt: new Date(),
      },
    });
  }

  async updateStatus(
    deliveryId: string,
    status: DeliveryStatus,
    tx: Prisma.TransactionClient,
  ) {
    return tx.delivery.update({
      where: { id: deliveryId },
      data: { status },
    });
  }

  async incrementAttempt(deliveryId: string, tx: Prisma.TransactionClient) {
    return tx.delivery.update({
      where: { id: deliveryId },
      data: {
        attemptCount: {
          increment: 1,
        },
      },
    });
  }

  async resetToPending(deliveryId: string, tx: Prisma.TransactionClient) {
    return tx.delivery.update({
      where: { id: deliveryId },
      data: {
        status: "PENDING",
        courierId: null,
        assignedAt: null,
      },
    });
  }

  async getRejectedCourierIds(
    deliveryId: string,
    tx: Prisma.TransactionClient,
  ) {
    const data = await tx.deliveryRejectedCourier.findMany({
      where: { deliveryId },
      select: { courierId: true },
    });

    return data.map((d) => d.courierId);
  }

  async addRejectedCourier(
    deliveryId: string,
    courierId: string,
    tx: Prisma.TransactionClient,
  ) {
    return tx.deliveryRejectedCourier.upsert({
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
    tx: Prisma.TransactionClient,
  ) {
    return tx.deliveryAssignmentLog.create({
      data,
    });
  }
}
