import { gql, TypedDocumentNode } from "@apollo/client";
import type {
  ListCasoReturn,
  ListOrgaoArgs,
  PickListCasoReturn,
} from "backend/types";

export type QueryListCasoDTO = PickListCasoReturn<{
  id: number;
  uuid: string;
  criado_em: string;
  atualizado_em: string | null;
  titulo: string;
}>;
export const QUERY_LIST_CASOS: TypedDocumentNode<
  {
    listCaso: Omit<ListCasoReturn, "data"> & { data: QueryListCasoDTO[] };
  },
  ListOrgaoArgs
> = gql`
  query ListCaso($cursor: Int!, $limit: Int!, $count: Boolean) {
    listCaso(cursor: $cursor, limit: $limit, count: $count) {
      data {
        id
        uuid
        criado_em
        atualizado_em
        titulo
        descricao
        data_encerramento
      }
      nextCursor
      count
    }
  }
`;
