import { Role } from "@prisma/client";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),

  deviceId: z.string().min(1, "Device ID is required"),

  token: z.string().optional(),
  expoToken: z.string().optional(),

  platform: z.enum(["android", "ios"]).optional(),

  osName: z.string().optional(),
  osVersion: z.string().optional(),
  deviceModel: z.string().optional(),
  buildId: z.string().optional(),
});

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(6),
  role: z.nativeEnum(Role).optional(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1),
});

export const verifyEmailSchema = z.object({
  userId: z.string().min(1),
  pin: z.string().min(4),
});

export const resendVerificationSchema = z.object({
  email: z.string().email(),
});

export const googleLoginSchema = z.object({
  idToken: z.string().min(1),

  deviceId: z.string().min(1, "Device ID is required"),

  token: z.string().optional(),
  expoToken: z.string().optional(),

  platform: z.enum(["android", "ios"]).optional(),
  osName: z.string().optional(),
  osVersion: z.string().optional(),
  deviceModel: z.string().optional(),
  buildId: z.string().optional(),
});

export const setPinSchema = z.object({
  pin: z.string().min(4).max(6),
});

export const setBiometricSchema = z.object({
  biometric: z.boolean(),
});

export const verifyPinSchema = z.object({
  pin: z.string().min(4).max(6),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const verifyForgotPasswordSchema = z.object({
  userId: z.string().min(1),
  pin: z.string().min(4),
});

export const resetPasswordSchema = z.object({
  resetToken: z.string().min(1),
  newPassword: z.string().min(6),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1),
  newPassword: z.string().min(6),
});
