// Libraries
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Repositories
import { AuthRepository } from "../repositories/auth.repository.js";

// Types
import type { RegisterInput, LoginInput, AuthResponse } from "../types/auth.types.js";

// Errors
import { BadRequestError, UnauthorizedError } from "../errors/error.js";

const JWT_SECRET: string = process.env.JWT_SECRET!;

/**
 * Generates a JWT token for authenticated users
 */
const generateToken: (userId: number) => string = (userId: number) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
};

/**
 * Auth Service
 * Handles authentication business logic (register & login)
 */
export class AuthService {
  private static userRepo: AuthRepository = new AuthRepository();

  /**
   * Register a new user
   */
  static async register(input: RegisterInput): Promise<AuthResponse> {
    const email: string = input.email.toLowerCase().trim();

    const existingUser: { id: number } | null = await this.userRepo.findByEmail(email);
    if (existingUser) {
      throw new BadRequestError("Email already in use");
    }

    const passwordHash: string = await bcrypt.hash(input.password, 10);

    const user: { id: number } = await this.userRepo.create({
      name: input.name,
      email,
      password_hash: passwordHash,
    });

    return {
      token: generateToken(user.id),
    };
  }

  /**
   * Authenticate user and return JWT token
   */
  static async login(input: LoginInput): Promise<AuthResponse> {
    const email: string = input.email.toLowerCase().trim();

    const user: { id: number; password_hash: string } | null = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isValid = await bcrypt.compare(
      input.password,
      user.password_hash
    );

    if (!isValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    return {
      token: generateToken(user.id),
    };
  }
}