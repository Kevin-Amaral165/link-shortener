// Libraries
import type { Request, Response } from "express";

// Services
import { RedirectService } from "../services/redirect.service.js";

// Errors
import { BadRequestError } from "../errors/error.js";

// Utils
import { handleController } from "../utils/helper.js";

export class RedirectController {
  static handle(req: Request, res: Response) {
    return handleController(async () => {
      const code = String(req.params.code ?? "").trim();

      if (!code) {
        throw new BadRequestError("Código inválido");
      }

      const ip = req.ip ?? "0.0.0.0";
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