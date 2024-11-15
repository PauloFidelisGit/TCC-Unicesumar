import { gql, TypedDocumentNode } from "@apollo/client";
import type { ListOrgaoArgs, PickListFaturaReturn } from "backend/types";

export type QueryListFaturaDTO = PickListFaturaReturn<{
  uuid: string;
  criado_em: string;
  atualizado_em: string | null;
  data_emissao: string;
  valor_total: number;
}>;
export const QUERY_LIST_FATURAS: TypedDocumentNode<
  {
    listFatura: QueryListFaturaDTO;
  },
  ListOrgaoArgs
> = gql`
  query ListFatura($cursor: Int!, $limit: Int!, $count: Boolean) {
    listFatura(cursor: $cursor, limit: $limit, count: $count) {
      data {
        criado_em
        atualizado_em
        uuid
        data_emissao
        valor_total
      }
      nextCursor
      count
    }
  }
`;
