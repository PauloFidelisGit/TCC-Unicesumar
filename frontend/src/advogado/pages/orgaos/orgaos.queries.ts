import { gql, TypedDocumentNode } from "@apollo/client";
import type { ListOrgaoArgs, PickListOrgaoReturn } from "backend/types";

export type QueryListOrgaoDTO = PickListOrgaoReturn<{
  id: number;
  uuid: string;
  criado_em: string;
  atualizado_em: string | null;
  nome: string;
}>;
export const QUERY_LIST_ORGAO: TypedDocumentNode<
  {
    listOrgao: {
      nextCursor: number | null;
      data: QueryListOrgaoDTO[] | null;
      count: number | null;
    };
  },
  ListOrgaoArgs
> = gql`
  query ListOrgao($cursor: Int!, $limit: Int!, $count: Boolean) {
    listOrgao(cursor: $cursor, limit: $limit, count: $count) {
      data {
        id
        criado_em
        atualizado_em
        uuid
        nome
      }
      nextCursor
      count
    }
  }
`;
