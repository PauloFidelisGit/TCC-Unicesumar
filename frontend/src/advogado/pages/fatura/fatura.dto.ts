import { Datetime } from "@/domain/vo/datetime.vo";
import { FloatValue } from "@/domain/vo/float-value";
import {
  nullableEmptyKeysInObject,
  setBlankStringIfUndefinedOrNull,
} from "@/lib/utils";
import { UpdateFaturaArgs } from "backend/types";
import { QueryFindFaturaDTO } from "./fatura.queries";
import { FaturaFormValues } from "./fatura.schema";
import { CreateParcelasFromFatura } from "./fatura.utils";

export function mapQueryFindFaturaDTOToForm(
  props: QueryFindFaturaDTO,
): FaturaFormValues {
  const total_value_os = props.ordens_servico.reduce((acc, curr) => {
    const value = new FloatValue(curr.valor_servico).value;
    return (acc += value);
  }, 0);

  const total_value_fatura = props.parcelas.reduce((acc, curr) => {
    const value = new FloatValue(curr?.valor).value;
    return (acc += value);
  }, 0);

  return setBlankStringIfUndefinedOrNull({
    total_value_os: new FloatValue(total_value_os).formatDecimalBr(),
    total_value_fatura: new FloatValue(total_value_fatura).formatDecimalBr(),
    data_emissao: new Datetime(props.data_emissao).toDate,
    observacoes: props.observacoes || "",
    parcelas: props.parcelas.map((v) =>
      setBlankStringIfUndefinedOrNull({
        numero: String(v.numero),
        valor: new FloatValue(v.valor).formatDecimalBr(),
        data_vencimento: new Datetime(v.data_vencimento).toDate,
        data_pagamento: new Datetime(v.data_pagamento).toDate,
      }),
    ),
    ordens_servico: props.ordens_servico.map((v) => ({
      uuid: v.uuid,
      numero: String(v.numero),
      valor_servico: new FloatValue(v.valor_servico).formatDecimalBr(),
    })),
    numero_parcelas: String(props.parcelas.length),
    first_due_date: new Datetime(props.parcelas[0].data_vencimento).toDate,
  });
}

export function mapUpdateFaturaToApi(
  props: FaturaFormValues & {
    fatura_uuid: string;
  },
): UpdateFaturaArgs {
  return nullableEmptyKeysInObject({
    atualizado_em: Datetime.create().toDateTime,
    fatura: {
      uuid: props.fatura_uuid,
      valor_total: FloatValue.fromCurrencyString(props.total_value_fatura)
        .value,
      data_emissao: new Datetime(props.data_emissao).toDate,
      observacoes: props.observacoes,
    },
    parcelas: props.parcelas.map((v) =>
      nullableEmptyKeysInObject({
        numero: Number(v.numero),
        valor: FloatValue.fromCurrencyString(v.valor).value,
        data_vencimento: new Datetime(v.data_vencimento).toDate,
        data_pagamento: new Datetime(v.data_pagamento).toDate,
      }),
    ),
    ordens_servico: props.ordens_servico.map((v) =>
      nullableEmptyKeysInObject({
        uuid: v.uuid,
      }),
    ),
  });
}

export function mapCreateParcelas(
  data: CreateParcelasFromFatura,
): FaturaFormValues["parcelas"] {
  return data.map((item) => ({
    numero: String(item.numero),
    valor: new FloatValue(item.valor).formatDecimalBr(),
    data_vencimento: new Datetime(item.data_vencimento).toDate,
    data_pagamento: "",
  }));
}
