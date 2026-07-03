import { PointsRepository } from "modules/points/points.repository";
const pointRepository = new PointsRepository();

export class PointsServices {
  async getUserTotalPoints(userId: string) {
    const totalPoints = await pointRepository.getTotalPoints(userId);
    return totalPoints;
  }

  async getPointByUserId(userId: string) {
    const points = await pointRepository.getPointsByUserId(userId);
    return points;
  }
}
