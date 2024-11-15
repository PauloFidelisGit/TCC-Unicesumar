import { TypedDocumentNode, gql } from "@apollo/client";
import type { UpdateProcessoArgs } from "backend/types";

export const MUTATION_UPDATE_PROCESSO: TypedDocumentNode<
  {
    updateProcesso: true;
  },
  UpdateProcessoArgs
> = gql`
  mutation Mutation($uuid: String!, $data: updateProcesso_data) {
    updateProcesso(uuid: $uuid, data: $data)
  }
`;
