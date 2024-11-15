import { Datetime } from "@/domain/vo/datetime.vo";
import { QueryListTribunalDTO } from "./tribunais.queries";

export function mapListToView(data: QueryListTribunalDTO[]) {
  return data.map((v) => {
    return {
      id: v.id,
      uuid: v.uuid,
      criado_em: new Datetime(v.criado_em).DDMMYYYY,
      atualizado_em: new Datetime(v.atualizado_em)
        ?.DDMMYYYY,
      nome: v.nome,
    };
  });
}
export type MapListToViewDTO = ReturnType<typeof mapListToView>;
