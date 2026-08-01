import { prisma } from "config/prisma";
import {
  publishDeliveryEvent,
  publishDeliveryLocation,
} from "helpers/deliveryEvents";

export class CourierTrackingService {
  async updateLocation(courierId: string, latitude: number, longitude: number) {
    const location = await prisma.courierLocation.upsert({
      where: { courierId },
      update: {
        latitude,
        longitude,
        updatedAt: new Date(),
      },
      create: {
        courierId,
        latitude,
        longitude,
      },
    });

    const delivery = await prisma.delivery.findFirst({
      where: {
        courierId,
        status: {
          in: ["ASSIGNED", "PICKED_UP", "ON_THE_WAY"],
        },
      },
      include: {
        courier: { select: { userId: true } },
      },
    });

    if (delivery) {
      publishDeliveryLocation({
        deliveryId: delivery.id,
        orderId: delivery.orderId,
        userId: delivery.userId,
        courierId,
        courierUserId: delivery.courier?.userId,
        status: delivery.status as any,
        latitude,
        longitude,
      });
    }

    return location;
  }
}
