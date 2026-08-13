import { UserRepository } from "modules/users/users.repository";
import { LoginSessionRepository } from "./login-session.repository";

const loginSessionRepository = new LoginSessionRepository();
const userRepository = new UserRepository();

export class LoginSessionService {
  async createSession(data: {
    userId: string;
    deviceId: string;
    refreshTokenHash?: string;
    ipAddress?: string;
    userAgent?: string;
    expiresAt?: Date;
  }) {
    return await loginSessionRepository.create(data);
  }

  async getSessionById(sessionId: string, userId: string) {
    const session = await loginSessionRepository.findById(sessionId);

    if (!session) {
      throw new Error("Login session not found");
    }

    if (session.userId !== userId) {
      throw new Error("Unauthorized access to login session");
    }

    return session;
  }

  async getUserSessions(userId: string) {
    const user = await userRepository.findById(userId);

    if (!user) throw new Error("User not found");

    const sessions = await loginSessionRepository.findByUserId(userId);

    return sessions;
  }

  async getActiveSessions(userId: string) {
    return await loginSessionRepository.findActiveByUserId(userId);
  }

  async updateLastActive(sessionId: string, userId: string) {
    const session = await loginSessionRepository.findById(sessionId);

    if (!session) {
      throw new Error("Login session not found");
    }

    if (session.userId !== userId) {
      throw new Error("Unauthorized access to login session");
    }

    if (session.logoutAt) {
      throw new Error("Session has already been logged out");
    }

    if (session.revokedAt) {
      throw new Error("Session has been revoked");
    }

    return await loginSessionRepository.updateLastActive(sessionId);
  }

  async logoutSession(sessionId: string, userId: string) {
    const session = await loginSessionRepository.findById(sessionId);

    if (!session) {
      throw new Error("Login session not found");
    }

    if (session.userId !== userId) {
      throw new Error("Unauthorized access to login session");
    }

    if (session.logoutAt) {
      return session;
    }

    return await loginSessionRepository.logout(sessionId);
  }

  async revokeSession(sessionId: string, userId: string) {
    const session = await loginSessionRepository.findById(sessionId);

    if (!session) {
      throw new Error("Login session not found");
    }

    if (session.userId !== userId) {
      throw new Error("Unauthorized access to login session");
    }

    return await loginSessionRepository.revoke(sessionId);
  }

  async logoutAllOtherSessions(userId: string, currentSessionId: string) {
    return await loginSessionRepository.revokeAllByUserId(
      userId,
      currentSessionId,
    );
  }
}
