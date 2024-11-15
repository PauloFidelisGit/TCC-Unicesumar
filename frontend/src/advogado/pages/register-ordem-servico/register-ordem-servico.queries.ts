import { TypedDocumentNode, gql } from "@apollo/client";
import {
  CreateOrdemServicoArgs,
  CreateOrdemServicoReturn,
} from "backend/types";

export const MUTATION_CREATE_ORDEM_SERVICO: TypedDocumentNode<
  {
    createOrdemServico: CreateOrdemServicoReturn;
  },
  CreateOrdemServicoArgs
> = gql`
  mutation CreateOrdemServico(
    $criado_em: String!
    $data_abertura: String!
    $status: String!
    $prioridade: String!
    $criado_por_advogado_uuid: String!
    $servico_uuid: String!
    $caso_uuid: String
    $processo_uuid: String
    $prazo_conclusao: String
    $data_cancelamento: String
    $data_conclusao: String
    $descricao: String
		$valor_servico: Float!
  ) {
    createOrdemServico(
      criado_em: $criado_em
      data_abertura: $data_abertura
      status: $status
      prioridade: $prioridade
      criado_por_advogado_uuid: $criado_por_advogado_uuid
      servico_uuid: $servico_uuid
      caso_uuid: $caso_uuid
      processo_uuid: $processo_uuid
      prazo_conclusao: $prazo_conclusao
      data_cancelamento: $data_cancelamento
      data_conclusao: $data_conclusao
      descricao: $descricao
			valor_servico: $valor_servico
    ) {
      uuid
    }
  }
`;
