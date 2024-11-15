import { QuerySearchCasoDTO } from "./select-caso.queries";

export function mapQuerySearchCasoDTOToView(data?: QuerySearchCasoDTO[]) {
  return (
    data?.map((v) => {
      return {
        uuid: v.uuid,
        titulo: v.titulo,
      };
    }) || []
  );
}
export type MapQuerySearchCasoDTOToView = ReturnType<
  typeof mapQuerySearchCasoDTOToView
>;
