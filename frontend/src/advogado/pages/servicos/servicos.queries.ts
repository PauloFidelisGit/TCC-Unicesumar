import { gql, TypedDocumentNode } from "@apollo/client";
import type { ListServicoArgs, PickListServicoReturn } from "backend/types";

export type QueryListServicoDTO = PickListServicoReturn<{
  uuid: string;
  nome: string;
}>;
export const QUERY_LIST_SERVICO: TypedDocumentNode<
  {
    listServico: QueryListServicoDTO;
  },
  ListServicoArgs
> = gql`
  query Query($cursor: Int!, $limit: Int!, $count: Boolean) {
    listServico(cursor: $cursor, limit: $limit, count: $count) {
      data {
        uuid
        nome
      }
      nextCursor
      count
    }
  }
`;
