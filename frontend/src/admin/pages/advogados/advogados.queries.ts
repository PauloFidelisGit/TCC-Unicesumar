import { gql, TypedDocumentNode } from "@apollo/client";
import type {
  ListAdvogadoArgs,
  PickListAdvogadoReturnData,
} from "backend/types";

export type QueryListAdvogadoDTO = PickListAdvogadoReturnData<{
  id: number;
  uuid: string;
  criado_em: string;
  atualizado_em: string | null;
  nome: string;
}>;
export const QUERY_LIST_ADVOGADO: TypedDocumentNode<
  {
    listAdvogado: {
      nextCursor: number | null;
      data: QueryListAdvogadoDTO[] | null;
      count: number | null;
    };
  },
  ListAdvogadoArgs
> = gql`
  query ListAdvogado($cursor: Int!, $limit: Int!, $count: Boolean) {
    listAdvogado(cursor: $cursor, limit: $limit, count: $count) {
      data {
        id
        uuid
        criado_em
        atualizado_em
        nome
      }
      nextCursor
      count
    }
  }
`;
