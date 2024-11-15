import { TypedDocumentNode, gql } from "@apollo/client";
import type {
  CreateAnotacoesCasoArgs,
  CreateAnotacoesCasoReturn,
  DeleteAnotacoesCasoArgs,
  DeleteAnotacoesCasoReturn,
  PickSearchAnotacoesCasoReturnDTO,
  SearchAnotacoesCasoArgs,
  UpdateAnotacoesCasoArgs,
  UpdateAnotacoesCasoReturn,
} from "backend/types";

export const MUTATION_CREATE_ANOTACAO_PROCESSO: TypedDocumentNode<
  {
    createAnotacoesCaso: CreateAnotacoesCasoReturn;
  },
  CreateAnotacoesCasoArgs
> = gql`
  mutation CreateAnotacoesCaso(
    $criado_em: String!
    $titulo: String!
    $caso_uuid: String!
    $criado_por_advogado_uuid: String!
    $descricao: String
  ) {
    createAnotacoesCaso(
      criado_em: $criado_em
      titulo: $titulo
      caso_uuid: $caso_uuid
      criado_por_advogado_uuid: $criado_por_advogado_uuid
      descricao: $descricao
    ) {
      uuid
    }
  }
`;

export const MUTATION_UPDATE_ANOTACAO_CASO: TypedDocumentNode<
  {
    updateAnotacoesCaso: UpdateAnotacoesCasoReturn;
  },
  UpdateAnotacoesCasoArgs
> = gql`
  mutation CreateAnotacoesCaso(
    $uuid: String!
    $data: updateAnotacoesCaso_data
  ) {
    updateAnotacoesCaso(uuid: $uuid, data: $data)
  }
`;

export const MUTATION_DELETE_ANOTACAO_CASO: TypedDocumentNode<
  {
    deleteAnotacoesCaso: DeleteAnotacoesCasoReturn;
  },
  DeleteAnotacoesCasoArgs
> = gql`
  mutation DeleteAnotacoesCaso($uuid: String!) {
    deleteAnotacoesCaso(uuid: $uuid)
  }
`;

export type QuerySearchAnotacoesCasoDTO = PickSearchAnotacoesCasoReturnDTO<{
  uuid: string;
  criado_em: string;
  atualizado_em: string | null;
  titulo: string;
  descricao: string | null;
  criado_por_advogado_uuid: string;
  advogado: {
    uuid: string;
    nome: string;
  };
}>;
export const QUERY_SEARCH_ANOTACOES_CASO: TypedDocumentNode<
  {
    searchAnotacoesCaso: QuerySearchAnotacoesCasoDTO[];
  },
  SearchAnotacoesCasoArgs
> = gql`
  query SearchAnotacoesCaso($where: String!, $value: String!, $limit: Int!) {
    searchAnotacoesCaso(where: $where, value: $value, limit: $limit) {
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
