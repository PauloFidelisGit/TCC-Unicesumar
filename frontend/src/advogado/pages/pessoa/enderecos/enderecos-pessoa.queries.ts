import { TypedDocumentNode, gql } from "@apollo/client";
import type {
  CreateEnderecoArgs,
  CreateEnderecoReturn,
  DeleteAdvogadoArgs,
  PickSearchEnderecoReturnData,
  SearchEnderecoArgs,
  UpdateEnderecoArgs,
} from "backend/types";

export type QuerySearchEnderecoDTO = PickSearchEnderecoReturnData<{
  uuid: string;
  criado_em: string;
  atualizado_em: string | null;
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
  DeleteAdvogadoArgs
> = gql`
  mutation Mutation($uuid: String!) {
    deleteEndereco(uuid: $uuid)
  }
`;

export const MUTATION_CREATE_ENDERECO: TypedDocumentNode<
  {
    createEndereco: CreateEnderecoReturn;
  },
  CreateEnderecoArgs
> = gql`
  mutation CreateEndereco(
    $criado_em: String!
    $logradouro: String
    $numero: String
    $complemento: String
    $bairro: String
    $cidade: String
    $estado: String
    $cep: String
    $advogado_uuid: String
    $pessoa_uuid: String
  ) {
    createEndereco(
      criado_em: $criado_em
      logradouro: $logradouro
      numero: $numero
      complemento: $complemento
      bairro: $bairro
      cidade: $cidade
      estado: $estado
      cep: $cep
      advogado_uuid: $advogado_uuid
      pessoa_uuid: $pessoa_uuid
    ) {
      uuid
    }
  }
`;

export const MUTATION_UPDATE_ENDERECO: TypedDocumentNode<
  {
    updateEndereco: boolean;
  },
  UpdateEnderecoArgs
> = gql`
  mutation UpdateEndereco($uuid: String!, $data: updateEndereco_data) {
    updateEndereco(uuid: $uuid, data: $data)
  }
`;
