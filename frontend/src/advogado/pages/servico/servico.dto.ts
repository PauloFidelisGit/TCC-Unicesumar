import { Datetime } from "@/domain/vo/datetime.vo";
import { nullableEmptyKeysInObject } from "@/lib/utils";
import { UpdateServicoArgs } from "backend/types";
import { QueryFindOrgaoDTO } from "../orgao/orgao.queries";
import { EditOrgaoFormValues } from "../orgao/orgao.schema";

export function mapUpdateServicoToApi(
  uuid: string,
  data: EditOrgaoFormValues,
): UpdateServicoArgs {
  return nullableEmptyKeysInObject({
    uuid,
    data: {
      atualizado_em: Datetime.create().toDateTime,
      nome: data.nome,
    },
  });
}

export function mapQueryFindServicoDTOToForm(data: QueryFindOrgaoDTO) {
  return {
    nome: data?.nome || "",
  };
}
