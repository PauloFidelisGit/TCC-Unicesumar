import { Datetime } from "@/domain/vo/datetime.vo";
import { FloatValue } from "@/domain/vo/float-value";
import { nullableEmptyKeysInObject, onlyNumbers } from "@/lib/utils";
import type { UpdateProcessoArgs } from "backend/types";
import { UpdateProcessoFormValues } from "./index-processo.schemas";

export function mapUpdateToApi(
  uuid: string,
  data: UpdateProcessoFormValues,
): UpdateProcessoArgs {
  return nullableEmptyKeysInObject<UpdateProcessoArgs>({
    uuid,
    data: {
      atualizado_em: Datetime.create().toDateTime,
      numero: onlyNumbers(data.numero),
      data_autuacao: data.data_autuacao,
      valor_causa: FloatValue.parseFloatOrZero(data.valor_causa).value,
      segredo_justica: data.segredo_justica,
      tutela_urgencia: data.tutela_urgencia,
      orgao_uuid: data.orgao.value,
      classe_judicial_uuid: data.classe_judicial.value,
    },
  });
}
