import { gql, TypedDocumentNode } from "@apollo/client";
import type { PickSearchServicoReturn, SearchServicoArgs } from "backend/types";

export type QueryPickSearchServicoDTO = PickSearchServicoReturn<{
  uuid: string;
  nome: string;
}>;
export const QUERY_SEARCH_SERVICO: TypedDocumentNode<
  {
    searchServico: QueryPickSearchServicoDTO[];
  },
  SearchServicoArgs
> = gql`
  query SearchServico($where: String!, $value: String!, $limit: Int!) {
    searchServico(where: $where, value: $value, limit: $limit) {
      uuid
      nome
    }
  }
`;
