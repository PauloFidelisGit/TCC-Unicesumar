import { gql, TypedDocumentNode } from "@apollo/client";
import type { CreateFaturaArgs, CreateFaturaReturn } from "backend/types";

export const MUTATION_CREATE_FATURA: TypedDocumentNode<
  {
    createFatura: CreateFaturaReturn;
  },
  CreateFaturaArgs
> = gql`
  mutation CreateFatura(
    $criado_em: String!
    $fatura: CreateFatura_fatura
    $parcelas: [CreateFatura_parcelas]
    $ordens_servico: [CreateFatura_ordens_servico]
  ) {
    createFatura(
      criado_em: $criado_em
      fatura: $fatura
      parcelas: $parcelas
      ordens_servico: $ordens_servico
    ) {
      fatura_uuid
    }
  }
`;
