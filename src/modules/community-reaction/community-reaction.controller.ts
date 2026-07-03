import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { CommunityReactionServices } from "modules/community-reaction/community-reaction.service";


const service = new CommunityReactionServices();

export class CommunityReactionController {
  static getReactions = async (req: Request, res: Response) => {      const { postId } = req.params;

      const reactions = await runService(() => service.getReactions(postId));

      return sendSuccess(res, reactions, "Reactions fetched successfully");
    
  };

  static addReaction = async (req: Request, res: Response) => {      const { postId } = req.params;
      const { type } = req.body;
      const userId = req.user?.id;

      const reaction = await runService(() => service.addReaction(
        postId,
        String(userId),
        type,
      ));

      return sendSuccess(res, reaction, "Reaction added successfully", 201);
    
  };

  static removeReaction = async (req: Request, res: Response) => {      const { reactionId } = req.params;

      await runService(() => service.removeReaction(reactionId));

      return sendSuccess(res, null, "Reaction removed successfully");
    
  };
}
