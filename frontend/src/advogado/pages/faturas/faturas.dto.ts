import { Datetime } from "@/domain/vo/datetime.vo";
import { FloatValue } from "@/domain/vo/float-value";
import { QueryListFaturaDTO } from "./faturas.queries";

export function mapQueryListFaturaDTOToView(data: QueryListFaturaDTO["data"]) {
  return data.map((v) => {
    return {
      uuid: v.uuid,
      criado_em: new Datetime(v.criado_em).DDMMYYYY,
      atualizado_em: new Datetime<string | null>(v.atualizado_em)?.DDMMYYYY,
      data_emissao: new Datetime(v.data_emissao).DDMMYYYY,
      valor_total: new FloatValue(v.valor_total).currency,
    };
  });
}
export type MapQueryListFaturaDTOToViewDTO = ReturnType<
  typeof mapQueryListFaturaDTOToView
>;
