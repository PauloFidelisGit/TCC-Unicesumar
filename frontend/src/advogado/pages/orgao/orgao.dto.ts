import { Datetime } from "@/domain/vo/datetime.vo";
import { nullableEmptyKeysInObject } from "@/lib/utils";
import { QueryFindOrgaoDTO } from "./orgao.queries";
import { EditOrgaoFormValues } from "./orgao.schema";

export function mapUpdateToApi(uuid: string, data: EditOrgaoFormValues) {
  return nullableEmptyKeysInObject({
    uuid,
    data: {
      atualizado_em: Datetime.create().toDateTime,
      nome: data.nome,
    },
  });
}

export function mapQueryFindOrgaoDTOToForm(data: QueryFindOrgaoDTO) {
  return {
    nome: data?.nome || "",
  };
}
