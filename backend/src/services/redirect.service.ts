// Repositories
import { LinkRepository } from "../repositories/link.repository.js";

// Services
import { ClickService } from "../services/click.service.js";

// Errors
import { NotFoundError } from "../errors/error.js";

/**
 * Redirect Service
 * Resolves short links and handles click tracking
 */
export class RedirectService {
  // Encapsulated repository instance
  private static readonly linkRepository = new LinkRepository();

  /**
   * Resolve a short code into its original URL
   * Also tracks click asynchronously (non-blocking)
   */
  static async resolveRedirectUrl(
    code: string,
    ip: string,
    userAgent: string
  ): Promise<string> {
    const link = await this.linkRepository.findByCode(code);

    if (!link) {
      throw new NotFoundError("Link not found");
    }

    // Fire-and-forget click tracking (does not block redirect)
    ClickService.register(link.id, ip, userAgent).catch((err) => {
      console.error("Failed to register click:", err);
    });

    return link.original_url;
  }
}