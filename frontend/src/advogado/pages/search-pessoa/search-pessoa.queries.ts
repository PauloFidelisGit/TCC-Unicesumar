import { Datetime } from "@/domain/vo/datetime.vo";
import { gql, TypedDocumentNode } from "@apollo/client";
import type { PickSearchPessoaReturn, SearchPessoaArgs } from "backend/types";

export type QuerySearchPessoaDTO = PickSearchPessoaReturn<{
  uuid: string;
  criado_em: Datetime<string>["toDateTime"];
  atualizado_em: Datetime<string | null>["toDateTime"];
  nome: string | null;
  nome_fantasia: string | null;
}>;
export const QUERY_SEARCH_PESSOA: TypedDocumentNode<
  {
    searchPessoa: QuerySearchPessoaDTO[];
  },
  SearchPessoaArgs
> = gql`
  query Query($where: String!, $value: String!, $limit: Int!) {
    searchPessoa(where: $where, value: $value, limit: $limit) {
      uuid
      criado_em
      atualizado_em
      nome
      nome_fantasia
    }
  }
`;
