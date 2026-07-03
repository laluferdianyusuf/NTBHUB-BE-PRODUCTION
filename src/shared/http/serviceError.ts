import { AppError, ForbiddenError, NotFoundError, UnauthorizedError } from "shared/errors";

const UNAUTHORIZED_MESSAGES = new Set([
  "Unauthorized",
  "Invalid password",
  "Invalid refresh token",
  "Missing refresh token",
  "Token revoked",
]);

const NOT_FOUND_MESSAGES = new Set([
  "User not found",
  "Invalid google token",
]);

/** Maps legacy `throw new Error(...)` from services to typed HTTP errors. */
export const mapServiceError = (error: unknown): never => {
  if (error instanceof AppError) {
    throw error;
  }

  if (error instanceof Error) {
    const message = error.message;

    if (NOT_FOUND_MESSAGES.has(message)) {
      throw new NotFoundError(message);
    }

    if (UNAUTHORIZED_MESSAGES.has(message)) {
      throw new UnauthorizedError(message);
    }

    if (message === "Forbidden" || message.startsWith("Forbidden")) {
      throw new ForbiddenError(message);
    }

    throw new AppError(message, 400);
  }

  throw error;
};

export const runService = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    mapServiceError(error);
  }
};
