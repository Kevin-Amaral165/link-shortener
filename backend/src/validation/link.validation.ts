// Libraries
import { z } from "zod";

export const createLinkSchema: z.ZodType<{ url: string }> = z.object({
  url: z
    .string()
    .url("URL inválida")
    .max(2048, "URL muito longa"),
});