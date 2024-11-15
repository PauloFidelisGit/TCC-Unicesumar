import { TypedDocumentNode, gql } from "@apollo/client";
import type { CreateAdvogadoArgs, CreateAdvogadoReturn } from "backend/types";

export type CreateAdvogadoArgsDTO = Omit<CreateAdvogadoArgs, "login">;
export const MUTATION_CREATE_ADVOGADO: TypedDocumentNode<
  {
    createAdvogado: CreateAdvogadoReturn;
  },
  CreateAdvogadoArgsDTO
> = gql`
  mutation CreateAdvogado(
    $criado_em: String!
    $nome: String!
    $emails: [String]
    $telefones: [String]
    $senha: String!
    $nacionalidade: String
    $estadoCivil: String
    $dataNascimento: String
    $cpf: String
    $oab: [OabInput]
  ) {
    createAdvogado(
      criado_em: $criado_em
      nome: $nome
      emails: $emails
      telefones: $telefones
      senha: $senha
      nacionalidade: $nacionalidade
      estado_civil: $estadoCivil
      data_nascimento: $dataNascimento
      cpf: $cpf
      oab: $oab
    ) {
      uuid
    }
  }
`;
