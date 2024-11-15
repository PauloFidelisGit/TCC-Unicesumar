import { Datetime } from "@/domain/vo/datetime.vo";
import { gql, TypedDocumentNode } from "@apollo/client";
import type {
  PickSearchMunicipioReturn,
  SearchMunicipioArgs,
} from "backend/types";

export type QuerySearchMunicipioDTO = PickSearchMunicipioReturn<{
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDateTime"];
  atualizado_em: Datetime<string | null>["toDateTime"];
  nome: string;
}>;
export const QUERY_SEARCH_MUNICIPIO: TypedDocumentNode<
  {
    searchMunicipio: QuerySearchMunicipioDTO[];
  },
  SearchMunicipioArgs
> = gql`
  query Query($where: String!, $value: String!, $limit: Int!) {
    searchMunicipio(where: $where, value: $value, limit: $limit) {
      id
      criado_em
      atualizado_em
      uuid
      nome
    }
  }
`;
