import { gql, TypedDocumentNode } from "@apollo/client";
import type {
  PickSearchClasseJudicialReturn,
  SearchClasseJudicialArgs,
} from "backend/types";

export type QuerySearchClasseJudicialDTO = PickSearchClasseJudicialReturn<{
  id: number;
  uuid: string;
  criado_em: string;
  atualizado_em: string;
  nome: string;
  codigo: string;
}>;
export const QUERY_SEARCH_CLASSE_JUDICIAL: TypedDocumentNode<
  {
    searchClasseJudicial: QuerySearchClasseJudicialDTO[];
  },
  SearchClasseJudicialArgs
> = gql`
  query Query($where: String!, $value: String!, $limit: Int!) {
    searchClasseJudicial(where: $where, value: $value, limit: $limit) {
      id
      criado_em
      atualizado_em
      uuid
      nome
      codigo
    }
  }
`;
