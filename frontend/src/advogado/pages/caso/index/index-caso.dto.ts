import { Datetime } from "@/domain/vo/datetime.vo";
import { nullableEmptyKeysInObject } from "@/lib/utils";
import { UpdateCasoArgs } from "backend/types";
import { FormValues } from "./index-caso.schema";

export function mapUpdateCasoToApi(
  uuid: string,
  data: FormValues,
): UpdateCasoArgs {
  return nullableEmptyKeysInObject({
    uuid,
    data: {
      atualizado_em: Datetime.create().toDateTime,
      titulo: data.titulo,
      descricao: data.descricao,
      data_abertura: new Datetime(data.data_abertura)?.toDateTime,
      data_encerramento: new Datetime(data.data_encerramento)?.toDateTime,
    },
  });
}
