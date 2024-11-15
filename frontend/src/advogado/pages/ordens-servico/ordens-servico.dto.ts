import { Datetime } from "@/domain/vo/datetime.vo";
import { QueryListOrdemServicoDTO } from "./ordens-servico.queries";

export function mapQueryListOrdemServicoDTOToView(
  data: QueryListOrdemServicoDTO["data"],
) {
  return data.map((v) => {
    return {
      uuid: v.uuid,
      numero: String(v.numero).padStart(6, "0"),
      data_abertura: new Datetime(v.data_abertura).DDMMYYYY,
      status: v.status,
    };
  });
}
export type MapQueryListOrdemServicoDTOToView = ReturnType<
  typeof mapQueryListOrdemServicoDTOToView
>;
