import { Prisma } from "@prisma/client";

import { prisma } from "config/prisma";

export class EventTicketTypeRepository {
  async create(data: {
    eventId: string;
    name: string;
    price: number;
    quota: number;
    description: string;
  }) {
    return prisma.eventTicketType.create({ data });
  }

  async findByEvent(eventId: string, tx?: Prisma.TransactionClient) {
    const db = tx ?? prisma;
    return db.eventTicketType.findMany({
      where: { eventId, isActive: true },
      orderBy: { price: "asc" },
    });
  }

  async findAll(eventId: string, tx?: Prisma.TransactionClient) {
    const db = tx ?? prisma;
    return db.eventTicketType.findMany({
      where: { eventId },
      orderBy: { price: "asc" },
    });
  }

  async findById(tx: Prisma.TransactionClient | undefined, id: string) {
    const db = tx ?? prisma;
    return db.eventTicketType.findUnique({ where: { id } });
  }

  async update(
    id: string,
    data: Partial<{
      name: string;
      price: number;
      quota: number;
      isActive: boolean;
    }>,
  ) {
    return prisma.eventTicketType.update({
      where: { id },
      data,
    });
  }

  async reserveSold(
    id: string,
    qty: number,
    tx?: Prisma.TransactionClient,
  ): Promise<boolean> {
    const db = tx ?? prisma;
    const updated = await db.$executeRaw`
      UPDATE "EventTicketType"
      SET "sold" = "sold" + ${qty}
      WHERE "id" = ${id}
        AND "isActive" = true
        AND "sold" + ${qty} <= "quota"
    `;
    return Number(updated) > 0;
  }

  async releaseSold(
    id: string,
    qty: number,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const db = tx ?? prisma;
    await db.eventTicketType.update({
      where: { id },
      data: { sold: { decrement: qty } },
    });
  }

  async updateSold(id: string, qty: number, tx?: Prisma.TransactionClient) {
    const db = tx ?? prisma;
    return db.eventTicketType.update({
      where: { id: id },
      data: { sold: { increment: qty } },
    });
  }

  async delete(id: string) {
    return prisma.eventTicketType.delete({ where: { id } });
  }
}
