import { CommunityMemberController } from "modules/community-member/community-member.controller";
import { Router } from "express";
import { asyncHandler } from "shared/http/asyncHandler";
import { auth } from "shared/middleware/auth";


const router = Router();

router.post("/add/:communityId", auth.authenticate, asyncHandler(CommunityMemberController.addMember),
);

router.post("/request/:communityId", auth.authenticate, asyncHandler(CommunityMemberController.requestToJoinCommunity),
);

router.patch("/approve/:memberId", auth.authenticate, asyncHandler(CommunityMemberController.approveMember),
);

router.delete("/reject/:memberId", auth.authenticate, asyncHandler(CommunityMemberController.rejectMember),
);

export default router;
