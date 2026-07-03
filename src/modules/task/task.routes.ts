import { TaskController } from "modules/task/task.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();

router.post("/create", auth.authenticate, asyncHandler(TaskController.create),
);
router.post("/generate/:taskId/qr", auth.authenticate, asyncHandler(TaskController.generateQr),
);
router.post("/verify", auth.authenticate, asyncHandler(TaskController.verify),
);

router.get("/list-tasks", auth.authenticate, asyncHandler(TaskController.findAllWithStatus),
);

router.get("/all/list-tasks", auth.authenticate, asyncHandler(TaskController.findAll),
);

export default router;
