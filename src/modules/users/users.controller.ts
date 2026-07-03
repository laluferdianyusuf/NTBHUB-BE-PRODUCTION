import { Request, Response } from "express";
import { getClientIp } from "helpers/getClientIp";
import { UserService } from "modules/users/users.service";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";

const userService = new UserService();

export class UsersController {
  static async findUserById(req: Request, res: Response) {
    const data = await runService(() =>
      userService.getUserById(req.params.userId),
    );
    return sendSuccess(res, data, "User retrieved");
  }

  static async findAllUsers(req: Request, res: Response) {
    const { search, limit, page, pageSize } = req.query;

    const users = await runService(() =>
      userService.findAllUsers({
        search: search as string,
        limit: limit ? Number(limit) : undefined,
        page: page ? Number(page) : undefined,
        pageSize: pageSize ? Number(pageSize) : undefined,
      }),
    );

    return sendSuccess(res, users, "Users retrieved");
  }

  static async findTopSpender(req: Request, res: Response) {
    const { limit, page, pageSize } = req.query;

    const result = await runService(() =>
      userService.getUserTopSpender({
        limit: limit ? Number(limit) : undefined,
        page: page ? Number(page) : undefined,
        pageSize: pageSize ? Number(pageSize) : undefined,
      }),
    );

    return sendSuccess(res, result, "User top spender");
  }

  static async updateUser(req: Request, res: Response) {
    const userId = req.user!.id;
    const user = await runService(() =>
      userService.updateUser(userId, req.body, req.file),
    );
    return sendSuccess(res, user, "Update successful");
  }

  static async changePassword(req: Request, res: Response) {
    const userId = req.user!.id;
    const { oldPassword, newPassword } = req.body;

    const user = await runService(() =>
      userService.changePassword(userId, { oldPassword, newPassword }),
    );
    return sendSuccess(res, user, "Change password successful");
  }

  static async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    const ip = getClientIp(req);

    const result = await runService(() => userService.forgotPassword(email, ip));
    return sendSuccess(
      res,
      result,
      "If the email exists, a reset form has been sent",
    );
  }

  static async verifyForgotPasswordPin(req: Request, res: Response) {
    const { userId, pin } = req.body;
    const result = await runService(() =>
      userService.verifyForgotPasswordPin(userId, pin),
    );
    return sendSuccess(res, result, "Pin verified");
  }

  static async resetPassword(req: Request, res: Response) {
    const { resetToken, newPassword } = req.body;
    await runService(() => userService.resetPassword(resetToken, newPassword));
    return sendSuccess(res, null, "Reset password successful");
  }

  static async deleteUser(req: Request, res: Response) {
    const user = await runService(() => userService.deleteUser(req.params.id));
    return sendSuccess(res, user, "User deleted successfully");
  }
}
