import { TIPO_RELACIONAMENTO_PROCESSO_PESSOA } from "@/domain/enums";
import { Datetime } from "@/domain/vo/datetime.vo";
import { gql, TypedDocumentNode } from "@apollo/client";
import type { FindProcessoArgs, PickFindProcessoReturn } from "backend/types";

export type QueryFindProcessoDTO = PickFindProcessoReturn<{
  numero: string;
  data_autuacao: Datetime<string | null>["toDateTime"];
  valor_causa: number | null;
  segredo_justica: boolean | null;
  tutela_urgencia: boolean | null;
  criado_por_advogado_uuid: string;
  orgao_uuid: string;
  classe_judicial_uuid: string | null;

  orgao: {
    nome: string;
  };
  classe_judicial: {
    nome: string;
  };
  polos: {
    uui: string;
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

export const QUERY_FIND_PROCESSO: TypedDocumentNode<
  {
    findProcesso: QueryFindProcessoDTO;
  },
  FindProcessoArgs
> = gql`
  query Query($where: String!, $value: String!) {
    findProcesso(where: $where, value: $value) {
      uuid
      criado_em
      atualizado_em
      numero
      data_autuacao
      valor_causa
      segredo_justica
      tutela_urgencia
      orgao_uuid
      orgao {
        nome
      }
      classe_judicial_uuid
      classe_judicial {
        nome
      }
      polos {
        uuid
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
