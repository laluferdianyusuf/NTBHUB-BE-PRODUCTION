import { CommunityController } from "modules/community/community.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";

import { upload } from "middlewares/upload";

const router = Router();

router.post(
  "/create-community",
  auth.authenticate,
  upload.single("image"),
  asyncHandler(CommunityController.createCommunity),
);

router.get("/list/:userId", auth.authenticate, asyncHandler(CommunityController.findAll),
);

router.get("/list-public", auth.authenticate, asyncHandler(CommunityController.findAllPublic),
);

router.get("/detail/:id", auth.authenticate, asyncHandler(CommunityController.findById),
);

router.put("/update/:id", auth.authenticate, asyncHandler(CommunityController.update),
);

router.delete("/delete/:id", auth.authenticate, asyncHandler(CommunityController.delete),
);

router.get("/members/:id", auth.authenticate, asyncHandler(CommunityController.getMembers),
);

export default router;
