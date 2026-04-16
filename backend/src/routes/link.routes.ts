// Libraries
import { Router } from "express";

// Auth
import { authMiddleware } from "../middlewares/auth.middleware.js";

// Link
import { LinkController } from "../controllers/link.controller.js";

const router: Router = Router();

/**
 * Rotas de links
 */
router.post("/", authMiddleware, LinkController.create);
router.get("/", authMiddleware, LinkController.list);
router.get("/:id/stats", authMiddleware, LinkController.stats);
router.delete("/:id", authMiddleware, LinkController.delete);

export default router;