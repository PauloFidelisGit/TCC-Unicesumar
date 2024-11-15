import { tribunalBaseSchema } from "@/domain/entities/tribunal/tribunal.schema";
import { z } from "zod";

export const editTribunalSchema = z.object({
  nome: tribunalBaseSchema.nome.min(3),
});
export type EditTribunalFormValues = z.input<typeof editTribunalSchema>;
