import { gql, TypedDocumentNode } from "@apollo/client";
import type {
  PickSearchTribunalReturn,
  SearchTribunalArgs,
} from "backend/types";

export type QuerySearchTribunalDTO = PickSearchTribunalReturn<{
  id: number;
  uuid: string;
  criado_em: string;
  atualizado_em: string;
  nome: string;
}>;
export const QUERY_SEARCH_MUNICIPIO: TypedDocumentNode<
  {
    searchTribunal: QuerySearchTribunalDTO[];
  },
  SearchTribunalArgs
> = gql`
  query Query($where: String!, $value: String!, $limit: Int!) {
    searchTribunal(where: $where, value: $value, limit: $limit) {
      id
      criado_em
      atualizado_em
      uuid
      nome
    }
  }
`;
