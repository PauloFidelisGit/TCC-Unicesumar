import { servicoBaseSchema } from "@/domain/entities/servico/servico.schema";
import { z } from "zod";

export const updateServicoSchema = z.object({
  nome: servicoBaseSchema.nome.min(3),
});
export type UpdateServicoFormValues = z.input<typeof updateServicoSchema>;
