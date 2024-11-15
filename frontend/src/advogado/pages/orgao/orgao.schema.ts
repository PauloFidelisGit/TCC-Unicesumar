import { orgaoBaseSchema } from "@/domain/entities/orgao/orgao.schema";
import { z } from "zod";

export const editOrgaoSchema = z.object({
  nome: orgaoBaseSchema.nome.min(3),
});
export type EditOrgaoFormValues = z.input<typeof editOrgaoSchema>;
