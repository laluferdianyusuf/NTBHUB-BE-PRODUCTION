import { UserBalanceRepository } from "modules/user-balance/user-balance.repository";

const userBalanceRepository = new UserBalanceRepository();

export class UserBalanceServices {
  async getUserBalance(userId: string) {
    const balance = await userBalanceRepository.getBalanceByUserId(userId);

    return {
      balance,
    };
  }
}
