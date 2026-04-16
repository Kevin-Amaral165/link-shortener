// Libraries
import type { Request, Response } from "express";

// Services
import { AuthService } from "../services/auth.service.js";

// Validation
import { registerSchema, loginSchema } from "../validation/auth.validation.js";

// Utils
import { handleController } from "../utils/helper.js";

export class AuthController {
  static register(req: Request, res: Response) {
    return handleController(async () => {
      const parsed = registerSchema.parse(req.body);
      return AuthService.register(parsed);
    }, res);
  }

  static login(req: Request, res: Response) {
    return handleController(async () => {
      const parsed = loginSchema.parse(req.body);
      return AuthService.login(parsed);
    }, res);
  }
}