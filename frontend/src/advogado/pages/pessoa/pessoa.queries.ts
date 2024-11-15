import { ESTADO_CIVIL, TIPO_PESSOA } from "@/domain/enums";
import { Datetime } from "@/domain/vo/datetime.vo";
import { gql, TypedDocumentNode } from "@apollo/client";
import type {
  DeleteEnderecoArgs,
  FindPessoaArgs,
  PickFindPessoaReturn,
  PickSearchEnderecoReturnData,
  SearchEnderecoArgs,
  UpdatePessoaArgs,
} from "backend/types";

export type QueryFindPessoaPF = PickFindPessoaReturn<{
  criado_em?: Datetime<string>["toDateTime"];
  atualizado_em: Datetime<string | null>["toDateTime"];
  telefones: string[] | null;
  emails: string[] | null;
  nome: string | null;
  data_nascimento: string | null;
  nacionalidade: string | null;
  profissao: string | null;
  estado_civil: ESTADO_CIVIL | null;
  cpf: string | null;
  tipo_pessoa: TIPO_PESSOA.PF;
}>;

export type QueryFindPessoaPJ = PickFindPessoaReturn<{
  criado_em?: Datetime<string>["toDateTime"];
  atualizado_em?: Datetime<string>["toDateTime"];
  telefones: string[] | null;
  emails: string[] | null;
  nome_fantasia: string | null;
  razao_social: string | null;
  cnpj: string | null;
  tipo_pessoa: TIPO_PESSOA.PJ;
}>;

export const QUERY_FIND_PESSOA: TypedDocumentNode<
  {
    findPessoa: QueryFindPessoaPJ | QueryFindPessoaPF;
  },
  FindPessoaArgs
> = gql`
  query Query($where: String!, $value: String!) {
    findPessoa(where: $where, value: $value) {
      uuid
      criado_em
      atualizado_em
      tipo_pessoa
      telefones
      emails
      nome
      data_nascimento
      nacionalidade
      profissao
      estado_civil
      cpf
      nome_fantasia
      razao_social
      cnpj
    }
  }
`;

export type QuerySearchEnderecoDTO = PickSearchEnderecoReturnData<{
  uuid: string;
  criado_em: string;
  atualizado_em: string;
  logradouro: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  cidade: string | null;
  estado: string | null;
  cep: string | null;
}>;

export const QUERY_SEARCH_ENDERECOS: TypedDocumentNode<
  {
    searchEndereco: QuerySearchEnderecoDTO[];
  },
  SearchEnderecoArgs
> = gql`
  query SearchEndereco($where: String!, $value: String!, $limit: Int!) {
    searchEndereco(where: $where, value: $value, limit: $limit) {
      uuid
      criado_em
      atualizado_em
      logradouro
      numero
      complemento
      bairro
      cidade
      estado
      cep
    }
  }
`;

export const MUTATION_DELETE_ENDERECO: TypedDocumentNode<
  {
    deleteEndereco: true;
  },
  DeleteEnderecoArgs
> = gql`
  mutation Mutation($uuid: String!) {
    deleteEndereco(uuid: $uuid)
  }
`;

export const MUTATION_UPDATE_PESSOA: TypedDocumentNode<
  {
    updatePessoa: true;
  },
  UpdatePessoaArgs
> = gql`
  mutation UpdatePessoa(
    $uuid: String!
    $tipo_pessoa: String!
    $data: updatePessoa_data
  ) {
    updatePessoa(uuid: $uuid, tipo_pessoa: $tipo_pessoa, data: $data)
  }
`;
