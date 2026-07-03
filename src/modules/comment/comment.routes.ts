import { CommentController } from "modules/comment/comment.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";




const router = Router();

router.get("/list/:entityType/:entityId", auth.authenticate, asyncHandler(CommentController.list),
);
router.post("/create", auth.authenticate, asyncHandler(CommentController.create));
router.post("/like/:commentId", auth.authenticate, asyncHandler(CommentController.like),
);
router.post("/report/:commentId", auth.authenticate, asyncHandler(CommentController.report),
);
router.delete("/delete/:commentId", auth.authenticate, asyncHandler(CommentController.delete),
);

export default router;
