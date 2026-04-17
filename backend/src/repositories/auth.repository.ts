// Libraries
import { prisma } from "../database/prisma.js";

/**
 * Auth Repository
 * Handles database operations related to authentication
 */
export class AuthRepository {

  /**
   * Find a user by email
   */
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  /**
   * Create a new user in the database
   */
  create(data: { name: string; email: string; password_hash: string }) {
    return prisma.user.create({ data });
  }
}