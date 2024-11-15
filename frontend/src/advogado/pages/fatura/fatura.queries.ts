import { STATUS_FATURA } from "@/domain/enums/STATUS_FATURA";
import { gql, TypedDocumentNode } from "@apollo/client";
import type {
  FindFaturaArgs,
  PickFindFaturaReturn,
  UpdateFaturaArgs,
  UpdateFaturaReturn,
} from "backend/types";

export const MUTATION_UPDATE_FATURA: TypedDocumentNode<
  {
    updateFatura: UpdateFaturaReturn;
  },
  UpdateFaturaArgs
> = gql`
  mutation UpdateFatura(
    $atualizado_em: String!
    $fatura: UpdateFatura_fatura!
    $parcelas: [UpdateFatura_parcelas]!
    $ordens_servico: [UpdateFatura_ordens_servico]!
  ) {
    updateFatura(
      atualizado_em: $atualizado_em
      fatura: $fatura
      parcelas: $parcelas
      ordens_servico: $ordens_servico
    )
  }
`;

export type QueryFindFaturaDTO = PickFindFaturaReturn<{
  status_fatura: STATUS_FATURA;
  uuid: string;
  parcelas: {
    data_vencimento: string;
    valor: number;
    numero: number;
    data_pagamento: string | null;
  }[];
  data_emissao: string;
  observacoes: string | null;
  valor_total: number;
  ordens_servico: {
    uuid: string;
    valor_servico: number;
    numero: number;
  }[];
}>;
export const QUERY_FIND_FATURA: TypedDocumentNode<
  {
    findFatura: QueryFindFaturaDTO;
  },
  FindFaturaArgs
> = gql`
  query FindFatura($where: String!, $value: String!) {
    findFatura(where: $where, value: $value) {
      status_fatura
      uuid
      parcelas {
        data_vencimento
        valor
        numero
				data_pagamento
      }
      data_emissao
      observacoes
      valor_total
      ordens_servico {
        uuid
        valor_servico
        numero
      }
    }
  }
`;
