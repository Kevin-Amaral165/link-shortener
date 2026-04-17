// Libraries
import * as Sentry from "@sentry/node";

/**
 * Initialize Sentry for error monitoring
 * Only runs if SENTRY_DSN is provided
 */
export function initSentry() {
  // Skip initialization if DSN is not configured
  if (!process.env.SENTRY_DSN) {
    console.warn("Sentry is not configured");
    return;
  }

  Sentry.init({
    dsn: process.env.SENTRY_DSN,

    // Set environment (development, production, etc.)
    environment: process.env.NODE_ENV || "development",

    // Capture 100% of transactions (adjust in production)
    tracesSampleRate: 1.0,

    // Do not send sensitive user data by default
    sendDefaultPii: false,
  });
}