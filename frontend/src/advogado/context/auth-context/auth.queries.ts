import { TypedDocumentNode, gql } from "@apollo/client";
import { FindAdvogadoArgs, PickFindAdvogadoReturn } from "backend/types";

export type QueryFindAdvogadoDTO = PickFindAdvogadoReturn<{
  uuid: string;
  nome: string;
}>;
export const QUERY_FIND_ADVOGADO: TypedDocumentNode<
  {
    findAdvogado: QueryFindAdvogadoDTO;
  } | null,
  FindAdvogadoArgs
> = gql`
  query Query($where: String!, $value: String!) {
    findAdvogado(where: $where, value: $value) {
      uuid
      nome
    }
  }
`;
