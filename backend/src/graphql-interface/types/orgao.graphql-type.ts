import { GraphQLObjectType } from "graphql";
import { NonNullInt, NonNullString, String } from "./aliases.js";

export const OrgaoType = new GraphQLObjectType({
  name: "Orgao",
  fields: {
    id: NonNullInt,
    uuid: NonNullString,
    criado_em: NonNullString,
    atualizado_em: String,
    nome: NonNullString,
    tribunal_uuid: NonNullString,
    municipio_uuid: NonNullString,
  },
});
