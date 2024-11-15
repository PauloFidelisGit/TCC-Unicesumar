import { gql, TypedDocumentNode } from "@apollo/client";
import type {
  FindOrgaoArgs,
  PickFindOrgaoReturn,
  UpdateOrgaoArgs,
} from "backend/types";

export type QueryFindOrgaoDTO = PickFindOrgaoReturn<{
  nome: string;
}>;

export const QUERY_FIND_ORGAO: TypedDocumentNode<
  {
    findOrgao: QueryFindOrgaoDTO;
  },
  FindOrgaoArgs
> = gql`
  query FindOrgao($where: String!, $value: String!) {
    findOrgao(where: $where, value: $value) {
      nome
    }
  }
`;

export const MUTATION_UPDATE_ORGAO: TypedDocumentNode<
  {
    updateOrgao: true;
  },
  {
    uuid: string;
    data: UpdateOrgaoArgs["data"];
  }
> = gql`
  mutation UpdateOrgao($uuid: String!, $data: updateOrgao_data) {
    updateOrgao(uuid: $uuid, data: $data)
  }
`;
