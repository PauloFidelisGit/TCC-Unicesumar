import { Datetime } from "@/domain/vo/datetime.vo";
import { removeEmptyKeysInObject } from "@/lib/utils";
import { CreateOrgaArgsDTO } from "./register-orgao.queries";
import { CreateOrgaoFormValues } from "./register-orgao.schema";

export function mapCreateToApi(data: CreateOrgaoFormValues): CreateOrgaArgsDTO {
  return removeEmptyKeysInObject({
    criado_em: Datetime.create().toDateTime,
    nome: data.nome,
    tribunal_uuid: data.tribunal.value,
    municipio_uuid: data.municipio.value,
  });
}
