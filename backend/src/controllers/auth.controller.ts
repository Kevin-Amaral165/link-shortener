// Libraries
import type { Request, Response } from "express";

// Services
import { AuthService } from "../services/auth.service.js";

// Validation
import { registerSchema, loginSchema } from "../validation/auth.validation.js";

// Utils
import { handleController } from "../utils/helper.js";

/**
 * Auth Controller
 * Handles authentication HTTP requests (register and login)
 */
export class AuthController {

  /**
   * Register a new user
   * Validates request body and delegates to AuthService
   */
  static register(req: Request, res: Response) {
    return handleController(async () => {
      const parsed: { email: string; password: string; name: string } = registerSchema.parse(req.body);
      return AuthService.register(parsed);
    }, res);
  }

  /**
   * Login user and return authentication token
   * Validates credentials and delegates to AuthService
   */
  static login(req: Request, res: Response) {
    return handleController(async () => {
      const parsed: { email: string; password: string } = loginSchema.parse(req.body);
      return AuthService.login(parsed);
    }, res);
  }
}