import { NextFunction, Request, Response } from "express";
import { AppError } from "shared/errors";
import { sendError } from "shared/http/response";
import { logger } from "utils/logger";

export const notFoundHandler = (req: Request, res: Response) => {
  sendError(res, `Route ${req.method} ${req.originalUrl} not found`, 404);
};

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    return sendError(res, err.message, err.statusCode);
  }

  if (err instanceof Error) {
    logger.error("unhandled_error", {
      message: err.message,
      stack: err.stack,
    });
    return sendError(res, err.message || "Internal server error", 500);
  }

  logger.error("unknown_error", { err });
  return sendError(res, "Internal server error", 500);
};
