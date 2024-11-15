import { gql, TypedDocumentNode } from "@apollo/client";
import type {
  PickSearchProcessoReturn,
  SearchProcessoArgs,
} from "backend/types";

export type QuerySearchProcessosDTO = PickSearchProcessoReturn<{
  uuid: string;
  numero: string;
}>;
export const QUERY_SEARCH_PROCESSO: TypedDocumentNode<
  {
    searchProcesso: QuerySearchProcessosDTO[];
  },
  SearchProcessoArgs
> = gql`
  query Query($where: String!, $value: String!, $limit: Int!) {
    searchProcesso(where: $where, value: $value, limit: $limit) {
      uuid
      numero
    }
  }
`;
