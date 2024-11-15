import { Datetime } from "@/domain/vo/datetime.vo";
import { QueryListPessoaDTO } from "./pessoas.queries";

export function mapQueryDTOToView(data: QueryListPessoaDTO[]) {
  return data.map((v) => {
    return {
      uuid: v.uuid,
      criado_em: new Datetime(v.criado_em).DDMMYYYY,
      atualizado_em: new Datetime<string | null>(v.atualizado_em)?.DDMMYYYY,
      nome: v.nome,
      nome_fantasia: v.nome_fantasia,
    };
  });
}
export type MapQueryDTOToView = ReturnType<typeof mapQueryDTOToView>;
