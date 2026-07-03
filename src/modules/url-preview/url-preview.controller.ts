import { Request, Response } from "express";
import ogs from "open-graph-scraper";
import { ValidationError } from "shared/errors";

export const getLinkPreview = async (req: Request, res: Response) => {
  const { link } = req.body;
  if (!link) throw new ValidationError("Link required");

  const { result } = await ogs({ url: link });
  if (!result.ogImage && !result.twitterImage) {
    throw new ValidationError("No preview available for this link");
  }

  return res.json({
    data: {
      title: result.ogTitle || result.twitterTitle || link,
      description: result.ogDescription || result.twitterDescription || "",
      image: result.ogImage?.[0]?.url || result.twitterImage?.[0]?.url || null,
      url: link,
    },
  });
};
