import { gql, TypedDocumentNode } from "@apollo/client";
import type {
  FindClasseJudicialArgs,
  PickFindClasseJudicialReturn,
} from "backend/types";

export type QueryFindClasseJudicialDTO = PickFindClasseJudicialReturn<{
  nome: string;
  codigo: string;
}>;
export const QUERY_FIND_CLASSE_JUDICIAL: TypedDocumentNode<
  {
    findClasseJudicial: QueryFindClasseJudicialDTO;
  },
  FindClasseJudicialArgs
> = gql`
  query FindClasseJudicial($where: String!, $value: String!) {
    findClasseJudicial(where: $where, value: $value) {
      nome
      codigo
    }
  }
`;
