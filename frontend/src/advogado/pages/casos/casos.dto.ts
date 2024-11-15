import { Datetime } from "@/domain/vo/datetime.vo";
import { QueryListCasoDTO } from "./casos.queries";

export function mapListToView(data: QueryListCasoDTO[]) {
  console.log("🚀 ~ file: casos.dto.ts:6 ~ mapListToView ~ data:", data);

  return data.map((v) => ({
    id: v.id,
    uuid: v.uuid,
    criado_em: new Datetime(v.criado_em).DDMMYYYY,
    atualizado_em: new Datetime(v.atualizado_em)?.DDMMYYYY,
    titulo: v.titulo,
  }));
}
export type MapListToViewDTO = ReturnType<typeof mapListToView>;
