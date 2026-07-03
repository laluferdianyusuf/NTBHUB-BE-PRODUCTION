import { Request, Response } from "express";
import { runService } from "shared/http/serviceError";
import { sendSuccess } from "shared/http/response";
import { SearchRepository } from "modules/search/search.repository";
import { SearchService } from "modules/search/search.service";

const searchService = new SearchService(new SearchRepository());

export class SearchController {
  static async globalSearch(req: Request, res: Response): Promise<Response> {      const result = await runService(() => searchService.globalSearch({
        search: req.query.search as string,
        page: Number(req.query.page),
        limit: Number(req.query.limit),
        type: req.query.type as any,
        sort: req.query.sort as any,
      }));

      return res.status(200).json({
        success: true,
        message: "Global search success",
        ...result,
      });
  }
}
