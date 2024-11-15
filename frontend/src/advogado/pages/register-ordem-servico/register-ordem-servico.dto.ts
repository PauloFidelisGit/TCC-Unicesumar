import { Datetime } from "@/domain/vo/datetime.vo";
import { FloatValue } from "@/domain/vo/float-value";
import { removeEmptyKeysInObject } from "@/lib/utils";
import { CreateOrdemServicoArgs } from "backend/types";
import { CreateOrdemServicoFormValues } from "./register-ordem-servico.schema";

export function mapCreateOrdemServicoFormValuesToApi(
  data: CreateOrdemServicoFormValues & {
    criado_por_advogado_uuid: string;
  },
): CreateOrdemServicoArgs {
  return removeEmptyKeysInObject({
    criado_em: Datetime.create().toDateTime,
    descricao: data.descricao,
    data_abertura: new Datetime(data.data_abertura).toDateTime,
    data_conclusao: new Datetime(data.data_conclusao)?.toDateTime,
    data_cancelamento: new Datetime(data.data_cancelamento)?.toDateTime,
    prazo_conclusao: new Datetime(data.prazo_conclusao)?.toDateTime,
    status: data.status,
    prioridade: data.prioridade,
    valor_servico: FloatValue.parseFloatOrZero(data.valor_servico).value,
    criado_por_advogado_uuid: data.criado_por_advogado_uuid,
    servico_uuid: data.servico.value,
    processo_uuid: data.processo.value,
    caso_uuid: data.caso.value,
  });
}
