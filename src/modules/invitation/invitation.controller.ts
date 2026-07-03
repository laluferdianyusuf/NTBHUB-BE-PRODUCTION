import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { InvitationServices } from "./invitation.service";

const invitationServices = new InvitationServices();

export class InvitationController {
  static async generateInvitationKey(req: Request, res: Response) {
    const { email, venueId } = req.body;
    const result = await runService(() =>
      invitationServices.generateInvitationKey(email, venueId),
    );
    return sendSuccess(res, result, "Invitation created");
  }

  static async generateEventInvitationKey(req: Request, res: Response) {
    const { email, eventId } = req.body;
    const result = await runService(() =>
      invitationServices.generateEventInvitationKey(email, eventId),
    );
    return sendSuccess(res, result, "Invitation created");
  }

  static async generateCommunityInvitationKey(req: Request, res: Response) {
    const { email, communityId } = req.body;
    const result = await runService(() =>
      invitationServices.generateCommunityInvitation(email, communityId),
    );
    return sendSuccess(res, result, "Invitation created");
  }

  static async claimInvitation(req: Request, res: Response) {
    const result = await runService(() =>
      invitationServices.claimInvitation(req.body.key, String(req.user?.id)),
    );
    return sendSuccess(res, result, "Invitation claimed");
  }

  static async claimEventInvitation(req: Request, res: Response) {
    const result = await runService(() =>
      invitationServices.claimEventInvitation(req.body.key, String(req.user?.id)),
    );
    return sendSuccess(res, result, "Invitation claimed");
  }

  static async claimCommunityInvitation(req: Request, res: Response) {
    const result = await runService(() =>
      invitationServices.claimCommunityInvitation(req.body.key, String(req.user?.id)),
    );
    return sendSuccess(res, result, "Invitation claimed");
  }
}
