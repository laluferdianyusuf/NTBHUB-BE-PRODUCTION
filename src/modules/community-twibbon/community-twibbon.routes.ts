import { CommunityTwibbonController } from "modules/community-twibbon/community-twibbon.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";

import { upload } from "middlewares/upload";

const router = Router();

router.get("/list/:communityId", auth.authenticate, asyncHandler(CommunityTwibbonController.getActive),
);

router.post(
  "/create/:communityId",
  upload.single("image"),
  auth.authenticate,
  asyncHandler(CommunityTwibbonController.create),
);

router.put("/update/:twibbonId", auth.authenticate, asyncHandler(CommunityTwibbonController.update),
);

router.delete("/delete/:twibbonId", auth.authenticate, asyncHandler(CommunityTwibbonController.delete),
);

export default router;
