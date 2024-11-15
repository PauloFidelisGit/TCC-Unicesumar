import { z } from "zod";

export const createAnotacoesCasoSchema = z.object({
  titulo: z.string().min(3).max(255),
  descricao: z.string().min(3).max(255),
});
export type CreateAnotacoesCasoFormValues = z.input<
  typeof createAnotacoesCasoSchema
>;

export const updateAnotacoesCaso = z.object({
  titulo: z.string().min(3).max(255),
  descricao: z.string().min(3).max(255),
});
export type UpdateAnotacoesCasoFormValues = z.input<typeof updateAnotacoesCaso>;
