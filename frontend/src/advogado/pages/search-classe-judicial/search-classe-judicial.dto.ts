import { Datetime } from "@/domain/vo/datetime.vo";
import { QuerySearchClasseJudicialDTO } from "./search-classe-judicial.queries";

export function mapQueryDTOToView(data: QuerySearchClasseJudicialDTO[]) {
  return data.map((v) => {
    return {
      id: v.id,
      uuid: v.uuid,
      criado_em: new Datetime(v.criado_em).DDMMYYYY,
      atualizado_em: new Datetime<string | null>(v.atualizado_em)?.DDMMYYYY,
      nome: v.nome,
      codigo: v.codigo,
    };
  });
}
