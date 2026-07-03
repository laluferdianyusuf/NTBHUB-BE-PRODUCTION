import { MenuControllers } from "modules/menu/menu.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";

import { upload } from "middlewares/upload";

const router = Router();

const menuController = new MenuControllers();

router.get(
  "/all",
  auth.authenticate,
  auth.authorizeGlobalRole(["CUSTOMER"]),
  asyncHandler(MenuControllers.getAllMenus),
);
router.post(
  "/create/menu",
  auth.authenticate,
  upload.single("image"),
  asyncHandler(MenuControllers.createMenu),
);
router.post(
  "/create-menus",
  auth.authenticate,
  upload.array("images"),
  asyncHandler(MenuControllers.createManyMenus),
);
router.get(
  "/menu/venues/:venueId",
  auth.authenticate,
  // auth.authorizeGlobalRole(["CUSTOMER", "VENUE_OWNER"]),
  asyncHandler(MenuControllers.getMenuByVenueId),
);
router.get("/menu/:id", asyncHandler(MenuControllers.getMenuById));
router.put("/menu/:id", auth.authenticate, upload.single("image"), asyncHandler(MenuControllers.updateMenu),
);
router.delete("/menu/:id", auth.authenticate, asyncHandler(MenuControllers.deleteMenu),
);

router.put("/available/:id", auth.authenticate, asyncHandler(MenuControllers.toggleMenuStatus),
);

export default router;
