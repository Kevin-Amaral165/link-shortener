// Libraries
import { prisma } from "../database/prisma.js";

export class AuthRepository {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  create(data: { name: string; email: string; password_hash: string }) {
    return prisma.user.create({ data });
  }
}