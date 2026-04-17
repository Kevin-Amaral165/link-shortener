// Repositories
import { ClickRepository } from "../repositories/click.repository.js";

/**
 * Click Service
 * Handles business logic for tracking link clicks
 */
export class ClickService {
  // Repository instance (encapsulated inside service)
  private static readonly clickRepository: ClickRepository = new ClickRepository();

  /**
   * Register a new click event for a link
   */
  static async register(
    linkId: number,
    ip: string,
    userAgent: string
  ) {
    return this.clickRepository.create({
      link_id: linkId,
      ip_address: ip,
      user_agent: userAgent,
    });
  }
}