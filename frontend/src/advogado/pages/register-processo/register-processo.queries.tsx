import { TypedDocumentNode, gql } from "@apollo/client";
import type { CreateProcessoArgs, CreateProcessoReturn } from "backend/types";

export type CreateProcessoArgsDTO = CreateProcessoArgs;

export const MUTATION_CREATE_PROCESSO: TypedDocumentNode<
  {
    createProcesso: CreateProcessoReturn;
  },
  CreateProcessoArgsDTO
> = gql`
  mutation CreateProcesso(
    $criado_em: String!
    $numero: String!
    $criado_por_advogado_uuid: String!
    $orgao_uuid: String
    $data_autuacao: String
    $valor_causa: Float
    $segredo_justica: Boolean
    $tutela_urgencia: Boolean
    $classe_judicial_uuid: String
  ) {
    createProcesso(
      criado_em: $criado_em
      numero: $numero
      criado_por_advogado_uuid: $criado_por_advogado_uuid
      orgao_uuid: $orgao_uuid
      data_autuacao: $data_autuacao
      valor_causa: $valor_causa
      segredo_justica: $segredo_justica
      tutela_urgencia: $tutela_urgencia
      classe_judicial_uuid: $classe_judicial_uuid
    ) {
      uuid
    }
  }
`;
