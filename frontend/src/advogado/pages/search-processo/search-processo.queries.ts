import { gql, TypedDocumentNode } from "@apollo/client";
import type {
  PickSearchProcessoReturn,
  SearchProcessoArgs,
} from "backend/types";

export type QuerySearchProcessoDTO = PickSearchProcessoReturn<{
  uuid: string;
  numero: string;
}>;
export const QUERY_SEARCH_PROCESSO: TypedDocumentNode<
  {
    searchProcesso: QuerySearchProcessoDTO[];
  },
  SearchProcessoArgs
> = gql`
  query SearchProcesso($where: String!, $value: String!, $limit: Int!) {
    searchProcesso(where: $where, value: $value, limit: $limit) {
      uuid
      numero
    }
  }
`;
