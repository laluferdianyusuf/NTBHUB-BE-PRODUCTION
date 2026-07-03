import { CommunityMemberStatus } from "@prisma/client";
import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";

import { CommunityService } from "modules/community/community.service";
import { createCommunitySchema } from "validations";

const service = new CommunityService();

export class CommunityController {
  static createCommunity = async (req: Request, res: Response) => {      const file = req.file;

      const validation = createCommunitySchema.safeParse(req.body);

      if (!validation.success) {
        throw new Error(validation.error.issues[0].message);
      }

      const result = await runService(() => service.createCommunity(validation.data, file));

      return sendSuccess(res, result, "Community created successfully", 201);
    
  };

  static findAllPublic = async (req: Request, res: Response) => {      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const search = req.query.search as string;

      const result = await runService(() => service.findAllPublic({ page, limit }, search));

      return sendSuccess(res, result, "Communities fetched successfully");
    
  };

  static findAll = async (req: Request, res: Response) => {      const { userId } = req.params;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const search = req.query.search as string;

      const result = await runService(() => service.findAll(
        userId,
        { page, limit },
        search,
      ));

      return sendSuccess(res, result, "Communities fetched successfully");
    
  };

  static findById = async (req: Request, res: Response) => {      const { id } = req.params;

      const community = await runService(() => service.findById(id));

      return sendSuccess(res, community, "Community fetched successfully");
    
  };

  static update = async (req: Request, res: Response) => {      const { id } = req.params;
      const { name, description } = req.body;

      const updated = await runService(() => service.update(id, {
        name,
        description,
      }));

      return sendSuccess(res, updated, "Community updated successfully");
    
  };

  static delete = async (req: Request, res: Response) => {      const { id } = req.params;

      await runService(() => service.delete(id));

      return sendSuccess(res, null, "Community deleted successfully");
    
  };

  static getMembers = async (req: Request, res: Response) => {      const { id: communityId } = req.params;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const search = req.query.search as string;
      const status = req.query.status as CommunityMemberStatus;

      const members = await runService(() => service.getMembers(
        communityId,
        {
          page,
          limit,
        },
        status,
        search,
      ));

      return sendSuccess(
        res,
        members,
        "Community members fetched successfully",
      );
    
  };
}
