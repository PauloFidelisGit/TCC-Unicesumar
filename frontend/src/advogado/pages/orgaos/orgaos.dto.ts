import { Datetime } from "@/domain/vo/datetime.vo";
import { QueryListOrgaoDTO } from "./orgaos.queries";

export function mapListToView(data: QueryListOrgaoDTO[]) {
  return data.map((v) => {
    return {
      id: v.id,
      uuid: v.uuid,
      criado_em: new Datetime(v.criado_em).DDMMYYYY,
      atualizado_em: new Datetime<string | null>(v.atualizado_em)?.DDMMYYYY,
      nome: v.nome,
    };
  });
}
export type MapListToViewDTO = ReturnType<typeof mapListToView>;
