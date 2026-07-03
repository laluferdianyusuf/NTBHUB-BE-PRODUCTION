import { Router } from "express";
import { upload } from "middlewares/upload";
import { AuthController } from "./auth.controller";
import {
  googleLoginSchema,
  loginSchema,
  refreshTokenSchema,
  registerSchema,
  resendVerificationSchema,
  setBiometricSchema,
  setPinSchema,
  verifyEmailSchema,
  verifyPinSchema,
} from "./auth.validation";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";
import { validate } from "shared/validation/validate";

const router = Router();

router.post(
  "/register",
  upload.single("image"),
  validate({ body: registerSchema }),
  asyncHandler(AuthController.register),
);

router.post(
  "/register-admin",
  upload.single("image"),
  asyncHandler(AuthController.registerAdmin),
);

router.post(
  "/login",
  validate({ body: loginSchema }),
  asyncHandler(AuthController.login),
);

router.post(
  "/refresh",
  validate({ body: refreshTokenSchema }),
  asyncHandler(AuthController.refreshToken),
);

router.post(
  "/verify-email",
  validate({ body: verifyEmailSchema }),
  asyncHandler(AuthController.verifyPinEmail),
);

router.post(
  "/resend-verification",
  validate({ body: resendVerificationSchema }),
  asyncHandler(AuthController.resendVerification),
);

router.post(
  "/google",
  validate({ body: googleLoginSchema }),
  asyncHandler(AuthController.googleLogin),
);

router.get("/me", auth.authenticate, asyncHandler(AuthController.me));

router.post(
  "/set-pin/:id",
  auth.authenticate,
  auth.authorizeGlobalRole(["CUSTOMER"]),
  validate({ body: setPinSchema }),
  asyncHandler(AuthController.setTransactionPin),
);

router.post(
  "/set-biometric/:id",
  auth.authenticate,
  auth.authorizeGlobalRole(["CUSTOMER"]),
  validate({ body: setBiometricSchema }),
  asyncHandler(AuthController.setBiometric),
);

router.post(
  "/verify-pin/:id",
  auth.authenticate,
  auth.authorizeGlobalRole(["CUSTOMER"]),
  validate({ body: verifyPinSchema }),
  asyncHandler(AuthController.verifyPin),
);

export default router;
