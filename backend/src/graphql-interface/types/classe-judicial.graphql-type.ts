import { GraphQLObjectType } from "graphql";
import { NonNullInt, NonNullString, String } from "./aliases.js";

export const ClasseJudicialType = new GraphQLObjectType({
  name: "ClasseJudicial",
  fields: {
    id: NonNullInt,
    uuid: NonNullString,
    criado_em: NonNullString,
    atualizado_em: String,
    nome: NonNullString,
    codigo: NonNullString,
  },
});
