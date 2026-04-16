import { z } from "zod";

/** Schema para registro */
export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "O nome só pode conter letras e espaços")
    .trim(),

  email: z
    .string()
    .email("Email inválido")
    .max(100, "Email muito longo")
    .transform((val) => val.toLowerCase()),

  password: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .max(100, "Senha muito longa")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número")
    .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial"),
});

/** Schema para login */
export const loginSchema = z.object({
  email: z
    .string()
    .email("Email inválido")
    .transform((val) => val.toLowerCase()),

  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});