import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import * as Sentry from "@sentry/node";

import { initSentry } from "./config/sentry.js";
import { authRouter } from "./routes/auth.routes.js";

initSentry();

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/auth", authRouter);

// test route
app.get("/debug-sentry", () => {
  throw new Error("Teste Sentry Backend 🚨");
});

// ❗ error handler GLOBAL (único necessário agora)
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  Sentry.captureException(err); // 🔥 envio manual

  console.error("Global error:", err);

  return res.status(500).json({
    error: "Erro interno no servidor",
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});