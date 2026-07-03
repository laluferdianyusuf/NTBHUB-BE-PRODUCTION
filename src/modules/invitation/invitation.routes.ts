import { InvitationController } from "modules/invitation/invitation.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();

router.post("/venue/create-invitation", auth.authenticate, asyncHandler(InvitationController.generateInvitationKey),
);

router.post("/event/create-invitation", auth.authenticate, asyncHandler(InvitationController.generateEventInvitationKey),
);

router.post("/community/create-invitation", auth.authenticate, asyncHandler(InvitationController.generateCommunityInvitationKey),
);

router.post("/venue/claim-invitation", auth.authenticate, asyncHandler(InvitationController.claimInvitation),
);

router.post("/event/claim-invitation", auth.authenticate, asyncHandler(InvitationController.claimEventInvitation),
);

router.post("/community/claim-invitation", auth.authenticate, asyncHandler(InvitationController.claimCommunityInvitation),
);

export default router;
