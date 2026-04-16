// Libraries
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Repositories
import { AuthRepository } from "../repositories/auth.repository.js";

// Types
import type { RegisterInput, LoginInput, AuthResponse } from "../types/auth.types.js";

// Errors
import { BadRequestError, UnauthorizedError } from "../errors/error.js";

const JWT_SECRET = process.env.JWT_SECRET!;

const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
};

export class AuthService {
  private static userRepo = new AuthRepository();

  static async register(input: RegisterInput): Promise<AuthResponse> {
    const email = input.email.toLowerCase().trim();

    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      throw new BadRequestError("E-mail já está em uso");
    }

    const passwordHash = await bcrypt.hash(input.password, 10);

    const user = await this.userRepo.create({
      name: input.name,
      email,
      password_hash: passwordHash,
    });

    return {
      token: generateToken(user.id),
    };
  }

  static async login(input: LoginInput): Promise<AuthResponse> {
    const email = input.email.toLowerCase().trim();

    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError("E-mail ou senha inválidos");
    }

    const isValid = await bcrypt.compare(
      input.password,
      user.password_hash
    );

    if (!isValid) {
      throw new UnauthorizedError("E-mail ou senha inválidos");
    }

    return {
      token: generateToken(user.id),
    };
  }
}