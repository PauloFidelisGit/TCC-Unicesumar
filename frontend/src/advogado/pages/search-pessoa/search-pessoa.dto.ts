import { Datetime } from "@/domain/vo/datetime.vo";
import { QuerySearchPessoaDTO } from "./search-pessoa.queries";

export function mapQueryDTOToView(data: QuerySearchPessoaDTO[]) {
  return data.map((v) => {
    return {
      uuid: v.uuid,
      criado_em: new Datetime(v.criado_em).DDMMYYYY,
      atualizado_em: new Datetime<string | null>(v.atualizado_em)?.DDMMYYYY,
      nome: v.nome || v.nome_fantasia || "",
    };
  });
}
