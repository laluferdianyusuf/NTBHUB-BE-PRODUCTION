import { Prisma } from "@prisma/client";

import { prisma } from "config/prisma";

export class DeviceRepository {
  // Create device baru
  async create(data: Prisma.DeviceCreateInput) {
    return prisma.device.create({ data });
  }

  async registerDevice(data: {
    token: string;
    expoToken: string;
    platform?: string;
    osName?: string;
    buildId?: string;
    lastActiveAt?: string;
    osVersion?: string;
    deviceModel?: string;
    deviceId: string;
    userId?: string; // optional
    venueId?: string;
  }) {
    return prisma.device.upsert({
      where: {
        userId_deviceId: {
          userId: data.userId,
          deviceId: data.deviceId,
        },
      },
      update: {
        userId: data.userId,
        venueId: data.venueId,
        token: data.token,
        expoToken: data.expoToken,
        platform: data.platform,
        deviceId: data.deviceId,
        deviceModel: data.deviceModel,
        buildId: data.buildId,
        lastActiveAt: data.lastActiveAt,
        osName: data.osName,
        osVersion: data.osVersion,
        updatedAt: new Date(),
      },
      create: {
        userId: data.userId,
        venueId: data.venueId,
        token: data.token,
        expoToken: data.expoToken,
        platform: data.platform,
        deviceId: data.deviceId,
        deviceModel: data.deviceModel,
        buildId: data.buildId,
        lastActiveAt: data.lastActiveAt,
        osName: data.osName,
        osVersion: data.osVersion,
      },
    });
  }

  async findByUserId(userId: string) {
    return prisma.device.findMany({
      where: { userId },
    });
  }

  async findByVenueId(venueId: string) {
    return prisma.device.findMany({
      where: { venueId },
    });
  }

  async deleteByToken(token: string) {
    return prisma.device.deleteMany({ where: { token } });
  }

  async findAllForPush() {
    return prisma.device.findMany({
      where: { expoToken: { not: null } },
    });
  }
}
