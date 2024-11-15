import { gql, TypedDocumentNode } from "@apollo/client";
import type {
  FindCasoArgs,
  PickFindCasoReturn,
  UpdateCasoArgs,
} from "backend/types";

export type QueryFindCasoDTO = PickFindCasoReturn<{
  id: number;
  uuid: string;
  criado_em: string;
  atualizado_em: string | null;
  titulo: string;
  descricao: string | null;
  data_abertura: string;
  data_encerramento: string | null;
  criado_por_advogado_uuid: string;
}>;

export const QUERY_FIND_CASO: TypedDocumentNode<
  {
    findCaso: QueryFindCasoDTO;
  },
  FindCasoArgs
> = gql`
  query Query($where: String!, $value: String!) {
    findCaso(where: $where, value: $value) {
      uuid
      criado_em
      atualizado_em
      titulo
      data_abertura
      criado_por_advogado_uuid
      descricao
      data_encerramento
    }
  }
`;

export const MUTATION_UPDATE_CASO: TypedDocumentNode<
  {
    updateCaso: true;
  },
  {
    uuid: string;
    data: UpdateCasoArgs["data"];
  }
> = gql`
  mutation UpdateOrgao($uuid: String!, $data: updateCaso_data) {
    updateCaso(uuid: $uuid, data: $data)
  }
`;
