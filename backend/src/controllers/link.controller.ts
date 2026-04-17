// Libraries
import type { Response } from "express";

// Auth
import type { AuthRequest } from "../middlewares/auth.middleware.js";

// Link service
import { LinkService } from "../services/link.service.js";

// Types
import type { LinkStatsResponse, ListLinksResult } from "../types/link.types.js";
import type { Link } from "@prisma/client/edge";

// Validation
import { createLinkSchema } from "../validation/link.validation.js";

// Utils
import { handleController, parseLinkId, parseUserId } from "../utils/helper.js";

/**
 * Link Controller
 * Handles HTTP requests related to links
 */
export class LinkController {

  /**
   * Create a new shortened link
   */
  static create(req: AuthRequest, res: Response) {
    return handleController(async () => {
      const userId: number = parseUserId(req);
      const parsed: { url: string } = createLinkSchema.parse(req.body);

      const link: Link = await LinkService.create(userId, parsed.url);
      return link;
    }, res);
  }

  /**
   * List user links with pagination
   */
  static list(req: AuthRequest, res: Response) {
    return handleController(async () => {
      const userId: number = parseUserId(req);

      const page: number = Number(req.query.page);
      const limit: number = Number(req.query.limit);

      const safePage: number = isNaN(page) ? 1 : Math.max(1, page);
      const safeLimit: number = isNaN(limit) ? 10 : Math.min(50, Math.max(1, limit));

      const result: ListLinksResult = await LinkService.list(
        userId,
        safePage,
        safeLimit
      );

      return result;
    }, res);
  }

  /**
   * Get analytics for a specific link
   */
  static stats(req: AuthRequest, res: Response) {
    return handleController(async () => {
      const userId: number = parseUserId(req);
      const linkId: number = parseLinkId(req);

      const stats: LinkStatsResponse = await LinkService.stats(
        userId,
        linkId
      );

      return stats;
    }, res);
  }

  /**
   * Delete a user link
   */
  static delete(req: AuthRequest, res: Response) {
    return handleController(async () => {
      const userId: number = parseUserId(req);
      const linkId: number = parseLinkId(req);

      await LinkService.delete(userId, linkId);

      return { message: "Link deleted successfully" };
    }, res);
  }
}