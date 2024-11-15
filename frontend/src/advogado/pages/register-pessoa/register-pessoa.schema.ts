import { pessoaBaseSchema } from "@/domain/entities/pessoa/pessoa.schema";
import { z } from "zod";

const createPessoaSchema = {
  telefones: pessoaBaseSchema.telefones,
  emails: pessoaBaseSchema.emails,
};

export const createPessoaFisicaSchema = z.object({
  ...createPessoaSchema,
  nome: pessoaBaseSchema.nome.min(3),
  data_nascimento: pessoaBaseSchema.data_nascimento.or(z.literal("")),
  nacionalidade: pessoaBaseSchema.nacionalidade.or(z.literal("")),
  profissao: pessoaBaseSchema.profissao.or(z.literal("")),
  estado_civil: pessoaBaseSchema.estado_civil.or(z.literal("")),
  cpf: pessoaBaseSchema.cpf.or(z.literal("")),
});
export type CreatePessoaFisicaFormValues = z.input<
  typeof createPessoaFisicaSchema
>;

export const createPessoaJuridicaSchema = z.object({
  ...createPessoaSchema,
  nome_fantasia: pessoaBaseSchema.nome_fantasia.min(3),
  razao_social: pessoaBaseSchema.razao_social.or(z.literal("")),
  cnpj: pessoaBaseSchema.cnpj.or(z.literal("")),
});
export type CreatePessoaJuridicaFormValues = z.input<
  typeof createPessoaJuridicaSchema
>;
