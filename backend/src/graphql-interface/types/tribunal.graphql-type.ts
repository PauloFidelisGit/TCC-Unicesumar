import { GraphQLObjectType } from "graphql";
import { NonNullInt, NonNullString, String } from "./aliases.js";

export const TribunalType = new GraphQLObjectType({
  name: "Tribunal",
  fields: {
    id: NonNullInt,
    uuid: NonNullString,
    criado_em: NonNullString,
    atualizado_em: String,
    nome: NonNullString,
  },
});
