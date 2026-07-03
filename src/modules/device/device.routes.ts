import { DeviceController } from "modules/device/device.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();

router.post("/register", auth.authenticate, asyncHandler(DeviceController.registerDevice),
);
router.get("/get/byUser/:userId", auth.authenticate, asyncHandler(DeviceController.getUserDevices),
);

export default router;
