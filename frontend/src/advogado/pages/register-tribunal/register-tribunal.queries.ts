import { TypedDocumentNode, gql } from "@apollo/client";
import type { CreateTribunalArgs } from "backend/types";

export type CreateTribunalArgsDTO = CreateTribunalArgs;
export const MUTATION_CREATE_TRIBUNAL: TypedDocumentNode<
  {
    createTribunal: {
      uuid: string;
    };
  },
  CreateTribunalArgsDTO
> = gql`
  mutation CreateTribunal($criado_em: String!, $nome: String!) {
    createTribunal(criado_em: $criado_em, nome: $nome) {
      uuid
    }
  }
`;
