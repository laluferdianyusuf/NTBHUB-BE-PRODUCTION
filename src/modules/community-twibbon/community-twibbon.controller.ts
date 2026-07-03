import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { CommunityTwibbonService } from "modules/community-twibbon/community-twibbon.service";


const service = new CommunityTwibbonService();

export class CommunityTwibbonController {
  static getActive = async (req: Request, res: Response) => {      const { communityId } = req.params;

      const data = await runService(() => service.getActiveTwibbons(communityId));

      return sendSuccess(res, data, "Twibbons fetched");
    
  };

  static create = async (req: Request, res: Response) => {      const { communityId } = req.params;
      const userId = req.user?.id;
      const image = req.file;

      const data = {
        title: req.body.title,
        description: req.body.description,
      };

      const twibbon = await runService(() => service.createTwibbon(
        communityId,
        String(userId),
        data,
        image as Express.Multer.File,
      ));

      return sendSuccess(res, twibbon, "Twibbon created", 201);
    
  };

  static update = async (req: Request, res: Response) => {      const { twibbonId } = req.params;

      const twibbon = await runService(() => service.updateTwibbon(twibbonId, req.body));

      return sendSuccess(res, twibbon, "Twibbon updated");
    
  };

  static delete = async (req: Request, res: Response) => {      const { twibbonId } = req.params;

      await runService(() => service.deleteTwibbon(twibbonId));

      return sendSuccess(res, null, "Twibbon deleted");
    
  };
}
