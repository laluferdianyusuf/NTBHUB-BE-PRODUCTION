import {
  DeliveryPaymentStatus,
  DeliveryServiceType,
  LedgerDirection,
  VehicleType,
} from "@prisma/client";
import { prisma } from "config/prisma";
import {
  publishDeliveryAccepted,
  publishDeliveryEvent,
  publishDeliveryLocation,
} from "helpers/deliveryEvents";
import { AccountRepository } from "modules/account";
import { AccountService } from "modules/account/account.service";
import { CourierEarningsRepository } from "modules/courier/courier-earnings.repository";
import { CourierRepository } from "modules/courier/courier.repository";
import { DeliveryRepository } from "modules/courier/delivery.repository";
import { PlatformBalanceRepository } from "modules/finance";
import { LedgerRepository } from "modules/ledger";
import { UserBalanceRepository } from "modules/user-balance";
import { UserRoleRepository } from "modules/user-role/user-role.repository";
import { UserRepository } from "modules/users/users.repository";
import { UserService } from "modules/users/users.service";
import {
  cancelAssignmentTimeout,
  dispatchAssignDelivery,
  scheduleAssignmentTimeout,
} from "queue/dispatch";
import { BadRequestError, ForbiddenError, NotFoundError } from "shared/errors";
import {
  filterAvailableCouriers,
  findNearestCouriers,
  updateCourierLocation as updateCourierGeo,
} from "socket/courier.socket";
import { CourierLocationRepository } from "./courier-location.repository";

const courierRepo = new CourierRepository();
const courierLocationRepo = new CourierLocationRepository();
const deliveryRepo = new DeliveryRepository();
const userRoleRepo = new UserRoleRepository();
const accountService = new AccountService();
const earningsRepo = new CourierEarningsRepository();
const userBalanceRepo = new UserBalanceRepository();
const platformBalanceRepo = new PlatformBalanceRepository();
const accountRepo = new AccountRepository();
const ledgerRepo = new LedgerRepository();
const userRepo = new UserRepository();
const userService = new UserService();

const MAX_ATTEMPT = 5;
const DEFAULT_COURIER_EARNING = 10000;

export class CourierService {
  private buildDeliveryPayload(
    delivery: {
      id: string;
      orderId?: string | null;
      bookingId?: string | null;
      userId?: string | null;
      courierId?: string | null;
      status: string;
      paymentStatus?: string;
      pickupAddress: string;
      dropoffAddress: string;
    },
    courier?: { id: string; userId: string } | null,
  ) {
    return {
      deliveryId: delivery.id,
      orderId: delivery.orderId,
      bookingId: delivery.bookingId,
      userId: delivery.userId,
      courierId: delivery.courierId,
      courierUserId: courier?.userId ?? null,
      status: delivery.status as any,
      paymentStatus: delivery.paymentStatus as any,
      pickupAddress: delivery.pickupAddress,
      dropoffAddress: delivery.dropoffAddress,
      courier,
    };
  }

  async registerCourier(
    userId: string,
    data: {
      vehicleType: VehicleType;
      plateNumber?: string;
      photo?: string;
    },
  ) {
    const existing = await courierRepo.findByUserId(userId);
    if (existing) {
      return existing;
    }

    return prisma.$transaction(async (tx) => {
      const courier = await courierRepo.create(
        {
          userId,
          vehicleType: data.vehicleType,
          plateNumber: data.plateNumber,
          photo: data.photo,
        },
        tx,
      );

      const hasCourierRole = await userRoleRepo.hasRole(
        { userId, role: "COURIER" },
        tx,
      );

      if (!hasCourierRole) {
        await userRoleRepo.assignGlobalRole({ userId, role: "COURIER" }, tx);
      }

      await accountService.ensureAccount(
        { type: "COURIER", courierId: courier.id },
        tx,
      );

      return courier;
    });
  }

  async getProfile(userId: string) {
    const courier = await courierRepo.findByUserId(userId);
    if (!courier) throw new NotFoundError("Courier profile not found");
    return courier;
  }

