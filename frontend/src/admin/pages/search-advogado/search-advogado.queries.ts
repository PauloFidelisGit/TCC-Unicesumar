import { gql, TypedDocumentNode } from "@apollo/client";
import type {
  PickSearchAdvogadoReturn,
  SearchAdvogadoArgs,
} from "backend/types";

export type QuerySearchAdvogadoDTO = PickSearchAdvogadoReturn<{
  uuid: string;
  nome: string;
}>;
export const QUERY_SEARCH_ADVOGADO: TypedDocumentNode<
  {
    searchAdvogado: QuerySearchAdvogadoDTO[];
  },
  SearchAdvogadoArgs
> = gql`
  query SearchAdvogado($where: String!, $value: String!, $limit: Int!) {
    searchAdvogado(where: $where, value: $value, limit: $limit) {
      uuid
      nome
      oab {
        numero
        letra
        uf
      }
    }
  }
`;
