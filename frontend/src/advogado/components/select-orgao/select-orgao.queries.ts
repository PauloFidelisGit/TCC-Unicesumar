import { gql, TypedDocumentNode } from "@apollo/client";
import type { PickSearchOrgaoReturn, SearchOrgaoArgs } from "backend/types";

export type QuerySearchOrgaoDTO = PickSearchOrgaoReturn<{
  id: number;
  uuid: string;
  criado_em: string;
  atualizado_em: string;
  nome: string;
}>;
export const QUERY_SEARCH_ORGAO: TypedDocumentNode<
  {
    searchOrgao: QuerySearchOrgaoDTO[];
  },
  SearchOrgaoArgs
> = gql`
  query Query($where: String!, $value: String!, $limit: Int!) {
    searchOrgao(where: $where, value: $value, limit: $limit) {
      id
      criado_em
      atualizado_em
      uuid
      nome
    }
  }
`;
