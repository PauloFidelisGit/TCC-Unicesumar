import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
} from "graphql";
import { enderecosAdvogadoFieldResolver } from "../field-config/advogado/enderecos-advogado.field-resolver.js";
import {
  ArrayString,
  NonNullInt,
  NonNullString,
  NonNullStringList,
  String,
} from "./aliases.js";
import { EnderecoType } from "./endereco.graphql-type.js";

const RawFieldsOab = {
  numero: NonNullString,
  uf: NonNullString,
  letra: NonNullString,
};
export const OabInput = new GraphQLInputObjectType({
  name: "OabInput",
  fields: RawFieldsOab,
});
const OabType = new GraphQLObjectType({
  name: "Oab",
  fields: RawFieldsOab,
});

export const AdvogadoType = new GraphQLObjectType({
  name: "Advogado",
  fields: {
    id: NonNullInt,
    uuid: NonNullString,
    criado_em: NonNullString,
    atualizado_em: String,
    login: NonNullString,
    senha: String,
    telefones: ArrayString,
    emails: ArrayString,
    nome: NonNullString,
    nacionalidade: String,
    data_nascimento: String,
    estado_civil: String,
    cpf: String,
    oab: { type: new GraphQLList(OabType) },
    permissoes: NonNullStringList,
    enderecos: {
      type: new GraphQLList(EnderecoType),
      resolve: enderecosAdvogadoFieldResolver,
    },
  },
});