  async updateAvailability(userId: string, status: "ONLINE" | "OFFLINE") {
    const courier = await courierRepo.findByUserId(userId);
    if (!courier) throw new NotFoundError("Courier profile not found");

    if (courier.status === "ON_DELIVERY" && status === "OFFLINE") {
      throw new Error("Cannot go offline while on delivery");
    }

    const updated = await prisma.$transaction(async (tx) => {
      await courierRepo.logAvailability(courier.id, status, undefined, tx);
      return courierRepo.updateStatus(courier.id, status, tx);
    });

    return updated;
  }

  async updateLocation(userId: string, latitude: number, longitude: number) {
    const courier = await courierRepo.findByUserId(userId);
    if (!courier) throw new NotFoundError("Courier profile not found");

    await updateCourierGeo(courier.id, latitude, longitude);

    await prisma.courierLocation.upsert({
      where: { courierId: courier.id },
      update: { latitude, longitude, updatedAt: new Date() },
      create: { courierId: courier.id, latitude, longitude },
    });

    const activeDelivery = await deliveryRepo.findActiveByCourierId(courier.id);

    if (activeDelivery) {
      await publishDeliveryLocation({
        deliveryId: activeDelivery.id,
        orderId: activeDelivery.orderId,
        userId: activeDelivery.userId,
        courierId: courier.id,
        courierUserId: courier.userId,
        status: activeDelivery.status,
        latitude,
        longitude,

        timestamp: new Date().toISOString(),
      });
    }

    return { courierId: courier.id, latitude, longitude };
  }

  async getDeliveryById(deliveryId: string, requestUserId: string) {
    const delivery = await deliveryRepo.findByIdPublic(deliveryId);
    if (!delivery) throw new NotFoundError("Delivery not found");

    const courier = delivery.courierId
      ? await courierRepo.findById(delivery.courierId)
      : null;

    const isCustomer = delivery.userId === requestUserId;
    const isCourier = courier?.userId === requestUserId;

    if (!isCustomer && !isCourier) {
      const isAdmin = await userRoleRepo.hasRole({
        userId: requestUserId,
        role: "ADMIN",
      });
      if (!isAdmin) throw new ForbiddenError();
    }

    const location = delivery.courierId
      ? await prisma.courierLocation.findUnique({
          where: { courierId: delivery.courierId },
        })
      : null;

    return { ...delivery, courierLocation: location };
  }

  async getDeliveryByOrderId(orderId: string, requestUserId: string) {
    const delivery = await deliveryRepo.findByOrderId(orderId);
    if (!delivery) throw new NotFoundError("Delivery not found");

    return this.getDeliveryById(delivery.id, requestUserId);
  }

  async getActiveDelivery(userId: string) {
    const courier = await courierRepo.findByUserId(userId);
    if (!courier) throw new NotFoundError("Courier profile not found");

    return deliveryRepo.findActiveByCourierId(courier.id);
  }

  async getDeliveryHistory(userId: string) {
    const courier = await courierRepo.findByUserId(userId);
    if (!courier) throw new NotFoundError("Courier profile not found");

    return deliveryRepo.findHistoryByCourierId(courier.id);
  }

  async getCourierLocation(userId: string) {
    const courier = await courierRepo.findByUserId(userId);
    if (!courier) throw new NotFoundError("Courier not found");

    const location = await courierLocationRepo.findCourierLocation(courier.id);
    return location;
  }

  private async requireAssignedCourier(deliveryId: string, userId: string) {
    const courier = await courierRepo.findByUserId(userId);
    if (!courier) throw new NotFoundError("Courier profile not found");

    const location = await courierLocationRepo.findCourierLocation(courier.id);
    if (!courier) throw new NotFoundError("Courier locations not found");

    const delivery = await deliveryRepo.findByIdPublic(deliveryId);
    if (!delivery) throw new NotFoundError("Delivery not found");

    if (delivery.courierId !== courier.id) {
      throw new ForbiddenError("Not assigned to this delivery");
    }

    return { courier, delivery, location };
  }

