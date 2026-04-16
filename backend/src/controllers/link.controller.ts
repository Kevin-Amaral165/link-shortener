// Libraries
import type { Response } from "express";

// Auth
import type { AuthRequest } from "../middlewares/auth.middleware.js";

// Link
import { LinkService } from "../services/link.service.js";
import type { LinkStatsResponse, ListLinksResult } from "../types/link.types.js";
import { createLinkSchema } from "../validation/link.validation.js";
import { handleController, parseLinkId, parseUserId } from "../utils/helper.js";
import type { Link } from "@prisma/client/edge";

export class LinkController {
  static create(req: AuthRequest, res: Response) {
    return handleController(async () => {
      const userId = parseUserId(req);

      const parsed = createLinkSchema.parse(req.body);

      const link: Link = await LinkService.create(userId, parsed.url);
      return link;
    }, res);
  }

  static list(req: AuthRequest, res: Response) {
    return handleController(async () => {
      const userId = parseUserId(req);

      const page = Number(req.query.page);
      const limit = Number(req.query.limit);

      const safePage = isNaN(page) ? 1 : Math.max(1, page);
      const safeLimit = isNaN(limit) ? 10 : Math.min(50, Math.max(1, limit));

      const result: ListLinksResult = await LinkService.list(
        userId,
        safePage,
        safeLimit
      );

      return result;
    }, res);
  }

  static stats(req: AuthRequest, res: Response) {
    return handleController(async () => {
      const userId = parseUserId(req);
      const linkId = parseLinkId(req);

      const stats: LinkStatsResponse = await LinkService.stats(
        userId,
        linkId
      );

      return stats;
    }, res);
  }

  static delete(req: AuthRequest, res: Response) {
    return handleController(async () => {
      const userId = parseUserId(req);
      const linkId = parseLinkId(req);

      await LinkService.delete(userId, linkId);

      return { message: "Link removido com sucesso" };
    }, res);
  }
}