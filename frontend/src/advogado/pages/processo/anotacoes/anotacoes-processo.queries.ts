import { Datetime } from "@/domain/vo/datetime.vo";
import { TypedDocumentNode, gql } from "@apollo/client";
import type {
  CreateAnotacoesProcessoArgs,
  PickSearchAnotacoesProcessoReturn,
  SearchAnotacoesProcessoArgs,
  UpdateAnotacoesProcessoArgs,
} from "backend/types";

export const MUTATION_CREATE_ANOTACAO_PROCESSO: TypedDocumentNode<
  {
    createAnotacoesProcesso: {
      uuid: string;
    };
  },
  CreateAnotacoesProcessoArgs
> = gql`
  mutation CreateAnotacoesProcesso(
    $criado_em: String!
    $titulo: String!
    $processo_uuid: String!
    $criado_por_advogado_uuid: String!
    $descricao: String
  ) {
    createAnotacoesProcesso(
      criado_em: $criado_em
      titulo: $titulo
      processo_uuid: $processo_uuid
      criado_por_advogado_uuid: $criado_por_advogado_uuid
      descricao: $descricao
    ) {
      uuid
    }
  }
`;

export const MUTATION_UPDATE_ANOTACAO_PROCESSO: TypedDocumentNode<
  {
    updateAnotacoesProcesso: boolean;
  },
  UpdateAnotacoesProcessoArgs
> = gql`
  mutation UpdateAnotacoesProcesso(
    $uuid: String!
    $data: updateAnotacoesProcesso_data
  ) {
    updateAnotacoesProcesso(uuid: $uuid, data: $data)
  }
`;

export const MUTATION_DELETE_ANOTACAO_PROCESSO: TypedDocumentNode<
  {
    deleteAnotacoesProcesso: true;
  },
  { uuid: string }
> = gql`
  mutation Mutation($uuid: String!) {
    deleteAnotacoesProcesso(uuid: $uuid)
  }
`;

export type QuerySearchAnotacoesProcessoDTO =
  PickSearchAnotacoesProcessoReturn<{
    uuid: string;
    criado_em: Datetime<string>["toDateTime"];
    atualizado_em: Datetime<string | null>["toDateTime"];
    titulo: string;
    descricao: string | null;
    criado_por_advogado_uuid: string;
    advogado: {
      uuid: string;
      nome: string;
    };
  }>;
export const QUERY_SEARCH_ANOTACOES_PROCESSO: TypedDocumentNode<
  {
    searchAnotacoesProcesso: QuerySearchAnotacoesProcessoDTO[];
  },
  SearchAnotacoesProcessoArgs
> = gql`
  query SearchAnotacoesProcesso(
    $where: String!
    $value: String!
    $limit: Int!
  ) {
    searchAnotacoesProcesso(where: $where, value: $value, limit: $limit) {
      criado_por_advogado_uuid
      advogado {
        uuid
        nome
      }
      descricao
      titulo
      criado_em
      atualizado_em
      uuid
    }
  }
`;
