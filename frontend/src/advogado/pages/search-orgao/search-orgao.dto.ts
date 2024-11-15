import { Datetime } from "@/domain/vo/datetime.vo";
import { QuerySearchOrgaoDTO } from "./search-orgao.queries";

export function mapQueryDTOToView(Orgaos: QuerySearchOrgaoDTO[]) {
  return Orgaos.map((v) => {
    return {
      id: v.id,
      uuid: v.uuid,
      criado_em: new Datetime(v.criado_em).DDMMYYYY,
      atualizado_em: new Datetime<string | null>(v.atualizado_em)?.DDMMYYYY,
      nome: v.nome,
    };
  });
}
