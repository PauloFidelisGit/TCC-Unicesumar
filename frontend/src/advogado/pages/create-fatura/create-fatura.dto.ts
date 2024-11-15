import { Datetime } from "@/domain/vo/datetime.vo";
import { FloatValue } from "@/domain/vo/float-value";
import { removeEmptyKeysInObject } from "@/lib/utils";
import { CreateFaturaArgs } from "backend/types";
import { FormValues } from "./create-fatura.schema";
import { CreateParcelasFromFatura } from "./create-fatura.utils";

type MapCreateFaturaToApi = {
  fatura: {
    valor_total: string;
    data_emissao: string;
    observacoes: string | undefined;
    criado_por_advogado_uuid: string;
  };
  parcelas: {
    numero: string;
    valor: string;
    data_vencimento: string;
  }[];
  ordens_servico: {
    uuid: string;
  }[];
};

export function mapCreateFaturaToApi({
  fatura,
  ordens_servico,
  parcelas,
}: MapCreateFaturaToApi): CreateFaturaArgs {
  return removeEmptyKeysInObject({
    criado_em: Datetime.create().toDateTime,
    fatura: {
      valor_total: FloatValue.fromCurrencyString(fatura.valor_total).value,
      data_emissao: new Datetime(fatura.data_emissao).toDate,
      observacoes: fatura.observacoes,
      criado_por_advogado_uuid: fatura.criado_por_advogado_uuid,
    },
    parcelas: parcelas.map((v) => ({
      numero: +v.numero,
      valor: FloatValue.fromCurrencyString(v.valor).value,
      data_vencimento: new Datetime(v.data_vencimento).toDate,
    })),
    ordens_servico: ordens_servico.map((v) => ({
      uuid: v.uuid,
    })),
  });
}

export function mapCreateParcelas(
  data: CreateParcelasFromFatura,
): FormValues["parcelas"] {
  return data.map((item) => ({
    numero: String(item.numero),
    valor: new FloatValue(item.valor).formatDecimalBr(),
    data_vencimento: new Datetime(item.data_vencimento).toDate,
  }));
}
