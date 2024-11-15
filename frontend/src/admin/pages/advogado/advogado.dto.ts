import { ESTADO_CIVIL } from "@/domain/enums";
import {
  formatCellPhoneNumber,
  formatCPF,
  nullableEmptyKeysInObject,
  nullableFieldArrayIfEmpty,
  onlyNumbers,
} from "@/lib/utils";
import type { UpdateAdvogadoArgs } from "backend/types";
import { QueryFindAdvogadoDTO } from "./advogado.queries";
import { UpdateAdvogadoFormValues } from "./advogado.schema";
import { Datetime } from "@/domain/vo/datetime.vo";

export function mapQueryFindAdvogadoToForm(
  values: QueryFindAdvogadoDTO,
): UpdateAdvogadoFormValues {
  return {
    cpf: values?.cpf ? formatCPF(values?.cpf) : "",
    data_nascimento: values?.data_nascimento ?? "",
    emails: values?.emails?.map((value) => ({ value })) ?? [],
    estado_civil: values?.estado_civil ?? ("" as ESTADO_CIVIL),
    nacionalidade: values?.nacionalidade ?? "",
    nome: values?.nome ?? "",
    oab:
      values?.oab?.map(({ letra, numero, uf }) => ({ letra, numero, uf })) ??
      [],
    telefones:
      values?.telefones?.map((value) => ({
        value: formatCellPhoneNumber(value),
      })) ?? [],
  };
}
export type MapFindAdvogado = ReturnType<typeof mapQueryFindAdvogadoToForm>;

export function mapEditAdvogadoToApi(
  uuid: string,
  data: UpdateAdvogadoFormValues,
): UpdateAdvogadoArgs {
  let variables: UpdateAdvogadoArgs = {
    uuid,
    data: {
      atualizado_em: Datetime.create().toDateTime,
      cpf: onlyNumbers(data.cpf),
      data_nascimento: data.data_nascimento,
      emails: nullableFieldArrayIfEmpty(data?.emails),
      estado_civil: data.estado_civil as ESTADO_CIVIL,
      nacionalidade: data.nacionalidade,
      nome: data.nome,
      oab: data.oab,
      telefones: nullableFieldArrayIfEmpty(data.telefones, onlyNumbers),
    },
  };
  variables = nullableEmptyKeysInObject(variables);

  console.log("🚀 ~ file: advogado.dto.ts:54 ~ variables:", variables);

  return variables;
}
