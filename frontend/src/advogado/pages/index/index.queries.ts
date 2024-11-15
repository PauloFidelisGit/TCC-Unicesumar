import { TIPO_RELACIONAMENTO_PROCESSO_PESSOA } from "@/domain/enums";
import { gql, TypedDocumentNode } from "@apollo/client";
import type {
  CountPessoaReturn,
  CountProcessoReturn,
  PickSearchProcessoReturn,
  SearchProcessoArgs,
} from "backend/types";

export const QUERY_SEARCH_PROCESSOS: TypedDocumentNode<
  {
    countPessoa: CountPessoaReturn;
    countProcesso: CountProcessoReturn;
    searchProcesso: PickSearchProcessoReturn<{
      uuid: string;
      numero: string;
      polos: {
        tipo_relacionamento: TIPO_RELACIONAMENTO_PROCESSO_PESSOA;
        pessoa: {
          uuid: string;
          nome: string;
          nome_fantasia: string;
          razao_social: string;
        };
      }[];
    }>[];
  },
  SearchProcessoArgs
> = gql`
  query SearchProcesso($where: String!, $value: String!, $limit: Int!) {
    searchProcesso(where: $where, value: $value, limit: $limit) {
      uuid
      numero
      polos {
        tipo_relacionamento
        pessoa {
          uuid
          nome
          nome_fantasia
          razao_social
        }
      }
    }
    countPessoa
    countProcesso
  }
`;
