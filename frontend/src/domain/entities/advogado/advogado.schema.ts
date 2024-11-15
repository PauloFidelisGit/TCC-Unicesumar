import { ESTADO_CIVIL } from "@/domain/enums";
import { validatePhoneNumber } from "@/lib/utils";
import { z } from "zod";

export const advogadoBaseSchema = {
  id: z.number().int().positive(),
  uuid: z.string().uuid(),
  criado_em: z.string().datetime(),
  atualizado_em: z.string().datetime(),
  login: z.string().max(10),
  senha: z.string().min(8).max(255),
  permissoes: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      active: z.boolean(),
    }),
  ),
  telefones: z.array(
    z.object({
      value: z
        .string()
        .length(16)
        .refine(
          (value) => {
            return validatePhoneNumber(value);
          },
          {
            message: "Telefone inválido.",
          },
        ),
    }),
  ),
  emails: z.array(
    z.object({
      value: z.string().email(),
    }),
  ),
  nome: z.string().max(255),
  data_nascimento: z.string().length(10, {
    message: "Data inválida.",
  }),
  nacionalidade: z.string().max(255),
  estado_civil: z.nativeEnum(ESTADO_CIVIL),
  cpf: z.string().length(14),
  oab: z.array(
    z.object({
      numero: z.string().min(4),
      uf: z.string().length(2),
      letra: z.string().length(1),
    }),
  ),
};
