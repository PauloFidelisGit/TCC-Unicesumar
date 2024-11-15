import { Datetime } from "@/domain/vo/datetime.vo";
import { nullableEmptyKeysInObject } from "@/lib/utils";
import { UpdateTribunalArgs } from "backend/types";
import { QueryFindTribunalDTO } from "./tribunal.queries";
import { EditTribunalFormValues } from "./tribunal.schema";

export function mapFindToForm(data: QueryFindTribunalDTO) {
  return {
    nome: data?.nome || "",
  };
}

export function mapUpdateToApi(
  uuid: string,
  data: EditTribunalFormValues,
): UpdateTribunalArgs {
  return nullableEmptyKeysInObject({
    uuid,
    data: {
      atualizado_em: Datetime.create().toDateTime,
      nome: data.nome,
    },
  });
}
