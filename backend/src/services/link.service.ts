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

const linkRepository = new LinkRepository();

export class LinkService {
  static async create(userId: number, url: string): Promise<Link> {
    const code = await generateUniqueCode(linkRepository);

    return linkRepository.create({
      user_id: userId,
      original_url: url,
      short_code: code,
    });
  }

  static async list(
    userId: number,
    page = 1,
    limit = 10
  ): Promise<ListLinksResult> {
    const skip = (page - 1) * limit;

    const [links, total] = await Promise.all([
      linkRepository.findByUser(userId, skip, limit),
      linkRepository.countByUser(userId),
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

  static async delete(userId: number, linkId: number): Promise<void> {
    const result = await linkRepository.delete(userId, linkId);

    if (result.count === 0) {
      throw new NotFoundError("Link não encontrado");
    }
  }

  static async stats(
    userId: number,
    linkId: number
  ): Promise<LinkStatsResponse> {
    const link = await linkRepository.findById(userId, linkId);

    if (!link) {
      throw new NotFoundError("Link não encontrado");
    }

    const total = link.clicks.length;

    const last7Days: Record<string, number> = {};

    for (const click of link.clicks) {
      const date = click.clicked_at.toISOString().split("T")[0]!;

      last7Days[date] = (last7Days[date] || 0) + 1;
    }

    return { total, last7Days };
  }
}