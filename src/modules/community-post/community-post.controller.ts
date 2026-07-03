import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { CommunityPostServices } from "modules/community-post/community-post.service";


const service = new CommunityPostServices();

export class CommunityPostController {
  static getPosts = async (req: Request, res: Response) => {      const { communityId } = req.params;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const search = req.query.search as string;

      const posts = await runService(() => service.getPosts(
        communityId,
        { page, limit },
        search,
      ));

      return sendSuccess(res, posts, "Posts fetched successfully");
    
  };

  static addPost = async (req: Request, res: Response) => {      const { communityId } = req.params;
      const { content, link } = req.body;
      const file = req.file;
      const adminId = req.user?.id as string;

      const post = await runService(() => service.addPost(
        communityId,
        String(adminId),
        content,
        link,
        file,
      ));

      return sendSuccess(res, post, "Post created successfully", 201);
    
  };

  static updatePost = async (req: Request, res: Response) => {      const { postId } = req.params;
      const { content, link } = req.body;

      const post = await runService(() => service.updatePost(postId, { content, link }));

      return sendSuccess(res, post, "Post updated successfully");
    
  };

  static deletePost = async (req: Request, res: Response) => {      const { postId } = req.params;

      await runService(() => service.deletePost(postId));

      return sendSuccess(res, null, "Post deleted successfully");
    
  };
}
