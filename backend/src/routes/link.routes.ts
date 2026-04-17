// Libraries
import { Router } from "express";

// Middlewares
import { authMiddleware } from "../middlewares/auth.middleware.js";

// Controller
import { LinkController } from "../controllers/link.controller.js";

export const linkRouter: Router = Router();

/**
 * Link routes
 * All routes require authentication
 */

// Create a new link
linkRouter.post("/", authMiddleware, LinkController.create);

// List user links (paginated)
linkRouter.get("/", authMiddleware, LinkController.list);

// Get link analytics/stats
linkRouter.get("/:id/stats", authMiddleware, LinkController.stats);

// Delete a link
linkRouter.delete("/:id", authMiddleware, LinkController.delete);