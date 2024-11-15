import { Datetime } from "@/domain/vo/datetime.vo";
import { formatCEP, removeEmptyKeysInObject } from "@/lib/utils";
import type { CreateEnderecoArgs } from "backend/types";
import { QuerySearchEnderecoDTO } from "./enderecos-pessoa.queries";
import { CreateEnderecoFormValues } from "./enderecos-pessoa.schemas";

export function mapQuerySearchEnderecoToView(values: QuerySearchEnderecoDTO[]) {
  const mappedValues = values
    .map((v) => ({
      uuid: v?.uuid || "",
      criado_em: new Datetime(v.criado_em).DDMMYYYY || "",
      atualizado_em: new Datetime(v.atualizado_em)?.DDMMYYYY || "",
      cep: v?.cep ? formatCEP(v?.cep) : "",
      cidade: v?.cidade || "",
      complemento: v?.complemento || "",
      estado: v?.estado || "",
      logradouro: v?.logradouro || "",
      numero: v?.numero || "",
      bairro: v?.bairro || "",
    }))
    .sort((a, b) => {
      const dateA = new Date(a.criado_em).getTime();
      const dateB = new Date(b.criado_em).getTime();
      return dateB - dateA;
    });
  return mappedValues;
}
export type MapQuerySearchEnderecoToViewDTO = ReturnType<
  typeof mapQuerySearchEnderecoToView
>;

export type TypeEndereco = MapQuerySearchEnderecoToViewDTO[number];

export function mapFormCreateEnderecoToApi(
  data: CreateEnderecoFormValues & {
    advogado_uuid?: string | null;
    pessoa_uuid?: string | null;
  },
): CreateEnderecoArgs {
  let variables: CreateEnderecoArgs = {
    bairro: data.bairro,
    cep: data.cep,
    cidade: data.cidade,
    complemento: data.complemento,
    criado_em: Datetime.create().toDateTime,
    estado: data.estado,
    logradouro: data.logradouro,
    numero: data.numero,
  };
  if (data.advogado_uuid) variables.advogado_uuid = data.advogado_uuid;
  if (data.pessoa_uuid) variables.pessoa_uuid = data.pessoa_uuid;
  variables = removeEmptyKeysInObject(variables);
  return variables;
}
