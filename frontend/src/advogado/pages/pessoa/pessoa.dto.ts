import { ESTADO_CIVIL, TIPO_PESSOA } from "@/domain/enums";
import { Datetime } from "@/domain/vo/datetime.vo";
import {
  formatCEP,
  formatCNPJ,
  formatCPF,
  nullableEmptyKeysInObject,
  onlyNumbers,
} from "@/lib/utils";
import {
  QueryFindPessoaPF,
  QueryFindPessoaPJ,
  QuerySearchEnderecoDTO,
} from "./pessoa.queries";
import {
  EditPessoaFisicaFormValues,
  EditPessoaJuridicaFormValues,
} from "./pessoa.schema";

export function mapQueryFindPessoaFisicaToForm(
  data: QueryFindPessoaPF,
): EditPessoaFisicaFormValues {
  return {
    telefones: data?.telefones?.map((value) => ({ value })) ?? [],
    emails: data?.emails?.map((value) => ({ value })) ?? [],
    nome: data?.nome || "",
    data_nascimento: data?.data_nascimento || "",
    nacionalidade: data?.nacionalidade || "",
    profissao: data?.profissao || "",
    estado_civil: data?.estado_civil || "",
    cpf: data?.cpf ? formatCPF(data.cpf) : "",
  };
}

export function mapUpdatePessoaFisicaToApi(
  uuid: string,
  data: EditPessoaFisicaFormValues,
) {
  return nullableEmptyKeysInObject({
    uuid,
    tipo_pessoa: TIPO_PESSOA.PF,
    data: {
      atualizado_em: Datetime.create().toDateTime,
      telefones: data.telefones.map((v) => v.value),
      emails: data.emails.map((v) => v.value),
      nome: data.nome,
      data_nascimento: data.data_nascimento,
      nacionalidade: data.nacionalidade,
      profissao: data.profissao,
      estado_civil: data.estado_civil as ESTADO_CIVIL,
      cpf: onlyNumbers(data.cpf),
    },
  });
}

export function mapQueryFindPessoaJuridicaToForm(
  data: QueryFindPessoaPJ,
): EditPessoaJuridicaFormValues {
  return {
    telefones: data?.telefones?.map((value) => ({ value })) ?? [],
    emails: data?.emails?.map((value) => ({ value })) ?? [],
    nome_fantasia: data?.nome_fantasia || "",
    razao_social: data?.razao_social || "",
    cnpj: data.cnpj ? formatCNPJ(data.cnpj) : "",
  };
}

export function mapUpdatePessoaJuridicaToApi(
  uuid: string,
  data: EditPessoaJuridicaFormValues,
) {
  return nullableEmptyKeysInObject({
    uuid,
    tipo_pessoa: TIPO_PESSOA.PJ,
    data: {
      atualizado_em: Datetime.create().toDateTime,
      telefones: data.telefones.map((v) => v.value),
      emails: data.emails.map((v) => v.value),
      nome_fantasia: data.nome_fantasia,
      razao_social: data.razao_social,
      cnpj: onlyNumbers(data.cnpj),
    },
  });
}

export function mapSearchEnderecoToCard(values?: QuerySearchEnderecoDTO[]) {
  return (
    values?.map((value) => ({
      uuid: value?.uuid ?? "",
      criado_em: value?.criado_em ? new Datetime(value.criado_em).DDMMYYYY : "",
      atualizado_em: value?.atualizado_em
        ? new Datetime(value.atualizado_em).DDMMYYYY
        : "",
      cep: value?.cep ? formatCEP(value?.cep) : "",
      cidade: value?.cidade ?? "",
      complemento: value?.complemento ?? "",
      uf: value?.estado ?? "",
      logradouro: value?.logradouro ?? "",
      numero: value?.numero ?? "",
      bairro: value?.bairro ?? "",
    })) || []
  );
}
export type MapSearchEnderecoToCardDTO = ReturnType<
  typeof mapSearchEnderecoToCard
>;
