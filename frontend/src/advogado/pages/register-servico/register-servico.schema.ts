import { servicoBaseSchema } from "@/domain/entities/servico/servico.schema";
import { z } from "zod";

export const formSchema = z.object({
  nome: servicoBaseSchema.nome.min(3),
});
export type CreateServicoFormValues = z.input<typeof formSchema>;
