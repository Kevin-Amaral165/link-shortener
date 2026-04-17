// Libraries
import type { Request, Response } from "express";

// Services
import { RedirectService } from "../services/redirect.service.js";

// Errors
import { BadRequestError } from "../errors/error.js";

// Utils
import { handleController } from "../utils/helper.js";

/**
 * Redirect Controller
 * Handles short link redirection logic
 */
export class RedirectController {

  /**
   * Resolves a short code and returns the destination URL
   * Also tracks request metadata (IP and User-Agent)
   */
  static handle(req: Request, res: Response) {
    return handleController(async (): Promise<{ redirect: string; status: number }> => {
      const code: string = String(req.params.code ?? "").trim();

      if (!code) {
        throw new BadRequestError("Invalid code");
      }

      const ip: string = req.ip ?? "0.0.0.0";
      const userAgent = req.headers["user-agent"]?.toString() || "";

      const url = await RedirectService.resolveRedirectUrl(
        code,
        ip,
        userAgent
      );

      return {
        redirect: url,
        status: 302,
      };
    }, res);
  }
}