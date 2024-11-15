import { formatProcessNumber } from "@/lib/utils";
import { QuerySearchProcessosDTO } from "./select-processo.queries";

export function mapQuerySearchProcessosDTOToView(
  data?: QuerySearchProcessosDTO[],
) {
  return (
    data?.map((v) => {
      return {
        uuid: v.uuid,
        numero: formatProcessNumber(v.numero),
      };
    }) || []
  );
}
export type MapQuerySearchProcessosDTOToView = ReturnType<
  typeof mapQuerySearchProcessosDTOToView
>;
