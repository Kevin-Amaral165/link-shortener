// Libraries
import { randomBytes } from "crypto";
import type { Link } from "@prisma/client/edge";

// Link
import { LinkRepository } from "../repositories/link.repository.js";

export function generateCode(): string {
  return randomBytes(3).toString("hex");
}


export async function generateUniqueCode(repo: LinkRepository): Promise<string> {
  while (true) {
    const code: string = generateCode();
    const existingLink: Link | null = await repo.findByCode(code);

    if (!existingLink) return code;
  }
}