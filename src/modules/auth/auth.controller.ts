import { Request, Response } from "express";
import { getClientIp } from "helpers/getClientIp";
import { UserService } from "modules/users/users.service";
import {
  ForbiddenError,
  UnauthorizedError,
  ValidationError,
} from "shared/errors";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";

const userService = new UserService();

const assertSelf = (req: Request, targetUserId: string) => {
  if (req.user?.id !== targetUserId) {
    throw new ForbiddenError();
  }
};

export class AuthController {
  static async register(req: Request, res: Response) {
    const result = await runService(() =>
      userService.register({
        email: req.body.email,
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        file: req.file,
      }),
    );

    return sendSuccess(res, result, "User registered successfully", 201);
  }

  static async registerAdmin(req: Request, res: Response) {
    const secretKey =
      (req.headers["x-admin-secret"] as string | undefined) ??
      req.body.secretKey;

    const result = await runService(() =>
      userService.registerAdmin(
        {
          email: req.body.email,
          name: req.body.name,
          username: req.body.username,
          password: req.body.password,
          file: req.file,
        },
        secretKey,
      ),
    );

    return sendSuccess(res, result, "Admin registered successfully", 201);
  }

  static async verifyPinEmail(req: Request, res: Response) {
    const { userId, pin } = req.body;
    const result = await runService(() =>
      userService.verifyPinEmail(userId, pin),
    );
    return sendSuccess(res, result, "Email verified");
  }

  static async resendVerification(req: Request, res: Response) {
    const { email } = req.body;
    const ip = getClientIp(req);
    const result = await runService(() =>
      userService.resendVerification(email, ip),
    );
    return sendSuccess(res, result, "Verification resent");
  }

  static async login(req: Request, res: Response) {
    const result = await runService(() =>
      userService.login(req.body.email, req.body.password),
    );
    return sendSuccess(res, result, "Login successful");
  }

  static async googleLogin(req: Request, res: Response) {
    const result = await runService(() =>
      userService.googleLogin(req.body.idToken),
    );
    return sendSuccess(res, result, "Google login successful");
  }

  static async refreshToken(req: Request, res: Response) {
    const result = await runService(() =>
      userService.refresh(req.body.refreshToken),
    );
    return sendSuccess(res, result, "Token refreshed");
  }

  static async me(req: Request, res: Response) {
    if (!req.user?.id) {
      throw new UnauthorizedError();
    }

    const data = await runService(() =>
      userService.getCurrentUser(req.user!.id),
    );
    return sendSuccess(res, data, "User retrieved");
  }

  static async setTransactionPin(req: Request, res: Response) {
    assertSelf(req, req.params.id);
    const { pin } = req.body;

    await runService(() =>
      userService.setTransactionPin(req.user!.id, String(pin)),
    );
    return sendSuccess(res, null, "Pin set");
  }

  static async setBiometric(req: Request, res: Response) {
    assertSelf(req, req.params.id);
    const { biometric } = req.body;

    await runService(() =>
      userService.setBiometric(req.user!.id, Boolean(biometric)),
    );
    return sendSuccess(res, null, "Biometric changed");
  }

  static async verifyPin(req: Request, res: Response) {
    assertSelf(req, req.params.id);
    const { pin } = req.body;

    await runService(() =>
      userService.verifyPin(req.user!.id, String(pin)),
    );
    return sendSuccess(res, null, "Pin verified");
  }
}
