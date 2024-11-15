import { Datetime } from "@/domain/vo/datetime.vo";
import { removeEmptyKeysInObject } from "@/lib/utils";
import { CreateCasoArgs } from "backend/types";
import { FormSchema } from "./register-caso.schema";

export function mapCreateToApi(
  data: FormSchema & {
    criado_por_advogado_uuid: string;
  },
): CreateCasoArgs {
  return removeEmptyKeysInObject({
    criado_em: Datetime.create().toDateTime,
    titulo: data.titulo,
    descricao: data.descricao,
    data_abertura: new Datetime(data.data_abertura)?.toDateTime,
    data_encerramento: new Datetime(data.data_encerramento)?.toDateTime,
    criado_por_advogado_uuid: data.criado_por_advogado_uuid,
  });
}
