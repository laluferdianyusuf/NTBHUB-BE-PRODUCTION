import { prisma } from "config/prisma";

export class LoginSessionRepository {
  async create(data: {
    userId: string;
    deviceId: string;
    refreshTokenHash?: string;
    ipAddress?: string;
    userAgent?: string;
    expiresAt?: Date;
  }) {
    return prisma.loginSession.create({
      data: {
        userId: data.userId,
        deviceId: data.deviceId,
        refreshTokenHash: data.refreshTokenHash,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        expiresAt: data.expiresAt,
      },
      include: {
        device: true,
      },
    });
  }

  async findById(id: string) {
    return prisma.loginSession.findUnique({
      where: {
        id,
      },
      include: {
        device: true,
      },
    });
  }

  async findByUserId(userId: string) {
    return prisma.loginSession.findMany({
      where: {
        userId,
      },
      include: {
        device: true,
      },
      orderBy: {
        loginAt: "desc",
      },
    });
  }

  async findActiveByUserId(userId: string) {
    return prisma.loginSession.findMany({
      where: {
        userId,
        logoutAt: null,
        revokedAt: null,
        OR: [
          {
            expiresAt: null,
          },
          {
            expiresAt: {
              gt: new Date(),
            },
          },
        ],
      },
      include: {
        device: true,
      },
      orderBy: {
        lastActiveAt: "desc",
      },
    });
  }

  async findByRefreshTokenHash(refreshTokenHash: string) {
    return prisma.loginSession.findFirst({
      where: {
        refreshTokenHash,
        logoutAt: null,
        revokedAt: null,
      },
      include: {
        device: true,
      },
    });
  }

  async updateLastActive(id: string) {
    return prisma.loginSession.update({
      where: {
        id,
      },
      data: {
        lastActiveAt: new Date(),
      },
    });
  }

  async logout(id: string) {
    return prisma.loginSession.update({
      where: {
        id,
      },
      data: {
        logoutAt: new Date(),
      },
    });
  }

  async revoke(id: string) {
    return prisma.loginSession.update({
      where: {
        id,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }

  async revokeAllByUserId(userId: string, exceptSessionId?: string) {
    return prisma.loginSession.updateMany({
      where: {
        userId,
        logoutAt: null,
        revokedAt: null,
        ...(exceptSessionId
          ? {
              id: {
                not: exceptSessionId,
              },
            }
          : {}),
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }

  async updateRefreshTokenHash(sessionId: string, refreshTokenHash: string) {
    return prisma.loginSession.update({
      where: {
        id: sessionId,
      },
      data: {
        refreshTokenHash,
        updatedAt: new Date(),
      },
    });
  }
}
