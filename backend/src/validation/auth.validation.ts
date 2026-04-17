// Libraries
import { z } from "zod";

/**
 * Schema for user registration
 */
export const registerSchema: z.ZodType<{ name: string; email: string; password: string }> = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be at most 50 characters long")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces")
    .trim(),

  email: z
    .string()
    .email("Invalid email")
    .max(100, "Email is too long")
    .transform((val) => val.toLowerCase()),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password is too long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

/**
 * Schema for user login
 */
export const loginSchema: z.ZodType<{ email: string; password: string }> = z.object({
  email: z
    .string()
    .email("Invalid email")
    .transform((val) => val.toLowerCase()),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
});