import { Datetime } from "@/domain/vo/datetime.vo";
import { QuerySearchAnotacoesProcessoDTO } from "./anotacoes-processo.queries";

export function mapQuerySearchAnotacoesProcessoToView(
  data: QuerySearchAnotacoesProcessoDTO[],
) {
  const mappedValues = data
    .map((v) => ({
      uuid: v.uuid || "",
      criado_em: new Datetime(v.criado_em).DDMMYYYY || "",
      atualizado_em: new Datetime(v.atualizado_em)?.DDMMYYYY || "",
      titulo: v.titulo || "",
      descricao: v.descricao || "",
      advogado: {
        value: v.criado_por_advogado_uuid || "",
        label: v.advogado?.nome || "",
      },
    }))
    .sort((a, b) => {
      const dateA = new Date(a.criado_em).getTime();
      const dateB = new Date(b.criado_em).getTime();
      return dateB - dateA;
    });
  return mappedValues;
}
export type MapQuerySearchAnotacoesProcessoToViewDTO = ReturnType<
  typeof mapQuerySearchAnotacoesProcessoToView
>;
export type TypeAnotacaoProcesso =
  MapQuerySearchAnotacoesProcessoToViewDTO[number];
