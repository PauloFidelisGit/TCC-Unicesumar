import { Datetime } from "@/domain/vo/datetime.vo";
import { removeEmptyKeysInObject } from "@/lib/utils";
import { CreateServicoArgs } from "backend/types";
import { CreateServicoFormValues } from "./register-servico.schema";

export function mapCreateServicoFormValuesToApi(
  data: CreateServicoFormValues,
): CreateServicoArgs {
  return removeEmptyKeysInObject({
    criado_em: Datetime.create().toDateTime,
    nome: data.nome,
  });
}
