// Libraries
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Adapter do PostgreSQL
 * Recebe a connection string via variável de ambiente
 */
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

/**
 * Instância do Prisma Client
 */
export const prisma = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } });