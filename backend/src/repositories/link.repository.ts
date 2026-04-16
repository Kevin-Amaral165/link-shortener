// Libraries
import type { Click, Link } from "@prisma/client/edge";

// Lib
import { prisma } from "../database/prisma.js";

export class LinkRepository {
  async create(data: {
    user_id: number;
    original_url: string;
    short_code: string;
  }): Promise<Link> {
    return prisma.link.create({ data });
  }

  async findByUser(userId: number, skip: number, take: number): Promise<Link[]> {
    return prisma.link.findMany({
      where: { user_id: userId },
      skip,
      take,
      orderBy: { created_at: "desc" },
    });
  }

  async countByUser(userId: number): Promise<number> {
    return prisma.link.count({
      where: { user_id: userId },
    });
  }

  async delete(userId: number, linkId: number): Promise<{ count: number }> {
    return prisma.link.deleteMany({
      where: { id: linkId, user_id: userId },
    });
  }

  async findById(userId: number, linkId: number): Promise<(Link & { clicks: Click[] }) | null> {
    return prisma.link.findFirst({
      where: {
        id: linkId,
        user_id: userId,
      },
      include: { clicks: true },
    });
  }

  async findByCode(code: string): Promise<Link | null> {
    return prisma.link.findUnique({
      where: { short_code: code },
    });
  }
}