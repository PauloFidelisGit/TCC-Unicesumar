import { TypedDocumentNode, gql } from "@apollo/client";
import { FindAdminArgs, PickFindAdminReturn } from "backend/types";

export type QueryFindAdminDTO = PickFindAdminReturn<{
  uuid: string;
  nome: string;
}>;
export const QUERY_FIND_ADMIN: TypedDocumentNode<
  {
    findAdmin: QueryFindAdminDTO;
  } | null,
  FindAdminArgs
> = gql`
  query Query($where: String!, $value: String!) {
    findAdmin(where: $where, value: $value) {
      uuid
      nome
    }
  }
`;
