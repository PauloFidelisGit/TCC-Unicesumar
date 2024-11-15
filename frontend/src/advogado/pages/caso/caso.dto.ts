import { Datetime } from "@/domain/vo/datetime.vo";
import { QueryFindCasoDTO } from "./caso.queries";

export function mapFindCasoToForm(data: QueryFindCasoDTO) {
  const mappedDate = {
    titulo: data.titulo || "",
    descricao: data.descricao || "",
    data_abertura: new Datetime(data.data_abertura)?.toDateTimeLocal,
    data_encerramento:
      new Datetime(data.data_encerramento)?.toDateTimeLocal || "",
  };

  return mappedDate;
}
export type MapFindCasoToFormDTO = ReturnType<typeof mapFindCasoToForm>;
