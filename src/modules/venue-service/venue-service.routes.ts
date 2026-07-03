import { VenueServiceController } from "modules/venue-service/venue-service.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";

import { upload } from "middlewares/upload";

const router = Router();


router.post("/create", auth.authenticate, upload.single("image"), asyncHandler(VenueServiceController.createVenueService),
);

router.get("/by-venue/:venueId", auth.authenticate, asyncHandler(VenueServiceController.getServiceByVenue),
);

router.get("/services-venue/:venueId", auth.authenticate, asyncHandler(VenueServiceController.getAllServiceByVenue),
);

router.get("/summary/:venueId", auth.authenticate, asyncHandler(VenueServiceController.getSummary),
);

router.get("/detail/:id", auth.authenticate, asyncHandler(VenueServiceController.getDetailService),
);

router.put(
  "/update/:id",
  auth.authenticate,
  upload.single("image"),
  asyncHandler(VenueServiceController.updateVenueService),
);

router.patch("/toggle-status/:id", auth.authenticate, asyncHandler(VenueServiceController.toggleStatus),
);

router.delete("/deactivate/:id", auth.authenticate, asyncHandler(VenueServiceController.deactivateVenueService),
);

router.delete("/delete/:id", auth.authenticate, asyncHandler(VenueServiceController.deleteVenueService),
);

export default router;
