import { ESTADO_CIVIL, TIPO_PESSOA } from "@/domain/enums";
import { Datetime } from "@/domain/vo/datetime.vo";
import { onlyNumbers, removeEmptyKeysInObject } from "@/lib/utils";
import { CreatePessoaPfArgs, CreatePessoaPjArgs } from "backend/types";
import {
  CreatePessoaFisicaFormValues,
  CreatePessoaJuridicaFormValues,
} from "./register-pessoa.schema";

export function mapCreatePessoaFisicaToApi(
  data: CreatePessoaFisicaFormValues,
): CreatePessoaPfArgs {
  return removeEmptyKeysInObject({
    criado_em: Datetime.create().toDateTime,
    tipo_pessoa: TIPO_PESSOA.PF,
    data: {
      telefones: data?.telefones?.map((telefone) => telefone.value),
      emails: data?.emails?.map((email) => email.value),
      nome: data.nome,
      data_nascimento: data.data_nascimento,
      nacionalidade: data.nacionalidade,
      profissao: data.profissao,
      estado_civil: data.estado_civil as ESTADO_CIVIL,
      cpf: onlyNumbers(data.cpf),
    },
  });
}

export function mapCreatePessoaJuridicaToApi(
  data: CreatePessoaJuridicaFormValues,
): CreatePessoaPjArgs {
  return removeEmptyKeysInObject({
    criado_em: Datetime.create().toDateTime,
    tipo_pessoa: TIPO_PESSOA.PJ,
    data: {
      telefones: data?.telefones?.map((telefone) => telefone.value),
      emails: data?.emails?.map((email) => email.value),
      cnpj: onlyNumbers(data.cnpj),
      nome_fantasia: data.nome_fantasia,
      razao_social: data.razao_social,
    },
  });
}
