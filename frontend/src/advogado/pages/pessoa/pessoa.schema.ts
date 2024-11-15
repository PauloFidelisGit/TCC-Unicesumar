import { pessoaBaseSchema } from "@/domain/entities/pessoa/pessoa.schema";
import { z } from "zod";

const editPessoaSchema = {
  telefones: pessoaBaseSchema.telefones,
  emails: pessoaBaseSchema.emails,
};

export const editPessoaFisicaSchema = z.object({
  ...editPessoaSchema,
  nome: pessoaBaseSchema.nome.min(3),
  data_nascimento: pessoaBaseSchema.data_nascimento.or(z.literal("")),
  nacionalidade: pessoaBaseSchema.nacionalidade.or(z.literal("")),
  profissao: pessoaBaseSchema.profissao.or(z.literal("")),
  estado_civil: pessoaBaseSchema.estado_civil.or(z.literal("")),
  cpf: pessoaBaseSchema.cpf.or(z.literal("")),
});
export type EditPessoaFisicaFormValues = z.input<typeof editPessoaFisicaSchema>;

export const editPessoaJuridicaSchema = z.object({
  ...editPessoaSchema,
  nome_fantasia: pessoaBaseSchema.nome_fantasia.min(3),
  razao_social: pessoaBaseSchema.razao_social.or(z.literal("")),
  cnpj: pessoaBaseSchema.cnpj.or(z.literal("")),
});
export type EditPessoaJuridicaFormValues = z.input<
  typeof editPessoaJuridicaSchema
>;
