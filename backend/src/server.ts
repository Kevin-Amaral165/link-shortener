// Libraries
import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import * as Sentry from "@sentry/node";

// Sentry
import { initSentry } from "./config/sentry.js";

// Routes
import { authRouter } from "./routes/auth.routes.js";
import { linkRouter } from "./routes/link.routes.js";
import { redirectRouter } from "./routes/redirect.routes.js";

initSentry();

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/auth", authRouter);
app.use("/links", linkRouter);
app.use("/redirect", redirectRouter);

// test route
app.get("/debug-sentry", () => {
  throw new Error("Teste Sentry Backend 🚨");
});

// error handler
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  Sentry.captureException(err);

  console.error("Global error:", err);

  return res.status(500).json({
    error: "Erro interno no servidor",
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});