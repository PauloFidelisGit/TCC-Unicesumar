import { advogadoBaseSchema } from "@/domain/entities/advogado/advogado.schema";
import { z } from "zod";

export const updateAdvogadoSchema = z.object({
  cpf: advogadoBaseSchema.cpf.or(z.literal("")),
  data_nascimento: advogadoBaseSchema.data_nascimento.or(z.literal("")),
  emails: advogadoBaseSchema.emails.optional(),
  estado_civil: advogadoBaseSchema.estado_civil.or(z.literal("")),
  nacionalidade: advogadoBaseSchema.nacionalidade.or(z.literal("")),
  nome: advogadoBaseSchema.nome,
  oab: advogadoBaseSchema.oab.optional(),
  telefones: advogadoBaseSchema.telefones.optional(),
});
export type UpdateAdvogadoFormValues = z.input<typeof updateAdvogadoSchema>;
