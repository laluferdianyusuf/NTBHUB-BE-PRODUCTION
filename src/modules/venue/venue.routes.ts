import { VenueControllers } from "modules/venue/venue.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";

import { upload } from "middlewares/upload";

const router = Router();

const venueController = new VenueControllers();

router.post(
  "/create-venue",
  auth.authenticate,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 5 },
  ]),
  asyncHandler(VenueControllers.createVenue),
);
router.get("/venue/venues", auth.authenticate, asyncHandler(VenueControllers.getVenues),
);
router.get("/customers/:venueId", auth.authenticate, asyncHandler(VenueControllers.getCustomers),
);
router.get("/venue/liked-byUser/:userId", auth.authenticate, asyncHandler(VenueControllers.getVenueLikedByUser),
);

router.get("/venue/popular/venues", auth.authenticate, asyncHandler(VenueControllers.getPopularVenues),
);

router.get("/active/venues", auth.authenticate, asyncHandler(VenueControllers.getActiveVenues),
);
router.get("/venue/:id", auth.authenticate, asyncHandler(VenueControllers.getVenueDetail),
);
router.put(
  "/venue/update/:id",
  auth.authenticate,
  auth.authorizeVenueRole(["VENUE_OWNER", "ADMIN"]),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 5 },
  ]),
  asyncHandler(VenueControllers.updateVenue),
);

router.delete(
  "/venue/delete/:id",
  auth.authenticate,
  auth.authorizeVenueRole(["VENUE_OWNER", "ADMIN"]),
  asyncHandler(VenueControllers.deleteVenue),
);

router.put("/activate/:id", auth.authenticate, asyncHandler(VenueControllers.activateVenue),
);

// interactions with venues
router.post("/venue/:venueId/like", auth.authenticate, asyncHandler(VenueControllers.toggleLike),
);
router.post("/venue/:venueId/impression", auth.authenticate, asyncHandler(VenueControllers.createImpression),
);

router.get("/venue/:venueId/likes/count", auth.authenticate, asyncHandler(VenueControllers.getLikeCount),
);
router.get("/venue/:venueId/impressions/count", asyncHandler(VenueControllers.getImpressionCount),
);

export default router;
