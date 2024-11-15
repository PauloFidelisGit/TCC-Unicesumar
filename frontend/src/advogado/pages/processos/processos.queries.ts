import { Datetime } from "@/domain/vo/datetime.vo";
import { gql, TypedDocumentNode } from "@apollo/client";
import type { ListProcessoArgs, PickListProcessoReturn } from "backend/types";

export type QueryListProcessoApiDTO = PickListProcessoReturn<{
  uuid: string;
  criado_em: Datetime<string>["toDateTime"];
  atualizado_em: Datetime<string | null>["toDateTime"];
  numero: string;
}>;
export const QueryLIST_PROCESSO: TypedDocumentNode<
  {
    listProcesso: {
      nextCursor: number | null;
      data: QueryListProcessoApiDTO[] | null;
      count: number | null;
    };
  },
  ListProcessoArgs
> = gql`
  query Query($cursor: Int!, $limit: Int!, $count: Boolean) {
    listProcesso(cursor: $cursor, limit: $limit, count: $count) {
      data {
        uuid
        criado_em
        atualizado_em
        numero
      }
      nextCursor
      count
    }
  }
`;
