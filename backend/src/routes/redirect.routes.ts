// Libraries
import { Router } from "express";

// Controller
import { RedirectController } from "../controllers/redirect.controller.js";

const router = Router();

/**
 * Public redirect route
 * Resolves a short code and redirects to the original URL
 */
router.get("/:code", RedirectController.handle);

export default router;