  async createDelivery(
    userId: string,
    data: {
      bookingId?: string | null;
      orderId?: string | null;

      serviceType: DeliveryServiceType;

      pickupAddress: string;
      dropoffAddress: string;

      pickupLatitude?: number | null;
      pickupLongitude?: number | null;
      dropoffLatitude?: number | null;
      dropoffLongitude?: number | null;

      packageSize?: "SMALL" | "MEDIUM" | "LARGE";
      speed?: "STANDARD" | "EXPRESS";

      note?: string;

      items?: {
        name: string;
        quantity?: number;
      }[];
    },
  ) {
    const basePrice = 12000;

    const packagePrice =
      data.packageSize === "MEDIUM"
        ? 5000
        : data.packageSize === "LARGE"
          ? 7000
          : 3000;

    const speedPrice = data.speed === "EXPRESS" ? 15000 : 0;

    const totalPrice = basePrice + packagePrice + speedPrice;

    const delivery = await prisma.$transaction(async (tx) => {
      const created = await deliveryRepo.createDelivery(
        {
          userId,

          bookingId: data.bookingId ?? null,
          orderId: data.orderId ?? null,

          serviceType: data.serviceType,

          pickupAddress: data.pickupAddress,
          pickupLatitude: data.pickupLatitude ?? null,
          pickupLongitude: data.pickupLongitude ?? null,

          dropoffAddress: data.dropoffAddress,
          dropoffLatitude: data.dropoffLatitude ?? null,
          dropoffLongitude: data.dropoffLongitude ?? null,

          basePrice,
          packagePrice,
          speedPrice,
          totalPrice,

          paymentStatus: "UNPAID",

          note: data.note ?? null,

          items: data.items ?? [],
        },
        tx,
      );

      return created;
    });

    await dispatchAssignDelivery(delivery.id);

    return delivery;
  }

  async acceptDelivery(deliveryId: string, userId: string) {
    const { courier, delivery } = await this.requireAssignedCourier(
      deliveryId,
      userId,
    );

    if (delivery.status !== "ASSIGNED") {
      throw new Error("Delivery is not waiting for acceptance");
    }

    if (delivery.paymentStatus !== "PAID") {
      throw new Error("Delivery must be paid before acceptance");
    }

    await cancelAssignmentTimeout(deliveryId);

    const updated = await prisma.$transaction(async (tx) => {
      await deliveryRepo.createAssignmentLog(
        {
          deliveryId,
          courierId: courier.id,
          status: "ACCEPTED",
        },
        tx,
      );

      await courierRepo.setOnDelivery(courier.id, tx);

      return deliveryRepo.updateStatus(deliveryId, "ASSIGNED", tx);
    });

    await publishDeliveryAccepted(this.buildDeliveryPayload(updated, courier));

    return {
      success: true,
      deliveryId,
      status: updated.status,
      paymentStatus: updated.paymentStatus,
    };
  }

