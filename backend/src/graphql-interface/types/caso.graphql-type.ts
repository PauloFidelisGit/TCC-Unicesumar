import { GraphQLObjectType } from "graphql";
import { NonNullInt, NonNullString, String } from "./aliases.js";

export const CasoType = new GraphQLObjectType({
  name: "Caso",
  fields: {
    id: NonNullInt,
    uuid: NonNullString,
    criado_em: NonNullString,
    atualizado_em: String,
    titulo: NonNullString,
    descricao: String,
    data_abertura: NonNullString,
    data_encerramento: String,
    criado_por_advogado_uuid: NonNullString,
  },
});
