import { GraphQLObjectType } from "graphql";
import { NonNullInt, NonNullString, String } from "./aliases.js";

export const AdminType = new GraphQLObjectType({
  name: "Admin",
  fields: {
    id: NonNullInt,
    criado_em: NonNullString,
    atualizado_em: String,
    uuid: NonNullString,
    nome: NonNullString,
    login: NonNullString,
    senha: NonNullString,
  },
});
