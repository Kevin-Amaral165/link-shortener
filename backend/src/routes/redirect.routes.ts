// Libraries
import { Router } from "express";

// Controller
import { RedirectController } from "../controllers/redirect.controller.js";

const router = Router();

router.get("/:code", RedirectController.handle);

export default router;