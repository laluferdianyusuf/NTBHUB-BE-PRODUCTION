import {
  CourierAvailability,
  CourierStatus,
  Prisma,
  VehicleType,
} from "@prisma/client";
import { prisma } from "config/prisma";

export class CourierRepository {
  async findByUserId(userId: string) {
    return prisma.courier.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
            photo: true,
          },
        },
      },
    });
  }

  async findById(id: string, tx?: Prisma.TransactionClient) {
    const client = tx ?? prisma;
    return client.courier.findUnique({
      where: { id },
    });
  }

  async create(
    data: {
      userId: string;
      vehicleType: VehicleType;
      plateNumber?: string;
      photo?: string;
    },
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? prisma;
    return client.courier.create({
      data: {
        userId: data.userId,
        vehicleType: data.vehicleType,
        plateNumber: data.plateNumber,
        photo: data.photo,
        status: "PENDING",
        availability: "OFFLINE",
      },
    });
  }

  async findByIdsWithLockOrdered(ids: string[], tx: Prisma.TransactionClient) {
    if (!ids.length) return [];

    const rows = await tx.$queryRawUnsafe<any[]>(
      `
    SELECT * FROM "Courier"
    WHERE id = ANY($1)
    FOR UPDATE
  `,
      ids,
    );

    const map = new Map(rows.map((r) => [r.id, r]));

    return ids.map((id) => map.get(id)).filter(Boolean);
  }

  async findAvailableCouriersWithLock(
    { limit, excludeIds }: { limit: number; excludeIds: string[] },
    tx: Prisma.TransactionClient,
  ) {
    if (excludeIds.length === 0) {
      return tx.$queryRawUnsafe<any[]>(`
        SELECT * FROM "Courier"
        WHERE availability = 'ONLINE'
        AND "isActive" = true
        ORDER BY rating DESC
        LIMIT ${limit}
        FOR UPDATE SKIP LOCKED
      `);
    }

    const placeholders = excludeIds.map((_, i) => `$${i + 1}`).join(",");

    return tx.$queryRawUnsafe<any[]>(
      `
      SELECT * FROM "Courier"
      WHERE availability = 'ONLINE'
      AND "isActive" = true
      AND id NOT IN (${placeholders})
      ORDER BY rating DESC
      LIMIT ${limit}
      FOR UPDATE SKIP LOCKED
      `,
      ...excludeIds,
    );
  }

  async updateStatus(
    id: string,
    status: CourierStatus,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? prisma;
    return client.courier.update({
      where: { id },
      data: { status },
    });
  }

  async findAllForAdmin() {
    return prisma.courier.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });
  }

  async updateAvailability(
    id: string,
    availability: CourierAvailability,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? prisma;
    return client.courier.update({
      where: { id },
      data: { availability },
    });
  }

  async setOnDelivery(id: string, tx: Prisma.TransactionClient) {
    return tx.courier.update({
      where: { id },
      data: {
        availability: "BUSY",
      },
    });
  }

  async setOnline(id: string, tx: Prisma.TransactionClient) {
    return tx.courier.update({
      where: { id },
      data: {
        availability: "ONLINE",
      },
    });
  }

  async incrementTrips(id: string, tx: Prisma.TransactionClient) {
    return tx.courier.update({
      where: { id },
      data: {
        totalTrips: { increment: 1 },
      },
    });
  }

  async logAvailability(
    courierId: string,
    status: CourierAvailability,
    note?: string,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? prisma;
    return client.courierAvailabilityLog.create({
      data: {
        courierId,
        status,
        note,
      },
    });
  }
}
