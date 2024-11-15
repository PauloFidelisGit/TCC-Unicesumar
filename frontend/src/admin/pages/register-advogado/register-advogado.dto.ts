import { ESTADO_CIVIL } from "@/domain/enums";
import { Datetime } from "@/domain/vo/datetime.vo";
import { onlyNumbers, removeEmptyKeysInObject } from "@/lib/utils";
import { CreateAdvogadoArgsDTO } from "./register-advogado.queries";
import { CreateAdvogadoFormValues } from "./register-advogado.schema";

export function mapCreateFormToApi(
  data: CreateAdvogadoFormValues,
): CreateAdvogadoArgsDTO {
  return removeEmptyKeysInObject({
    criado_em: Datetime.create().toDateTime,
    nome: data.nome,
    senha: data.senha,
    telefones: data?.telefones?.map((telefone) => telefone.value),
    oab: data.oab,
    cpf: onlyNumbers(data.cpf),
    data_nascimento: data.data_nascimento,
    emails: data?.emails?.map((email) => email.value),
    nacionalidade: data.nacionalidade,
    estado_civil: data.estado_civil as ESTADO_CIVIL,
  });
}
