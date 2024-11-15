import { FloatValue } from "@/domain/vo/float-value";
import { QuerySearchOrdemServicoDTO } from "./select-ordem-servico.queries";

export function mapQuerySearchOrdemServicoDTOToView(
  data?: QuerySearchOrdemServicoDTO[],
) {
  return (
    data?.map((v) => {
      return {
        uuid: v.uuid,
        numero: String(v.numero).padStart(6, "0"),
        valor_servico: new FloatValue(v.valor_servico)?.currency,
      };
    }) || []
  );
}
export type MapQuerySearchOrdemServicoDTOToView = ReturnType<
  typeof mapQuerySearchOrdemServicoDTOToView
>;
