import { gql, TypedDocumentNode } from "@apollo/client";
import type { UpdateCasoArgs } from "backend/types";

export const MUTATION_UPDATE_CASO: TypedDocumentNode<
  {
    updateCaso: true;
  },
  {
    uuid: string;
    data: UpdateCasoArgs["data"];
  }
> = gql`
  mutation UpdateOrgao($uuid: String!, $data: updateCaso_data) {
    updateCaso(uuid: $uuid, data: $data)
  }
`;
