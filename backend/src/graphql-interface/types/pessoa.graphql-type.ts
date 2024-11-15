import { GraphQLList, GraphQLObjectType } from "graphql";
import { enderecosPessoaFieldResolver } from "../field-config/pessoa/enderecos-pessoa.field-resolver.js";
import { ArrayString, NonNullInt, NonNullString, String } from "./aliases.js";
import { EnderecoType } from "./endereco.graphql-type.js";

export const PessoaType = new GraphQLObjectType({
  name: "Pessoa",
  fields: {
    id: NonNullInt,
    uuid: NonNullString,
    criado_em: NonNullString,
    atualizado_em: String,
    login: String,
    senha: String,
    telefones: ArrayString,
    emails: ArrayString,
    tipo_pessoa: NonNullString,
    nome: String,
    data_nascimento: String,
    nacionalidade: String,
    profissao: String,
    estado_civil: String,
    cpf: String,
    nome_fantasia: String,
    razao_social: String,
    cnpj: String,
    enderecos: {
      type: new GraphQLList(EnderecoType),
      resolve: enderecosPessoaFieldResolver,
    },
  },
});
