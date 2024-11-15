import { Datetime } from "@/domain/vo/datetime.vo";
import { FloatValue } from "@/domain/vo/float-value";
import {
  formatProcessNumber,
  nullableEmptyKeysInObject,
  setBlankStringIfUndefinedOrNull,
} from "@/lib/utils";
import { UpdateOrdemServicoArgs } from "backend/types";
import { QueryFindOrdemServicoDTO } from "./ordem-servico.queries";
import { UpdateOrdemServicoFormValues } from "./ordem-servico.schema";

export function mapUpdateOrdemServicoToApi(args: {
  uuid: string;
  data: UpdateOrdemServicoFormValues;
}): UpdateOrdemServicoArgs {
  return nullableEmptyKeysInObject({
    uuid: args.uuid,
    data: {
      atualizado_em: Datetime.create().toDateTime,
      descricao: args.data.descricao,
      data_abertura: new Datetime(args.data.data_abertura).toDateTime,
      data_conclusao: new Datetime(args.data.data_conclusao)?.toDateTime,
      data_cancelamento: new Datetime(args.data.data_cancelamento)?.toDateTime,
      prazo_conclusao: new Datetime(args.data.prazo_conclusao)?.toDateTime,
      status: args.data.status,
      prioridade: args.data.prioridade,
      valor_servico: FloatValue.parseFloatOrZero(args.data.valor_servico).value,
      servico_uuid: args.data.servico.value,
      processo_uuid: args.data.processo.value,
      caso_uuid: args.data.caso.value,
    },
  });
}

export function mapQueryFindOrdemServicoDTOToForm(
  data: QueryFindOrdemServicoDTO,
) {
  return setBlankStringIfUndefinedOrNull({
    descricao: data.descricao,
    data_abertura: new Datetime(data.data_abertura)?.toDateTimeLocal,
    data_conclusao: new Datetime(data.data_conclusao)?.toDateTimeLocal,
    data_cancelamento: new Datetime(data.data_cancelamento)?.toDateTimeLocal,
    prazo_conclusao: new Datetime(data.prazo_conclusao)?.toDateTimeLocal,
    status: data.status,
    prioridade: data.prioridade,
    valor_servico: new FloatValue(data.valor_servico)?.formatDecimalBr(),
    servico: {
      label: data.servico?.nome,
      value: data.servico_uuid,
    },
    fatura: {
      label: data.fatura_uuid,
      value: data.fatura_uuid,
    },
    processo: {
      label: data.processo?.numero
        ? formatProcessNumber(data.processo.numero)
        : undefined,
      value: data.processo_uuid,
    },
    caso: {
      label: data.caso?.titulo,
      value: data.caso_uuid,
    },
  });
}
