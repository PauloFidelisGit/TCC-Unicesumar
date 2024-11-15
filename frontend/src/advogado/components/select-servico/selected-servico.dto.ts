import { QueryPickSearchServicoDTO } from "./select-servico.queries";

export function mapQueryPickSearchServicoDTOToView(
  data?: QueryPickSearchServicoDTO[],
) {
  return data?.map((v) => {
    return {
      uuid: v.uuid,
      nome: v.nome,
    };
  })|| [];
}
export type MapQueryDTOToView = ReturnType<
  typeof mapQueryPickSearchServicoDTOToView
>;
