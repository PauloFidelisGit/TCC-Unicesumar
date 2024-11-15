import { TypedDocumentNode, gql } from "@apollo/client";
import { CreateServicoArgs, CreateServicoReturn } from "backend/types";

export const MUTATION_CREATE_SERVICO: TypedDocumentNode<
  {
    createServico: CreateServicoReturn;
  },
  CreateServicoArgs
> = gql`
  mutation CreateServico($criado_em: String!, $nome: String!) {
    createServico(criado_em: $criado_em, nome: $nome) {
      uuid
    }
  }
`;
