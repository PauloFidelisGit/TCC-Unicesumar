import { GraphQLObjectType } from "graphql";
import { NonNullInt, NonNullString, String } from "./aliases.js";

export const MunicipioType = new GraphQLObjectType({
  name: "Municipio",
  fields: {
    id: NonNullInt,
    criado_em: NonNullString,
    atualizado_em: String,
    uuid: NonNullString,
    nome: NonNullString,
    codigo: NonNullString,
    codigo_uf: NonNullString,
  },
});
