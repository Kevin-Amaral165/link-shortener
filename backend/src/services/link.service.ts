// Libraries
import type { Link } from "@prisma/client/edge";

// Repositories
import { LinkRepository } from "../repositories/link.repository.js";

// Types
import type { LinkStatsResponse, ListLinksResult } from "../types/link.types.js";

// Utils
import { generateUniqueCode } from "../utils/code.util.js";

// Errors
import { NotFoundError } from "../errors/error.js";

/**
 * Link Service
 * Handles business logic for links (create, list, stats, delete)
 */
export class LinkService {
  // Encapsulated repository instance
  private static readonly linkRepository = new LinkRepository();

  /**
   * Create a new shortened link
   */
  static async create(userId: number, url: string): Promise<Link> {
    const code: string = await generateUniqueCode(this.linkRepository);

    return this.linkRepository.create({
      user_id: userId,
      original_url: url,
      short_code: code,
    });
  }

  /**
   * List paginated links for a user
   */
  static async list(
    userId: number,
    page = 1,
    limit = 10
  ): Promise<ListLinksResult> {
    const skip = (page - 1) * limit;

    const [links, total] = await Promise.all([
      this.linkRepository.findByUser(userId, skip, limit),
      this.linkRepository.countByUser(userId),
    ]);

    return {
      data: links,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Delete a link if it belongs to the user
   */
  static async delete(userId: number, linkId: number): Promise<void> {
    const result: { count: number } = await this.linkRepository.delete(userId, linkId);

    if (result.count === 0) {
      throw new NotFoundError("Link not found");
    }
  }

  /**
   * Get analytics for a specific link
   */
  static async stats(
    userId: number,
    linkId: number
  ): Promise<LinkStatsResponse> {
    const link = await this.linkRepository.findById(userId, linkId);

    if (!link) {
      throw new NotFoundError("Link not found");
    }

    const total: number = link.clicks.length;

    const last7Days: Record<string, number> = {};

    for (const click of link.clicks) {
      const date = click.clicked_at.toISOString().split("T")[0]!;

      last7Days[date] = (last7Days[date] || 0) + 1;
    }

    return { total, last7Days };
  }
}