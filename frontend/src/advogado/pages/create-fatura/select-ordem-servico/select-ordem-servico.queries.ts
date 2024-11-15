import { FloatValue } from "@/domain/vo/float-value";
import { Uuid } from "@/domain/vo/uuid.vo";
import { gql, TypedDocumentNode } from "@apollo/client";
import type {
  PickSearchOrdemServicoReturn,
  SearchOrdemServicoArgs,
} from "backend/types";

export type QuerySearchOrdemServicoDTO = PickSearchOrdemServicoReturn<{
  uuid: Uuid<string>["value"];
  numero: number;
  valor_servico: FloatValue<number>["value"];
}>;
export const QUERY_SEARCH_ORDEM_SERVICO: TypedDocumentNode<
  {
    searchOrdemServico: QuerySearchOrdemServicoDTO[];
  },
  SearchOrdemServicoArgs
> = gql`
  query Query($where: String!, $value: String!, $limit: Int!, $without_fatura: Boolean) {
    searchOrdemServico(where: $where, value: $value, limit: $limit, without_fatura: $without_fatura) {
      uuid
      numero
      valor_servico
    }
  }
`;
