import { TIPO_RELACIONAMENTO_PROCESSO_PESSOA } from "@/domain/enums";
import { gql, TypedDocumentNode } from "@apollo/client";
import type {
  CreateRelacionamentoCasoProcessoArgs,
  CreateRelacionamentoCasoProcessoReturn,
  DeleteRelacionamentoCasoProcessoArgs,
  DeleteRelacionamentoCasoProcessoReturn,
  FindProcessosRelatedCasoArgs,
  PickFindProcessosRelatedCasoReturn,
  PickSearchProcessoReturn,
  SearchProcessoArgs,
} from "backend/types";

export type QuerySearchProcessoDTO = PickSearchProcessoReturn<{
  uuid: string;
  numero: string;
  polos: {
    tipo_relacionamento: TIPO_RELACIONAMENTO_PROCESSO_PESSOA;
    pessoa: {
      uuid: string;
      nome: string;
      cpf: string | null;
      cnpj: string | null;
      razao_social: string | null;
      nome_fantasia: string | null;
    };
  }[];
}>;
export const QUERY_SEARCH_PROCESSO: TypedDocumentNode<
  {
    searchProcesso: QuerySearchProcessoDTO[];
  },
  SearchProcessoArgs
> = gql`
  query Query($where: String!, $value: String!, $limit: Int!) {
    searchProcesso(where: $where, value: $value, limit: $limit) {
      uuid
      numero
      polos {
        tipo_relacionamento
        pessoa {
          uuid
          nome
          cpf
          cnpj
          razao_social
          nome_fantasia
        }
      }
    }
  }
`;

export const MUTATION_CREATE_RELACIONAMENTO_CASO_PROCESSO: TypedDocumentNode<
  {
    createRelacionamentoCasoProcesso: CreateRelacionamentoCasoProcessoReturn;
  },
  CreateRelacionamentoCasoProcessoArgs
> = gql`
  mutation Mutation(
    $criado_em: String!
    $caso_uuid: String!
    $processo_uuid: String
  ) {
    createRelacionamentoCasoProcesso(
      criado_em: $criado_em
      caso_uuid: $caso_uuid
      processo_uuid: $processo_uuid
    ) {
      uuid
    }
  }
`;

export const MUTATION_DELETE_RELACIONAMENTO_CASO_PROCESSO: TypedDocumentNode<
  {
    deleteRelacionamentoCasoProcesso: DeleteRelacionamentoCasoProcessoReturn;
  },
  DeleteRelacionamentoCasoProcessoArgs
> = gql`
  mutation Mutation($uuid: String!) {
    deleteRelacionamentoCasoProcesso(uuid: $uuid)
  }
`;

export type QueryFindProcessosRelatedCasoDTO =
  PickFindProcessosRelatedCasoReturn<{
    uuid: string;
    processo: {
      uuid: string;
      numero: string;
    };
  }>;
export const QUERY_FIND_PROCESSOS_RELATED_CASO: TypedDocumentNode<
  {
    findProcessosRelatedCaso: QueryFindProcessosRelatedCasoDTO[];
  },
  FindProcessosRelatedCasoArgs
> = gql`
  query Query($caso_uuid: String!) {
    findProcessosRelatedCaso(caso_uuid: $caso_uuid) {
      uuid
      processo {
        numero
        uuid
      }
    }
  }
`;
