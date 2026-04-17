// Libraries
import { Router } from "express";

// Controller
import { RedirectController } from "../controllers/redirect.controller.js";

export const redirectRouter: Router = Router();

/**
 * Public redirect route
 * Resolves a short code and redirects to the original URL
 */
redirectRouter.get("/:code", RedirectController.handle);