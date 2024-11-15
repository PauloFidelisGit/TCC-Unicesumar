import { TypedDocumentNode, gql } from "@apollo/client";
import type { CreateOrgaoArgs } from "backend/types";

export type CreateOrgaArgsDTO = CreateOrgaoArgs;
export const MUTATION_CREATE_ORGAO: TypedDocumentNode<
  {
    createOrgao: {
      uuid: string;
    };
  },
  CreateOrgaArgsDTO
> = gql`
  mutation Query(
    $criado_em: String!
    $nome: String!
    $tribunal_uuid: String!
    $municipio_uuid: String!
  ) {
    createOrgao(
      criado_em: $criado_em
      nome: $nome
      tribunal_uuid: $tribunal_uuid
      municipio_uuid: $municipio_uuid
    ) {
      uuid
    }
  }
`;
