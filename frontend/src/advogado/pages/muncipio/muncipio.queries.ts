import { gql, TypedDocumentNode } from "@apollo/client";
import type { FindMunicipioArgs, PickFindMunicipioReturn } from "backend/types";

export type FindMunicipioDTO = PickFindMunicipioReturn<{
  nome: string;
  codigo: string;
  codigo_uf: string;
}>;
export const FIND_MUNICIPIO: TypedDocumentNode<
  {
    findMunicipio: FindMunicipioDTO;
  },
  FindMunicipioArgs
> = gql`
  query Query($where: String!, $value: String!) {
    findMunicipio(where: $where, value: $value) {
      nome
      codigo
      codigo_uf
    }
  }
`;
