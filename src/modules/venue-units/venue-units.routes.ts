import { VenueUnitControllers } from "modules/venue-units/venue-units.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();

const venueUnitController = new VenueUnitControllers();

router.post("/create", auth.authenticate, asyncHandler(VenueUnitControllers.createVenueUnit),
);

router.post("/bulk-create", auth.authenticate, asyncHandler(VenueUnitControllers.bulkCreateVenueUnit),
);

router.get("/by-service/:serviceId", auth.authenticate, asyncHandler(VenueUnitControllers.getUnitByService),
);

router.get("/by-venue/:venueId", auth.authenticate, asyncHandler(VenueUnitControllers.getUnitByVenue),
);

router.get("/all/:venueId", auth.authenticate, asyncHandler(VenueUnitControllers.getAllUnits),
);

router.get("/summary/:serviceId", auth.authenticate, asyncHandler(VenueUnitControllers.getSummary),
);

router.get("/availability/:venueId", auth.authenticate, asyncHandler(VenueUnitControllers.getAvailabilityUnits),
);

router.get("/detail/:id", auth.authenticate, asyncHandler(VenueUnitControllers.getDetailUnit),
);

router.put("/update/:id", auth.authenticate, asyncHandler(VenueUnitControllers.updateVenueUnit),
);

router.patch("/toggle-status/:id", auth.authenticate, asyncHandler(VenueUnitControllers.toggleStatus),
);

router.delete("/delete/:id", auth.authenticate, asyncHandler(VenueUnitControllers.deactivateVenueUnit),
);

export default router;
