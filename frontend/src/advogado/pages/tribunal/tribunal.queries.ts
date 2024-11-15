import { gql, TypedDocumentNode } from "@apollo/client";
import type {
  FindTribunalArgs,
  PickFindTribunalReturn,
  UpdateTribunalArgs,
} from "backend/types";

export type QueryFindTribunalDTO = PickFindTribunalReturn<{
  nome: string;
}>;

export const QUERY_FIND_TRIBUNAL: TypedDocumentNode<
  {
    findTribunal: QueryFindTribunalDTO;
  },
  FindTribunalArgs
> = gql`
  query FindTribunal($where: String!, $value: String!) {
    findTribunal(where: $where, value: $value) {
      nome
    }
  }
`;

export const MUTATION_UPDATE_TRIBUNAL: TypedDocumentNode<
  {
    updateTribunal: true;
  },
  UpdateTribunalArgs
> = gql`
  mutation UpdateTribunal($uuid: String!, $data: updateTribunal_data) {
    updateTribunal(uuid: $uuid, data: $data)
  }
`;
