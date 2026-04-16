// Libraries
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Errors
import { UnauthorizedError } from "../errors/error.js";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface AuthRequest extends Request {
  userId?: number;
}

export function authMiddleware(
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError("Token não fornecido");
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new UnauthorizedError("Token inválido");
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string | number };

    const userId = Number(payload.userId);
    if (isNaN(userId)) {
      throw new UnauthorizedError("Token inválido");
    }

    req.userId = userId;
    return next();
  } catch {
    throw new UnauthorizedError("Token expirado ou inválido");
  }
}