import { Prisma } from "@prisma/client";
import { prisma } from "config/prisma";

export class PlatformBalanceRepository {
  private transaction(tx?: Prisma.TransactionClient) {
    return tx ?? prisma;
  }

  async incrementBalance(
    amount: number,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const client = this.transaction(tx);
    await client.platformBalance.update({
      where: { id: "platform-balance" },
      data: { balance: { increment: amount } },
    });
  }

  async findBalance(tx?: Prisma.TransactionClient) {
    const client = this.transaction(tx);
    const balance = await client.platformBalance.findUnique({
      where: { id: "platform-balance" },
    });

    return balance;
  }

  async decrementBalance(
    amount: number,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const client = this.transaction(tx);
    await client.platformBalance.update({
      where: { id: "platform-balance" },
      data: { balance: { decrement: amount } },
    });
  }
}
