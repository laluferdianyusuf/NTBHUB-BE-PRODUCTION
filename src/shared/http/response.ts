import { Response } from "express";

export interface ApiResponse<T = unknown> {
  status: boolean;
  status_code: number;
  message: string;
  data?: T;
}

export const sendSuccess = <T = unknown>(
  res: Response,
  data: T,
  message = "Success",
  statusCode = 200,
) =>
  res.status(statusCode).json({
    status: true,
    status_code: statusCode,
    message,
    data,
  } satisfies ApiResponse<T>);

export const sendError = (
  res: Response,
  message = "Error",
  statusCode = 400,
  data: unknown = null,
) =>
  res.status(statusCode).json({
    status: false,
    status_code: statusCode,
    message,
    ...(data !== null ? { data } : {}),
  } satisfies ApiResponse);
