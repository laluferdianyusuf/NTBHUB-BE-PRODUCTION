import { Prisma, PromotionItem } from "@prisma/client";
import { prisma } from "config/prisma";

export interface CreatePromotionItemInput {
  promotionId: string;
  menuId?: string;
  quantity?: number;
  isReward?: boolean;
}

export class PromotionItemRepository {
  async findByPromotion(
    where: Prisma.PromotionItemWhereInput,
  ): Promise<PromotionItem[]> {
    return prisma.promotionItem.findMany({
      where,
    });
  }

  async findByPromotionIds(
    promotionIds: string[],
  ): Promise<PromotionItem[]> {
    if (!promotionIds.length) return [];

    return prisma.promotionItem.findMany({
      where: {
        promotionId: { in: promotionIds },
      },
    });
  }

  async createMany(
    items: CreatePromotionItemInput[],
    tx?: Prisma.TransactionClient,
  ): Promise<Prisma.BatchPayload> {
    const db = tx ?? prisma;

    return db.promotionItem.createMany({
      data: items,
    });
  }
}
