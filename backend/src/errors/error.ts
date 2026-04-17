// Application error variants
// Defines standard HTTP errors used across the API

import { AppError } from "./app.error.js";

/**
 * 404 - Resource not found
 */
export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

/**
 * 401 - Unauthorized access
 */
export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

/**
 * 400 - Bad request (validation or invalid input)
 */
export class BadRequestError extends AppError {
  constructor(message = "Invalid request") {
    super(message, 400);
  }
}