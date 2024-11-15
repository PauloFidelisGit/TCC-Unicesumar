import { z } from "zod";

export const createAnotacoesProcessoSchema = z.object({
  titulo: z.string().min(3).max(255),
  descricao: z.string().min(3).max(255),
});
export type CreateAnotacoesProcessoFormValues = z.input<
  typeof createAnotacoesProcessoSchema
>;

export const updateAnotacoesProcesso = z.object({
  titulo: z.string().min(3).max(255),
  descricao: z.string().min(3).max(255),
});
export type UpdateAnotacoesProcessoFormValues = z.input<
  typeof updateAnotacoesProcesso
>;
