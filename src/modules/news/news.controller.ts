import { Request, Response } from "express";
import { NotFoundError, ValidationError } from "shared/errors";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { NewsServices } from "./news.service";

const newsService = new NewsServices();

export class NewsController {
  static async createNews(req: Request, res: Response) {
    const { sourceUrl } = req.body;
    if (!sourceUrl) throw new ValidationError("source url is required");
    const news = await runService(() => newsService.createFromUrl(sourceUrl));
    return sendSuccess(res, news, "News successfully saved", 201);
  }

  static async findAllNews(req: Request, res: Response) {
    const news = await runService(() => newsService.getAllNews());
    return sendSuccess(res, news, "News retrieved successful");
  }

  static async findNewsById(req: Request, res: Response) {
    const news = await runService(() => newsService.getNewsById(req.params.id));
    if (!news) throw new NotFoundError("News not found");
    return sendSuccess(res, news, "News retrieved successful");
  }

  static async createImpression(req: Request, res: Response) {
    const newsId = req.params.newsId;
    const userId = req.user?.id as string;
    await runService(() =>
      newsService.createImpression({
        newsId,
        userId,
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      }),
    );
    return sendSuccess(res, { success: true }, "News visited");
  }

  static async createComment(req: Request, res: Response) {
    const userId = req.user?.id as string;
    const { newsId, content } = req.body;
    const comment = await runService(() =>
      newsService.createComment({ newsId, userId, content }),
    );
    return sendSuccess(res, comment, "News comment created", 201);
  }

  static async getAllComments(req: Request, res: Response) {
    const { newsId } = req.params;
    const comments = await runService(() =>
      newsService.getAllCommentsByNews(newsId),
    );
    return sendSuccess(res, comments, "News comment retrieved");
  }
}
