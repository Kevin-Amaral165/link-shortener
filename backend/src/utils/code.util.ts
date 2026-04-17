// Libraries
import { randomBytes } from "crypto";
import type { Link } from "@prisma/client/edge";

// Repositories
import { LinkRepository } from "../repositories/link.repository.js";

/**
 * Generate a random short code (hex)
 */
export function generateCode(): string {
  return randomBytes(3).toString("hex");
}

/**
 * Generate a unique short code
 * Ensures no collision with existing links in database
 */
export async function generateUniqueCode(
  repo: LinkRepository
): Promise<string> {
  while (true) {
    const code: string = generateCode();

    const existingLink: Link | null = await repo.findByCode(code);

    if (!existingLink) return code;
  }
}