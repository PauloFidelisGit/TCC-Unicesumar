import { ESTADO_CIVIL, TIPO_PESSOA } from "@/domain/enums";
import { validatePhoneNumber } from "@/lib/utils";
import { z } from "zod";

export const pessoaBaseSchema = {
  id: z.number().int().positive(),
  uuid: z.string().uuid(),
  criado_em: z.string().datetime(),
  atualizado_em: z.string().datetime(),
  login: z.string().max(10),
  senha: z.string().max(255),
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
  tipo_pessoa: z.nativeEnum(TIPO_PESSOA),
  nome: z.string().max(255),
  data_nascimento: z.string().length(10, {
    message: "Data inválida.",
  }),
  nacionalidade: z.string().max(255),
  profissao: z.string().max(255),
  estado_civil: z.nativeEnum(ESTADO_CIVIL),
  cpf: z.string().length(14),
  nome_fantasia: z.string().max(255),
  razao_social: z.string().max(255),
  cnpj: z.string().length(18),
};
