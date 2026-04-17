// Libraries
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Errors
import { UnauthorizedError } from "../errors/error.js";

/**
 * JWT secret used to validate authentication tokens
 */
const JWT_SECRET: string = process.env.JWT_SECRET!;

/**
 * Extended request type that includes authenticated userId
 */
export interface AuthRequest extends Request {
  userId?: number;
}

/**
 * Authentication middleware
 * Validates JWT token and attaches userId to request
 */
export function authMiddleware(
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) {
  const authHeader: string | undefined = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError("Token not provided");
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new UnauthorizedError("Invalid token format");
  }

  try {
    const payload: { userId: string | number } = jwt.verify(token, JWT_SECRET) as {
      userId: string | number;
    };

    const userId: number = Number(payload.userId);

    if (isNaN(userId)) {
      throw new UnauthorizedError("Invalid token");
    }

    req.userId = userId;
    return next();
  } catch {
    throw new UnauthorizedError("Token expired or invalid");
  }
}