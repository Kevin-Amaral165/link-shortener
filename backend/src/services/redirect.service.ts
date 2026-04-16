// Repositories
import { LinkRepository } from "../repositories/link.repository.js";

// Services
import { ClickService } from "../services/click.service.js";

// Errors
import { NotFoundError } from "../errors/error.js";

const linkRepository = new LinkRepository();

export class RedirectService {
  static async resolveRedirectUrl(
    code: string,
    ip: string,
    userAgent: string
  ): Promise<string> {
    const link = await linkRepository.findByCode(code);

    if (!link) {
      throw new NotFoundError("Link não encontrado");
    }

    ClickService.register(link.id, ip, userAgent).catch((err) => {
      console.error("Erro ao registrar clique:", err);
    });

    return link.original_url;
  }
}