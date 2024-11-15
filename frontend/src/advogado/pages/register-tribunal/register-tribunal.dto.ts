import { Datetime } from "@/domain/vo/datetime.vo";
import { removeEmptyKeysInObject } from "@/lib/utils";
import { CreateTribunalArgsDTO } from "./register-tribunal.queries";
import { FormValues } from "./register-tribunal.schema";

export function mapCreateFormToApi(data: FormValues): CreateTribunalArgsDTO {
  let variables = {
    criado_em: Datetime.create().toDateTime,
    nome: data.nome,
  };
  variables = removeEmptyKeysInObject(variables);
  return variables;
}
