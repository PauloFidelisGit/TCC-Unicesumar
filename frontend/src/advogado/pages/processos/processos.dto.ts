import { Datetime } from "@/domain/vo/datetime.vo";
import { formatProcessNumber } from "@/lib/utils";
import { QueryListProcessoApiDTO } from "./processos.queries";

export function mapListToView(data: QueryListProcessoApiDTO[]) {
  return data.map((v) => {
    return {
      uuid: v.uuid,
      criado_em: new Datetime(v.criado_em).DDMMYYYY,
      atualizado_em: new Datetime<string | null>(v.atualizado_em)?.DDMMYYYY,
      numero: formatProcessNumber(v.numero),
    };
  });
}
export type MapListToViewDTO = ReturnType<typeof mapListToView>;
