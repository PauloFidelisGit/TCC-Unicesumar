import { GraphQLObjectType } from "graphql";
import { NonNullString, String } from "./aliases.js";

export const EnderecoType = new GraphQLObjectType({
  name: "Endereco",
  fields: {
    uuid: NonNullString,
    criado_em: NonNullString,
    atualizado_em: String,
    logradouro: String,
    numero: String,
    complemento: String,
    bairro: String,
    cidade: String,
    estado: String,
    cep: String,
    advogado_uuid: String,
    pessoa_uuid: String,
  },
});
