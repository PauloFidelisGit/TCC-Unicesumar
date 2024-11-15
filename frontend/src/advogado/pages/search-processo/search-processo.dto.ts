import { formatProcessNumber } from "@/lib/utils";
import { QuerySearchProcessoDTO } from "./search-processo.queries";

export function mapQueryDTOToView(value: QuerySearchProcessoDTO[]) {
  return value.map((v) => {
    return {
      uuid: v.uuid,
      numero: formatProcessNumber(v.numero),
    };
  });
}
