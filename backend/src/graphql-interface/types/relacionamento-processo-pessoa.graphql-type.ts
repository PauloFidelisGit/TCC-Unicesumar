import { NonNullInt, NonNullString } from "./aliases.js";

export const RawFieldsRelacionamentoProcessoPessoaType = {
  id: NonNullInt,
  uuid: NonNullString,
  criado_em: NonNullString,
  atualizado_em: String,
  processo_uuid: NonNullString,
  pessoa_uuid: NonNullString,
  tipo_relacionamento: NonNullString,
};
