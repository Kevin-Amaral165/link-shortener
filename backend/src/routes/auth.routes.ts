// Libraries
import { Router } from "express";

// Controllers
import { AuthController } from "../controllers/auth.controller.js";

/**
 * Auth Routes
 * Defines authentication endpoints (register, login)
 */
export const authRouter = Router();

/**
 * Register a new user
 */
authRouter.post("/register", AuthController.register);

/**
 * Authenticate user and return token/session
 */
authRouter.post("/login", AuthController.login);