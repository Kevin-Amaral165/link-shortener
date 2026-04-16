// Libraries
import type { Response } from "express";

// Middlewares
import type { AuthRequest } from "../middlewares/auth.middleware.js";

/**
 * Padrão de erro HTTP
 */
export type HttpError = {
  status: number;
  message: string;
};

/**
 * Type guard para identificar erros HTTP
 */
function isHttpError(error: unknown): error is HttpError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "message" in error
  );
}

/**
 * Tipo de retorno especial para redirect
 */
type RedirectResponse = {
  redirect: string;
  status?: number;
};

/**
 * Helper para padronizar controllers
 */
export async function handleController<T>(
  fn: () => Promise<T | RedirectResponse>,
  res: Response
) {
  try {
    const result = await fn();

    if (
      typeof result === "object" &&
      result !== null &&
      "redirect" in result
    ) {
      return res.redirect(result.status ?? 302, result.redirect);
    }

    return res.json(result);
  } catch (error: unknown) {
    console.error("Controller error:", error);
    if (isHttpError(error)) {
      return res.status(error.status).json({
        error: error.message,
      });
    }

    return res.status(500).json({
      error: "Erro interno no servidor",
    });
  }
}

/**
 * Extrai e valida o userId do request autenticado
 */
export function parseUserId(req: AuthRequest): number {
  if (req.userId === undefined || req.userId === null) {
    throw {
      status: 401,
      message: "Usuário não autenticado",
    } satisfies HttpError;
  }

  const userId =
    typeof req.userId === "number"
      ? req.userId
      : parseInt(String(req.userId), 10);

  if (isNaN(userId)) {
    throw {
      status: 400,
      message: "User ID inválido",
    } satisfies HttpError;
  }

  return userId;
}

/**
 * Extrai e valida o linkId da rota
 */
export function parseLinkId(req: AuthRequest): number {
  const linkId = parseInt(String(req.params.id), 10);

  if (isNaN(linkId)) {
    throw {
      status: 400,
      message: "ID do link inválido",
    } satisfies HttpError;
  }

  return linkId;
}