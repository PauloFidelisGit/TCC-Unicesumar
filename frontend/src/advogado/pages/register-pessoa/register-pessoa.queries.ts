import { TypedDocumentNode, gql } from "@apollo/client";
import type { CreatePessoaArgs, CreatePessoaReturn } from "backend/types";

export type CreatePessoaArgsDTO = CreatePessoaArgs;

export const MUTATION_CREATE_PESSOA: TypedDocumentNode<
  {
    createPessoa: CreatePessoaReturn;
  },
  CreatePessoaArgsDTO
> = gql`
  mutation CreatePessoa(
    $criado_em: String!
    $tipo_pessoa: String!
    $data: CreatePessoa_data!
  ) {
    createPessoa(
      criado_em: $criado_em
      tipo_pessoa: $tipo_pessoa
      data: $data
    ) {
      uuid
    }
  }
`;
