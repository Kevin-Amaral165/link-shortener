// Lib
import { prisma } from "../database/prisma.js";

/**
 * Click Repository
 * Handles database operations related to link clicks tracking
 */
export class ClickRepository {

  /**
   * Create a click record for analytics/tracking
   */
  async create(data: {
    link_id: number;
    ip_address: string;
    user_agent: string;
  }) {
    return prisma.click.create({ data });
  }
}