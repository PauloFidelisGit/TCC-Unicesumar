import { Datetime } from "@/domain/vo/datetime.vo";
import { gql, TypedDocumentNode } from "@apollo/client";
import type { ListPessoaArgs, PickListPessoaReturn } from "backend/types";

export type QueryListPessoaDTO = PickListPessoaReturn<{
  uuid: string;
  criado_em: Datetime<string>["toDateTime"];
  atualizado_em: Datetime<string | null>["toDateTime"];
  nome: string | null;
  nome_fantasia: string | null;
}>;

export const QUERY_LIST_PESSOA: TypedDocumentNode<
  {
    listPessoa: {
      nextCursor: number | null;
      data: QueryListPessoaDTO[] | null;
      count: number | null;
    };
  },
  ListPessoaArgs
> = gql`
  query Query($cursor: Int!, $limit: Int!, $count: Boolean) {
    listPessoa(cursor: $cursor, limit: $limit, count: $count) {
      data {
        uuid
        criado_em
        atualizado_em
        nome
        nome_fantasia
      }
      nextCursor
      count
    }
  }
`;
