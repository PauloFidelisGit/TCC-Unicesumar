import { NonNullInt, NonNullString, String } from "./aliases.js";

export const RawFieldsRelacionamentoCasoProcessoType = {
  id: NonNullInt,
  uuid: NonNullString,
  criado_em: NonNullString,
  caso_uuid: NonNullString,
  processo_uuid: String,
};
