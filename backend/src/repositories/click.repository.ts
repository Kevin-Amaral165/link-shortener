// Lib
import { prisma } from "../database/prisma.js";

export class ClickRepository {
  async create(data: {
    link_id: number;
    ip_address: string;
    user_agent: string;
  }) {
    return prisma.click.create({ data });
  }
}