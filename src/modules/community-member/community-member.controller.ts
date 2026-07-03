import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { CommunityMemberRole } from "@prisma/client";
import { CommunityMemberServices } from "modules/community-member/community-member.service";


const service = new CommunityMemberServices();

export class CommunityMemberController {
  static addMember = async (req: Request, res: Response) => {      const { communityId } = req.params;
      const { userId, role } = req.body;

      const member = await runService(() => service.addMemberByAdmin(
        communityId,
        userId,
        role ?? CommunityMemberRole.MEMBER,
      ));

      return sendSuccess(res, member, "Member added successfully", 201);
    
  };

  static requestToJoinCommunity = async (req: Request, res: Response) => {      const { communityId } = req.params;
      const { userId } = req.body;

      const member = await runService(() => service.requestJoinCommunity(
        communityId,
        userId,
      ));

      return sendSuccess(res, member, "Request send", 201);
    
  };

  static approveMember = async (req: Request, res: Response) => {      const { memberId } = req.params;
      const adminId = req.user?.id;

      const result = await runService(() => service.approveMember(
        memberId,
        String(adminId),
      ));

      return sendSuccess(res, result, "Member approved successfully");
    
  };

  static rejectMember = async (req: Request, res: Response) => {      const { memberId } = req.params;
      const adminId = req.user?.id;

      const result = await runService(() => service.rejectMember(memberId, String(adminId)));

      return sendSuccess(res, result, "Member removed successfully");
    
  };
}
