import { Datetime } from "@/domain/vo/datetime.vo";
import { QuerySearchOrgaoDTO } from "./select-orgao.queries";

export function mapQueryDTOToView(data?: QuerySearchOrgaoDTO[]) {
  return (
    data?.map((v) => {
      return {
        id: v.id,
        uuid: v.uuid,
        criado_em: new Datetime(v.criado_em).DDMMYYYY,
        atualizado_em: new Datetime<string | null>(v.atualizado_em)?.DDMMYYYY,
        nome: v.nome,
      };
    }) || []
  );
}
export type MapQueryDTOToView = ReturnType<typeof mapQueryDTOToView>;