  async assignDelivery(deliveryId: string) {
    const result = await prisma.$transaction(async (tx) => {
      const delivery = await deliveryRepo.lockDelivery(deliveryId, tx);

      if (!delivery) throw new Error("Delivery not found");

      if (delivery.status !== "PENDING") {
        return { skipped: true as const };
      }

      if ((delivery.attemptCount || 0) >= MAX_ATTEMPT) {
        await deliveryRepo.updateStatus(delivery.id, "CANCELLED", tx);
        return { failed: true as const, reason: "Max attempt reached" };
      }

      const rejectedCourierIds = await deliveryRepo.getRejectedCourierIds(
        delivery.id,
        tx,
      );

      let candidateCourierIds: string[] = [];

      if (delivery.pickupLatitude && delivery.pickupLongitude) {
        const nearbyIds = await findNearestCouriers(
          delivery.pickupLatitude,
          delivery.pickupLongitude,
          5,
          20,
        );

        const availableIds = await filterAvailableCouriers(
          nearbyIds as string[],
        );

        candidateCourierIds = availableIds.filter(
          (id) => !rejectedCourierIds.includes(id),
        );
      }

      if (!candidateCourierIds.length) {
        const fallbackCouriers =
          await courierRepo.findAvailableCouriersWithLock(
            {
              limit: 10,
              excludeIds: rejectedCourierIds,
            },
            tx,
          );

        candidateCourierIds = fallbackCouriers.map((c) => c.id);
      }

      if (!candidateCourierIds.length) {
        await deliveryRepo.incrementAttempt(delivery.id, tx);
        throw new Error("No available couriers");
      }

      const couriers = await courierRepo.findByIdsWithLockOrdered(
        candidateCourierIds,
        tx,
      );

      for (const courier of couriers) {
        if (courier.status !== "ONLINE") continue;

        try {
          const assigned = await deliveryRepo.assignCourier(
            delivery.id,
            courier.id,
            tx,
          );

          // await courierRepo.setOnDelivery(courier.id, tx);

          await deliveryRepo.createAssignmentLog(
            {
              deliveryId: delivery.id,
              courierId: courier.id,
              status: "ASSIGNED",
            },
            tx,
          );

          await deliveryRepo.incrementAttempt(delivery.id, tx);
          await deliveryRepo.updateLastAssignedAt(delivery.id, tx);

          return {
            success: true as const,
            courierId: courier.id,
            courierUserId: courier.userId as string,
            delivery: assigned,
          };
        } catch {
          continue;
        }
      }

      await deliveryRepo.incrementAttempt(delivery.id, tx);
      throw new Error("Failed to assign courier");
    });

    if (result.success) {
      await scheduleAssignmentTimeout(deliveryId);

      await publishDeliveryEvent({
        ...this.buildDeliveryPayload(result.delivery, {
          id: result.courierId,
          userId: result.courierUserId,
        }),
        status: "ASSIGNED",
        courierId: result.courierId,
        courierUserId: result.courierUserId,
      });
    }

    if (result.failed) {
      const delivery = await deliveryRepo.findByIdPublic(deliveryId);
      if (delivery) {
        publishDeliveryEvent({
          ...this.buildDeliveryPayload(delivery),
          status: "CANCELLED",
        });
      }
    }

    return result;
  }

  async rejectDelivery(deliveryId: string, userId: string) {
    const { courier } = await this.requireAssignedCourier(deliveryId, userId);

    await prisma.$transaction(async (tx) => {
      const delivery = await deliveryRepo.lockDelivery(deliveryId, tx);
      if (!delivery) throw new Error("Delivery not found");

      await deliveryRepo.createAssignmentLog(
        {
          deliveryId,
          courierId: courier.id,
          status: "REJECTED",
        },
        tx,
      );

      await deliveryRepo.addRejectedCourier(deliveryId, courier.id, tx);
      await courierRepo.setOnline(courier.id, tx);
      await deliveryRepo.resetToPending(deliveryId, tx);
    });

    await cancelAssignmentTimeout(deliveryId);
    await dispatchAssignDelivery(deliveryId);

    return { success: true };
  }

  async handleAssignmentTimeout(deliveryId: string) {
    const reassign = await prisma.$transaction(async (tx) => {
      const delivery = await deliveryRepo.lockDelivery(deliveryId, tx);
      if (!delivery || delivery.status !== "ASSIGNED") return false;

      await deliveryRepo.createAssignmentLog(
        {
          deliveryId,
          courierId: delivery.courierId!,
          status: "TIMEOUT",
        },
        tx,
      );

      await deliveryRepo.addRejectedCourier(
        deliveryId,
        delivery.courierId!,
        tx,
      );

      await courierRepo.setOnline(delivery.courierId!, tx);
      await deliveryRepo.resetToPending(deliveryId, tx);

      return true;
    });

    if (reassign) {
      await dispatchAssignDelivery(deliveryId);
    }

    return { reassign };
  }

  async markPickedUp(deliveryId: string, userId: string) {
    const { courier, delivery } = await this.requireAssignedCourier(
      deliveryId,
      userId,
    );

    if (delivery.status !== "ASSIGNED") {
      throw new Error("Delivery must be assigned before pickup");
    }

    if (delivery.paymentStatus !== "PAID") {
      throw new Error("Delivery must be paid before pickup");
    }

    if (courier.status !== "ON_DELIVERY") {
      throw new Error("Courier has not accepted this delivery");
    }

    await cancelAssignmentTimeout(deliveryId);

    const updated = await prisma.$transaction(async (tx) =>
      deliveryRepo.markPickedUp(deliveryId, tx),
    );

    await publishDeliveryEvent({
      ...this.buildDeliveryPayload(updated, courier),
      status: "PICKED_UP",
    });

    return updated;
  }

