import { QueryListServicoDTO } from "./servicos.queries";

export function mapQueryListServicoDTOToView(
  data: QueryListServicoDTO["data"],
) {
  return data.map((v) => {
    return {
      uuid: v.uuid,
      nome: v.nome,
    };
  });
}
export type MapQueryListServicoDataToViewDTO = ReturnType<
  typeof mapQueryListServicoDTOToView
>;
