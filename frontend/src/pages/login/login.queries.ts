import { TypedDocumentNode, gql } from "@apollo/client";
import type {
  LoginAdminArgs,
  LoginAdminReturn,
  LoginAdvogadoArgs,
  LoginAdvogadoReturn,
} from "backend/types";

export const QUERY_LOGIN_ADVOGADO: TypedDocumentNode<
  {
    loginAdvogado: LoginAdvogadoReturn;
  },
  LoginAdvogadoArgs
> = gql`
  query Query($login: String!, $senha: String!) {
    loginAdvogado(login: $login, senha: $senha) {
      uuid
      token
    }
  }
`;

export const QUERY_LOGIN_ADMIN: TypedDocumentNode<
  {
    loginAdmin: LoginAdminReturn;
  },
  LoginAdminArgs
> = gql`
  query Query($login: String!, $senha: String!) {
    loginAdmin(login: $login, senha: $senha) {
      uuid
      token
    }
  }
`;
