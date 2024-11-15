import { QuerySearchAdvogadoDTO } from "./search-advogado.queries";

export function mapQueryDTOToView(data: QuerySearchAdvogadoDTO[]) {
  return data.map((v) => {
    return {
      uuid: v.uuid,
      nome: v.nome,
    };
  });
}
