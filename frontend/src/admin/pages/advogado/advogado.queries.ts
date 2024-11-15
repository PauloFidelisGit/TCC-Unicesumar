import { ESTADO_CIVIL } from "@/domain/enums";
import { RecursiveNonNullable } from "@/types/types-utils";
import { gql, TypedDocumentNode } from "@apollo/client";
import type {
  FindAdvogadoArgs,
  FindAdvogadoReturn,
  PickFindAdvogadoReturn,
  UpdateAdvogadoArgs,
} from "backend/types";

export type QueryFindAdvogadoDTO = PickFindAdvogadoReturn<{
  uuid: string;
  criado_em: string;
  atualizado_em: string;
  login: string;
  telefones: string[] | null;
  emails: string[] | null;
  nome: string;
  data_nascimento: string | null;
  nacionalidade: string | null;
  estado_civil: ESTADO_CIVIL | null;
  cpf: string | null;
  oab: RecursiveNonNullable<FindAdvogadoReturn["oab"]> | null;
}>;
export const QUERY_FIND_ADVOGADO: TypedDocumentNode<
  {
    findAdvogado: QueryFindAdvogadoDTO;
  },
  FindAdvogadoArgs
> = gql`
  query FindAdvogado($where: String!, $value: String!) {
    findAdvogado(where: $where, value: $value) {
      uuid
      criado_em
      atualizado_em
      login
      telefones
      emails
      nome
      nacionalidade
      data_nascimento
      estado_civil
      cpf
      oab {
        numero
        uf
        letra
      }
    }
  }
`;

export const MUTATION_UPDATE_ADVOGADO: TypedDocumentNode<
  {
    updateAdvogado: true;
  },
  UpdateAdvogadoArgs
> = gql`
  mutation UpdateAdvogado($uuid: String!, $data: updateAdvogado_data) {
    updateAdvogado(uuid: $uuid, data: $data)
  }
`;
