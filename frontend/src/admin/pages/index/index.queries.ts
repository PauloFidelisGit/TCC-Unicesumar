import { gql, TypedDocumentNode } from "@apollo/client";
import type {
  CountAdvogadoReturn,
  PickSearchAdvogadoReturn,
  SearchAdvogadoArgs,
} from "backend/types";

export const QUERY: TypedDocumentNode<
  {
    countAdvogado: CountAdvogadoReturn;
    searchAdvogado: PickSearchAdvogadoReturn<{
      uuid: string;
      nome: string;
    }>[];
  },
  SearchAdvogadoArgs
> = gql`
  query Query($where: String!, $value: String!, $limit: Int!) {
    searchAdvogado(where: $where, value: $value, limit: $limit) {
      uuid
      nome
    }
    countAdvogado
  }
`;
