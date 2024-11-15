import { gql, TypedDocumentNode } from "@apollo/client";
import type { PickSearchCasoReturn, SearchCasoArgs } from "backend/types";

export type QuerySearchCasoDTO = PickSearchCasoReturn<{
  uuid: string;
  titulo: string;
}>;
export const QUERY_SEARCH_CASO: TypedDocumentNode<
  {
    searchCaso: QuerySearchCasoDTO[];
  },
  SearchCasoArgs
> = gql`
  query Query($where: String!, $value: String!, $limit: Int!) {
    searchCaso(where: $where, value: $value, limit: $limit) {
      uuid
      titulo
    }
  }
`;
