import { CommunityReactionController } from "modules/community-reaction/community-reaction.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();

router.get("/list/:postId", auth.authenticate, asyncHandler(CommunityReactionController.getReactions),
);

router.post("/add/:postId", auth.authenticate, asyncHandler(CommunityReactionController.addReaction),
);

router.delete("/remove/:reactionId", auth.authenticate, asyncHandler(CommunityReactionController.removeReaction),
);

export default router;
