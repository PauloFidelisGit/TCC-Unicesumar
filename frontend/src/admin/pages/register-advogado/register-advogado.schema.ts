import { advogadoBaseSchema } from "@/domain/entities/advogado/advogado.schema";
import { z } from "zod";

export const createAdvogadoSchema = z.object({
  senha: advogadoBaseSchema.senha.min(1),
  emails: advogadoBaseSchema.emails.optional(),
  nome: advogadoBaseSchema.nome.min(1),
  data_nascimento: advogadoBaseSchema.data_nascimento.or(z.literal("")),
  nacionalidade: advogadoBaseSchema.nacionalidade.or(z.literal("")),
  estado_civil: advogadoBaseSchema.estado_civil.or(z.literal("")),
  cpf: advogadoBaseSchema.cpf.or(z.literal("")), //.refine(...validateCPFToZodRefine),
  oab: advogadoBaseSchema.oab.optional(),
  telefones: advogadoBaseSchema.telefones.optional(),
});
export type CreateAdvogadoFormValues = z.input<typeof createAdvogadoSchema>;

export const insertOabSchema = z.object({
  numero: z.string().min(4),
  uf: z.string().min(2),
  letra: z.string().length(1),
});

export const insertTelefoneSchema = z.object({
  telefone: z.string().length(11, { message: "Telefone inválido." }),
});

export const insertEmailSchema = z.object({
  email: z.string().email({ message: "E-mail inválido." }),
});
