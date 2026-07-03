import { CommunityPostController } from "modules/community-post/community-post.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";

import { upload } from "middlewares/upload";

const router = Router();

router.get("/list/:communityId", auth.authenticate, asyncHandler(CommunityPostController.getPosts),
);

router.post(
  "/create/:communityId",
  upload.single("image"),
  auth.authenticate,
  asyncHandler(CommunityPostController.addPost),
);

router.put("/update/:postId", auth.authenticate, asyncHandler(CommunityPostController.updatePost),
);

router.delete("/delete/:postId", auth.authenticate, asyncHandler(CommunityPostController.deletePost),
);

export default router;
