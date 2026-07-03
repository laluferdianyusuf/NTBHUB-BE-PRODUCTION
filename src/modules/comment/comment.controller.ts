import { CommentEntityType } from "@prisma/client";
import { Request, Response } from "express";
import { ValidationError } from "shared/errors";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { z } from "zod";
import { CommentService } from "./comment.service";

const commentService = new CommentService();

export class CommentController {
  static list = async (req: Request, res: Response) => {
    const paramsSchema = z.object({
      entityType: z.nativeEnum(CommentEntityType),
      entityId: z.string().min(1),
    });

    const userId = req.user?.id as string;
    const { entityType, entityId } = paramsSchema.parse(req.params);

    const comments = await runService(() =>
      commentService.list(entityType, entityId, userId),
    );
    return sendSuccess(res, comments, "Comments retrieved");
  };

  static create = async (req: Request, res: Response) => {
    const bodySchema = z.object({
      entityType: z.nativeEnum(CommentEntityType),
      entityId: z.string().min(1),
      content: z.string().min(1),
      parentId: z.string().optional(),
    });

    const body = bodySchema.parse(req.body);

    const comment = await runService(() =>
      commentService.create({
        ...body,
        userId: req.user!.id,
      }),
    );

    return sendSuccess(res, comment, "Comment created", 201);
  };

  static like = async (req: Request, res: Response) => {
    const { commentId } = z
      .object({ commentId: z.string().uuid() })
      .parse(req.params);

    const liked = await runService(() =>
      commentService.like(commentId, req.user!.id),
    );

    return sendSuccess(res, { success: true, liked }, "Like updated");
  };

  static report = async (req: Request, res: Response) => {
    const { commentId } = z
      .object({ commentId: z.string().uuid() })
      .parse(req.params);
    const { reason } = z
      .object({ reason: z.string().min(3) })
      .parse(req.body);

    await runService(() =>
      commentService.report(commentId, req.user!.id, reason),
    );

    return sendSuccess(res, { success: true }, "Comment reported", 201);
  };

  static delete = async (req: Request, res: Response) => {
    const { commentId } = z
      .object({ commentId: z.string().uuid() })
      .parse(req.params);

    await runService(() =>
      commentService.delete(commentId, req.user!.id),
    );

    return sendSuccess(res, { success: true }, "Comment deleted");
  };
}
