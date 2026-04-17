// Libraries
import { Router } from "express";

// Middlewares
import { authMiddleware } from "../middlewares/auth.middleware.js";

// Controller
import { LinkController } from "../controllers/link.controller.js";

const router: Router = Router();

/**
 * Link routes
 * All routes require authentication
 */

// Create a new link
router.post("/", authMiddleware, LinkController.create);

// List user links (paginated)
router.get("/", authMiddleware, LinkController.list);

// Get link analytics/stats
router.get("/:id/stats", authMiddleware, LinkController.stats);

// Delete a link
router.delete("/:id", authMiddleware, LinkController.delete);

export default router;