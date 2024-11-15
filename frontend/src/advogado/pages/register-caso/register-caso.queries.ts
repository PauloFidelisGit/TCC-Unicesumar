import { TypedDocumentNode, gql } from "@apollo/client";
import type { CreateCasoArgs, CreateCasoReturn } from "backend/types";

export const MUTATION_CREATE_CASO: TypedDocumentNode<
  {
    createCaso: CreateCasoReturn;
  },
  CreateCasoArgs
> = gql`
  mutation CreateCaso(
    $criado_em: String!
    $titulo: String!
    $data_abertura: String!
    $criado_por_advogado_uuid: String!
    $descricao: String
    $data_encerramento: String
  ) {
    createCaso(
      criado_em: $criado_em
      titulo: $titulo
      data_abertura: $data_abertura
      criado_por_advogado_uuid: $criado_por_advogado_uuid
      descricao: $descricao
      data_encerramento: $data_encerramento
    ) {
      uuid
    }
  }
`;
