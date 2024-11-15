import { Datetime } from "@/domain/vo/datetime.vo";
import { QuerySearchTribunalDTO } from "./search-tribunal.queries";

export function mapQueryDTOToView(data: QuerySearchTribunalDTO[]) {
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
