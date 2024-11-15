import { Datetime } from "@/domain/vo/datetime.vo";
import { gql, TypedDocumentNode } from "@apollo/client";
import type { ListTribunalArgs, PickListTribunalReturn } from "backend/types";

export type QueryListTribunalDTO = PickListTribunalReturn<{
  id: number;
  uuid: Datetime<string>["toDateTime"];
  criado_em: Datetime<string>["toDateTime"];
  atualizado_em: string | null;
  nome: string;
}>;
export const QUERY_LIST_TRIBUNAL: TypedDocumentNode<
  {
    listTribunal: {
      nextCursor: number | null;
      data: QueryListTribunalDTO[] | null;
      count: number | null;
    };
  },
  ListTribunalArgs
> = gql`
  query ListTribunal($cursor: Int!, $limit: Int!, $count: Boolean) {
    listTribunal(cursor: $cursor, limit: $limit, count: $count) {
      data {
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
