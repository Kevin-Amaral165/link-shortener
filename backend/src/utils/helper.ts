// Libraries
import type { Response } from "express";
import * as Sentry from "@sentry/node";
import { ZodError } from "zod";

// Middlewares
import type { AuthRequest } from "../middlewares/auth.middleware.js";

/**
 * Standard HTTP error shape
 */
export type HttpError = {
  status: number;
  message: string;
};

/**
 * Type guard to identify HTTP errors
 */
function isHttpError(error: unknown): error is HttpError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "message" in error
  );
}

/**
 * Redirect response type
 */
type RedirectResponse = {
  redirect: string;
  status?: number;
};

/**
 * Controller wrapper
 * Standardizes API responses and error handling
 */
export async function handleController<T>(
  fn: () => Promise<T | RedirectResponse>,
  res: Response
) {
  try {
    const result: T | RedirectResponse = await fn();

    // Handle redirect responses
    if (typeof result === "object" && result !== null && "redirect" in result) {
      return res.redirect(result.status ?? 302, result.redirect);
    }

    return res.json(result);
  } catch (error: unknown) {
    console.error("Controller error:", error);

    // Validation errors (Zod)
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: "Validation error",
        details: error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    // Known HTTP errors
    if (isHttpError(error)) {
      if (error.status >= 500) {
        Sentry.captureException(error);
      }

      return res.status(error.status).json({
        error: error.message,
      });
    }

    // Unexpected errors
    Sentry.captureException(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

/**
 * Extract and validate authenticated userId
 */
export function parseUserId(req: AuthRequest): number {
  if (req.userId === undefined || req.userId === null) {
    throw {
      status: 401,
      message: "User not authenticated",
    } satisfies HttpError;
  }

  const userId =
    typeof req.userId === "number"
      ? req.userId
      : parseInt(String(req.userId), 10);

  if (isNaN(userId)) {
    throw {
      status: 400,
      message: "Invalid user ID",
    } satisfies HttpError;
  }

  return userId;
}

/**
 * Extract and validate link ID from route params
 */
export function parseLinkId(req: AuthRequest): number {
  const linkId: number = parseInt(String(req.params.id), 10);

  if (isNaN(linkId)) {
    throw {
      status: 400,
      message: "Invalid link ID",
    } satisfies HttpError;
  }

  return linkId;
}