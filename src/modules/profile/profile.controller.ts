import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";

import { ProfileService } from "modules/profile/profile.service";

const service = new ProfileService();

export class ProfileController {
  static async getProfile(req: Request, res: Response) {      const profileId = req.params.id;
      const viewerId = req.user?.id;

      const profile = await runService(() => service.getProfile(profileId, viewerId));
      return sendSuccess(res, profile);
    
  }

  static async viewProfile(req: Request, res: Response) {      const profileId = req.params.id;
      const viewerId = req.user?.id;

      await runService(() => service.viewProfile(profileId, viewerId));

      return sendSuccess(res, "Profile viewed");
    
  }

  static async toggleLike(req: Request, res: Response) {      const profileId = req.params.id;
      const userId = req.user?.id;

      const result = await runService(() => service.toggleLike(profileId, String(userId)));

      return sendSuccess(res, result, "Profile liked");
    
  }
}
