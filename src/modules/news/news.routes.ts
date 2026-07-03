import { NewsController } from "modules/news/news.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();

router.post("/create-news", auth.authenticate, asyncHandler(NewsController.createNews),
);
router.post("/create-comment", auth.authenticate, asyncHandler(NewsController.createComment),
);
router.post("/create-impression/:newsId", auth.authenticate, asyncHandler(NewsController.createImpression),
);
router.get("/all-news", asyncHandler(NewsController.findAllNews));
router.get("/all-comments/:newsId", asyncHandler(NewsController.getAllComments),
);
router.get("/detail-news/:id", asyncHandler(NewsController.findNewsById),
);

export default router;
