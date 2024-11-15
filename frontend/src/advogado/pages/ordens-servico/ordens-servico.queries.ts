import { STATUS_ORDEM_SERVICO } from "@/domain/enums/STATUS_ORDEM_SERVICO";
import { Datetime } from "@/domain/vo/datetime.vo";
import { Uuid } from "@/domain/vo/uuid.vo";
import { gql, TypedDocumentNode } from "@apollo/client";
import type {
  ListOrdemServicoArgs,
  PickListOrdemServicoReturn,
} from "backend/types";

export type QueryListOrdemServicoDTO = PickListOrdemServicoReturn<{
  uuid: Uuid<string>["value"];
  numero: number;
  data_abertura: Datetime<string>["toDateTime"];
  status: STATUS_ORDEM_SERVICO;
}>;
export const QUERY_LIST_ORDEM_SERVICO: TypedDocumentNode<
  {
    listOrdemServico: QueryListOrdemServicoDTO;
  },
  ListOrdemServicoArgs
> = gql`
  query Query($cursor: Int!, $limit: Int!, $count: Boolean) {
    listOrdemServico(cursor: $cursor, limit: $limit, count: $count) {
      data {
        uuid
        numero
        data_abertura
        status
      }
      nextCursor
      count
    }
  }
`;
