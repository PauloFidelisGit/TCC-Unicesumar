import { QuerySearchPessoaDTO } from "./partes-processo.queries";

export function mapSearchPessoaToView(data: QuerySearchPessoaDTO[]) {
  const mappedValues = data.map((v) => {
    const nome = v.nome || v.nome_fantasia || "";
    return {
      uuid: v.uuid,
      nome,
    };
  });
  return mappedValues;
}
export type MapSearchPessoaToViewDTO = ReturnType<typeof mapSearchPessoaToView>;
