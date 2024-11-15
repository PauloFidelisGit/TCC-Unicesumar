import { Datetime } from "@/domain/vo/datetime.vo";
import { FloatValue } from "@/domain/vo/float-value";
import { removeEmptyAndNullKeysInObject } from "@/lib/utils";
import { CreateProcessoArgsDTO } from "./register-processo.queries";
import { FormSchema } from "./register-processo.schema";

export function mapCreateToApi(
  data: FormSchema & { criado_por_advogado_uuid: string },
): CreateProcessoArgsDTO {
  return removeEmptyAndNullKeysInObject({
    criado_em: Datetime.create().toDateTime,
    numero: data.numero.replace(/[^\d]+/g, ""),
    data_autuacao: data.data_autuacao,
    valor_causa: FloatValue.parseFloatOrZero(data.valor_causa)?.value,
    segredo_justica: data.segredo_justica,
    tutela_urgencia: data.tutela_urgencia,
    criado_por_advogado_uuid: data.criado_por_advogado_uuid,
    orgao_uuid: data.orgao.value,
    classe_judicial_uuid: data.classe_judicial.value,
  });
}