  async markOnTheWay(deliveryId: string, userId: string) {
    const { courier, delivery } = await this.requireAssignedCourier(
      deliveryId,
      userId,
    );

    if (delivery.status !== "PICKED_UP") {
      throw new Error("Delivery must be picked up first");
    }

    const updated = await prisma.$transaction(async (tx) =>
      deliveryRepo.markOnTheWay(deliveryId, tx),
    );

    await publishDeliveryEvent({
      ...this.buildDeliveryPayload(updated, courier),
      status: "ON_THE_WAY",
    });

    return updated;
  }

  async markDelivered(deliveryId: string, userId: string) {
    const { courier, delivery } = await this.requireAssignedCourier(
      deliveryId,
      userId,
    );

    if (!["PICKED_UP", "ON_THE_WAY"].includes(delivery.status)) {
      throw new Error("Invalid delivery status for completion");
    }

    const updated = await prisma.$transaction(async (tx) => {
      const result = await deliveryRepo.markDelivered(deliveryId, tx);
      await courierRepo.setOnline(courier.id, tx);
      await courierRepo.incrementTrips(courier.id, tx);

      const now = new Date();
      const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      await earningsRepo.createOrUpdatePeriod(
        courier.id,
        periodStart,
        periodEnd,
        DEFAULT_COURIER_EARNING,
      );

      return result;
    });

    await this.releaseCourierEarning(deliveryId);

    await publishDeliveryEvent({
      ...this.buildDeliveryPayload(updated, courier),
      status: "DELIVERED",
    });

    return updated;
  }

  async verifyDeliveryStreamAccess(deliveryId: string, requestUserId: string) {
    const delivery = await deliveryRepo.findByIdPublic(deliveryId);

    if (!delivery) {
      throw new NotFoundError("Delivery not found");
    }

    const isCustomer = delivery.userId === requestUserId;

    let isCourier = false;

    if (delivery.courierId) {
      const courier = await courierRepo.findById(delivery.courierId);

      isCourier = courier?.userId === requestUserId;
    }

    if (isCustomer || isCourier) {
      return {
        authorized: true,
        deliveryId: delivery.id,
      };
    }

    const isAdmin = await userRoleRepo.hasRole({
      userId: requestUserId,
      role: "ADMIN",
    });

    if (!isAdmin) {
      throw new ForbiddenError(
        "You are not allowed to access this delivery stream",
      );
    }

    return {
      authorized: true,
      deliveryId: delivery.id,
    };
  }

  async payDelivery(deliveryId: string, userId: string, pin: string) {
    return prisma.$transaction(async (tx) => {
      const delivery = await deliveryRepo.findByIdPublic(deliveryId, tx);

      if (!delivery) {
        throw new NotFoundError("Delivery not found");
      }

      if (delivery.userId !== userId) {
        throw new BadRequestError("You are not allowed to pay this delivery");
      }

      const user = await userRepo.findById(userId);

      if (!user) throw new NotFoundError("User not found");

      if (!user.biometricEnabled) {
        await userService.verifyPin(userId, pin);
      }

      if (delivery.paymentStatus === "PAID") {
        throw new BadRequestError("Delivery has already been paid");
      }

      if (delivery.status === "CANCELLED") {
        throw new BadRequestError("Cancelled delivery cannot be paid");
      }

      if (delivery.totalPrice <= 0) {
        throw new BadRequestError("Delivery price must be greater than zero");
      }

      const amount = delivery.totalPrice;

      const userBalance = await userBalanceRepo.getBalanceByUserId(userId, tx);

      if (!userBalance) {
        throw new BadRequestError("User wallet not found");
      }

      if (Number(userBalance) < amount) {
        throw new BadRequestError("Insufficient wallet balance");
      }

      await userBalanceRepo.decrementBalance(userId, amount, tx);

      const platformBalance = await platformBalanceRepo.findBalance(tx);

      if (!platformBalance) {
        throw new BadRequestError("Platform balance not found");
      }

      await platformBalanceRepo.incrementBalance(amount, tx);

      const userAccount = await accountRepo.findUserAccount(userId, tx);

      if (!userAccount) {
        throw new BadRequestError("User account not found");
      }

      await ledgerRepo.createEntry(
        {
          accountId: userAccount.id,
          type: LedgerDirection.CREDIT,
          amount,
          referenceType: "DELIVERY_PAYMENT",
          referenceId: delivery.id,
        },
        tx,
      );

      const platformAccount = await accountRepo.findPlatformAccount(tx);

      if (!platformAccount) {
        throw new BadRequestError("Platform account not found");
      }

      await ledgerRepo.createEntry(
        {
          accountId: userAccount.id,
          type: LedgerDirection.DEBIT,
          amount,
          referenceType: "DELIVERY_PAYMENT",
          referenceId: delivery.id,
        },
        tx,
      );

      const updatedDelivery = await tx.delivery.update({
        where: {
          id: delivery.id,
        },
        data: {
          paymentStatus: DeliveryPaymentStatus.PAID,
        },
      });

      return {
        success: true,
        deliveryId: updatedDelivery.id,
        paymentStatus: updatedDelivery.paymentStatus,
        amount,
      };
    });
  }

