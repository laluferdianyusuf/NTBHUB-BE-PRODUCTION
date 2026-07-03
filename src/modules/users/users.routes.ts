import { Router } from "express";
import { upload } from "middlewares/upload";
import { UsersController } from "./users.controller";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyForgotPasswordSchema,
} from "modules/auth/auth.validation";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";
import { validate } from "shared/validation/validate";

const router = Router();

router.get(
  "/all-users",
  auth.authenticate,
  asyncHandler(UsersController.findAllUsers),
);

router.get(
  "/all-top-spender",
  auth.authenticate,
  asyncHandler(UsersController.findTopSpender),
);

router.get("/detail-user/:userId", asyncHandler(UsersController.findUserById));

router.patch(
  "/manage-profile",
  auth.authenticate,
  upload.single("image"),
  asyncHandler(UsersController.updateUser),
);

router.patch(
  "/change-password",
  auth.authenticate,
  validate({ body: changePasswordSchema }),
  asyncHandler(UsersController.changePassword),
);

router.post(
  "/forgot-password",
  validate({ body: forgotPasswordSchema }),
  asyncHandler(UsersController.forgotPassword),
);

router.post(
  "/verify/forgot-password",
  validate({ body: verifyForgotPasswordSchema }),
  asyncHandler(UsersController.verifyForgotPasswordPin),
);

router.post(
  "/reset-password",
  validate({ body: resetPasswordSchema }),
  asyncHandler(UsersController.resetPassword),
);

router.delete(
  "/delete-user/:id",
  auth.authenticate,
  auth.authorizeGlobalRole(["ADMIN"]),
  asyncHandler(UsersController.deleteUser),
);

export default router;
