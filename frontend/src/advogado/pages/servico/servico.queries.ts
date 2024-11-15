import { gql, TypedDocumentNode } from "@apollo/client";
import type {
  FindOrgaoArgs,
  PickFindServicoReturn,
  UpdateServicoArgs,
} from "backend/types";

export type QueryFindServicoDTO = PickFindServicoReturn<{
  nome: string;
}>;

export const QUERY_FIND_SERVICO: TypedDocumentNode<
  {
    findServico: QueryFindServicoDTO;
  },
  FindOrgaoArgs
> = gql`
  query FindOrgao($where: String!, $value: String!) {
    findServico(where: $where, value: $value) {
      nome
    }
  }
`;

export const MUTATION_UPDATE_SERVICO: TypedDocumentNode<
  {
    updateServico: true;
  },
  UpdateServicoArgs
> = gql`
  mutation UpdateOrgao($uuid: String!, $data: UpdateServico_data) {
    updateServico(uuid: $uuid, data: $data)
  }
`;
