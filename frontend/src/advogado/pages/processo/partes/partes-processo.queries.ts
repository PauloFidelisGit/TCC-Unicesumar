import { Datetime } from "@/domain/vo/datetime.vo";
import { gql, TypedDocumentNode } from "@apollo/client";
import type {
  CreateRelacionamentoProcessoPessoaArgs,
  CreateRelacionamentoProcessoReturn,
  DeleteRelacionamentoProcessoArgs,
  DeleteRelacionamentoProcessoReturn,
  PickSearchPessoaReturn,
  SearchPessoaArgs,
} from "backend/types";

export const MUTATION_CREATE_RELACIONAMENTO_PROCESSO: TypedDocumentNode<
  {
    createRelacionamentoProcessoPessoa: CreateRelacionamentoProcessoReturn;
  },
  CreateRelacionamentoProcessoPessoaArgs
> = gql`
  mutation Query(
    $criado_em: String!
    $tipo_relacionamento: TipoRelacionamentoProcesso!
    $pessoa_uuid: String!
    $processo_uuid: String!
  ) {
    createRelacionamentoProcessoPessoa(
      criado_em: $criado_em
      tipo_relacionamento: $tipo_relacionamento
      pessoa_uuid: $pessoa_uuid
      processo_uuid: $processo_uuid
    ) {
      uuid
    }
  }
`;

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

export const MUTATION_DELETE_RELACIONAMENTO_PROCESSO: TypedDocumentNode<
  {
    deleteRelacionamentoProcessoPessoa: DeleteRelacionamentoProcessoReturn;
  },
  DeleteRelacionamentoProcessoArgs
> = gql`
  mutation Mutation($uuid: String!) {
    deleteRelacionamentoProcessoPessoa(uuid: $uuid)
  }
`;
