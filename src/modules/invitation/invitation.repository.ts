import { Prisma, Role } from "@prisma/client";

import { prisma } from "config/prisma";

export class InvitationKeyRepository {
  private db(tx?: Prisma.TransactionClient) {
    return tx ?? prisma;
  }

  async generateEvent(
    params: {
      email: string;
      key: string;
      role: Role;
      eventId: string;
      expiresAt?: Date;
    },
    tx?: Prisma.TransactionClient,
  ) {
    const db = this.db(tx);

    return db.invitationKey.create({
      data: {
        email: params.email,
        key: params.key,
        role: params.role,

        eventId: params.eventId,
        venueId: null,
        communityId: null,

        expiresAt: params.expiresAt ?? null,
      },
    });
  }

  async generateVenue(
    params: {
      email: string;
      key: string;
      role: Role;
      venueId: string;
      expiresAt?: Date;
    },
    tx?: Prisma.TransactionClient,
  ) {
    const db = this.db(tx);

    return db.invitationKey.create({
      data: {
        email: params.email,
        key: params.key,
        role: params.role,

        venueId: params.venueId,
        eventId: null,
        communityId: null,

        expiresAt: params.expiresAt ?? null,
      },
    });
  }

  async generateCommunity(
    params: {
      email: string;
      key: string;
      role: Role;
      communityId: string;
      expiresAt?: Date;
    },
    tx?: Prisma.TransactionClient,
  ) {
    const db = this.db(tx);

    return db.invitationKey.create({
      data: {
        email: params.email,
        key: params.key,
        role: params.role,

        communityId: params.communityId,
        venueId: null,
        eventId: null,

        expiresAt: params.expiresAt ?? null,
      },
    });
  }

  async findByKey(key: string, tx?: Prisma.TransactionClient) {
    const db = this.db(tx);

    return db.invitationKey.findUnique({
      where: { key },
    });
  }

  async findActiveByEmail(email: string, tx?: Prisma.TransactionClient) {
    const db = tx ?? prisma;

    const result = await db.invitationKey.findMany({
      where: {
        email,
        usedAt: null,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      include: {
        venue: { select: { id: true, name: true, image: true } },
        event: { select: { id: true, name: true, image: true } },
        community: { select: { id: true, name: true, image: true } },
      },
    });

    return result;
  }

  async revokeActiveByTarget(
    params: {
      email: string;
      venueId?: string;
      eventId?: string;
      communityId?: string;
    },
    tx?: Prisma.TransactionClient,
  ) {
    const db = this.db(tx);
    const now = new Date();

    const where: Prisma.InvitationKeyWhereInput = {
      email: params.email,
      usedAt: null,
      OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
    };

    if (params.venueId) {
      where.venueId = params.venueId;
    } else if (params.eventId) {
      where.eventId = params.eventId;
    } else if (params.communityId) {
      where.communityId = params.communityId;
    }

    return db.invitationKey.updateMany({
      where,
      data: { expiresAt: now },
    });
  }

  async markUsed(id: string, tx?: Prisma.TransactionClient) {
    const db = this.db(tx);

    return db.invitationKey.update({
      where: { id },
      data: { usedAt: new Date() },
    });
  }
}
