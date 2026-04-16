import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import * as Sentry from "@sentry/node";
import { initSentry } from "./config/sentry.js";
import { authRouter } from "./routes/auth.routes.js";

dotenv.config();
initSentry();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/debug-sentry", (_req: Request, _res: Response) => {
  throw new Error("Teste Sentry Backend 🚨");
});

app.use("/auth", authRouter);
// app.use("/links", linkRouter);

app.use(
  (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Unhandled error:", err);

    Sentry.captureException(err);

    return res.status(500).json({
      error: "Erro interno no servidor",
    });
  }
);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});