  async releaseCourierEarning(deliveryId: string) {
    return prisma.$transaction(async (tx) => {
      const delivery = await deliveryRepo.findByIdPublic(deliveryId, tx);

      if (!delivery) {
        throw new NotFoundError("Delivery not found");
      }

      if (delivery.status !== "DELIVERED") {
        throw new BadRequestError(
          "Courier earning can only be released after delivery is completed",
        );
      }

      if (!delivery.courierId) {
        throw new BadRequestError("Delivery has no courier");
      }

      if (delivery.paymentStatus !== "PAID") {
        throw new BadRequestError("Delivery has not been paid");
      }

      const amount = delivery.totalPrice;

      const platformBalance = await platformBalanceRepo.findBalance(tx);

      if (!platformBalance) {
        throw new BadRequestError("Platform balance not found");
      }

      if (Number(platformBalance.balance) < amount) {
        throw new BadRequestError("Insufficient platform balance");
      }

      await platformBalanceRepo.incrementBalance(amount, tx);

      let courierBalance = await tx.courierBalance.findUnique({
        where: {
          courierId: delivery.courierId,
        },
      });

      if (!courierBalance) {
        courierBalance = await tx.courierBalance.create({
          data: {
            courierId: delivery.courierId,
            balance: amount,
          },
        });
      } else {
        await tx.courierBalance.update({
          where: {
            courierId: delivery.courierId,
          },
          data: {
            balance: {
              increment: amount,
            },
          },
        });
      }

      const courierAccount = await accountRepo.findCourierAccount(
        delivery.courierId,
      );

      if (!courierAccount) {
        throw new BadRequestError("Courier account not found");
      }

      await ledgerRepo.createEntry(
        {
          accountId: courierAccount.id,
          type: LedgerDirection.CREDIT,
          amount,
          referenceType: "DELIVERY_EARNING",
          referenceId: delivery.id,
        },
        tx,
      );

      const platformAccount = await accountRepo.findPlatformAccount(tx);

      if (!platformAccount) {
        throw new BadRequestError("Platform account not found");
      }

      await ledgerRepo.createEntry(
        {
          accountId: platformAccount.id,
          type: LedgerDirection.DEBIT,
          amount,
          referenceType: "DELIVERY_EARNING",
          referenceId: delivery.id,
        },
        tx,
      );

      const now = new Date();

      const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);

      const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      const existingEarning = await tx.courierEarnings.findFirst({
        where: {
          courierId: delivery.courierId,
          periodStart,
          periodEnd,
        },
      });

      if (existingEarning) {
        await tx.courierEarnings.update({
          where: {
            id: existingEarning.id,
          },
          data: {
            totalTrips: {
              increment: 1,
            },
            totalEarnings: {
              increment: amount,
            },
          },
        });
      } else {
        await tx.courierEarnings.create({
          data: {
            courierId: delivery.courierId,
            periodStart,
            periodEnd,
            totalTrips: 1,
            totalEarnings: amount,
          },
        });
      }

      return {
        success: true,
        deliveryId: delivery.id,
        courierId: delivery.courierId,
        amount,
      };
    });
  }
}
