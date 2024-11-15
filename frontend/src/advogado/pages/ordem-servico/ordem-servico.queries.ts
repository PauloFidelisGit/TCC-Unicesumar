import { PRIORIDADE_ORDEM_SERVICO } from "@/domain/enums/PRIORIDADE_ORDEM_SERVICO";
import { STATUS_ORDEM_SERVICO } from "@/domain/enums/STATUS_ORDEM_SERVICO";
import { Datetime } from "@/domain/vo/datetime.vo";
import { FloatValue } from "@/domain/vo/float-value";
import { Uuid } from "@/domain/vo/uuid.vo";
import { gql, TypedDocumentNode } from "@apollo/client";
import type {
  FindOrdemServicoArgs,
  PickFindOrdemServicoReturn,
  UpdateOrdemServicoArgs,
  UpdateOrdemServicoReturn,
} from "backend/types";

export type QueryFindOrdemServicoDTO = PickFindOrdemServicoReturn<{
  uuid?: Uuid<string>["value"];
  criado_em?: Datetime<string>["toDateTime"];
  atualizado_em?: Datetime<string | null>["toDateTime"];
  numero?: number;
  descricao?: string | null;
  data_abertura?: Datetime<string>["toDateTime"];
  data_conclusao?: Datetime<string | null>["toDateTime"];
  data_cancelamento?: Datetime<string | null>["toDateTime"];
  prazo_conclusao?: Datetime<string | null>["toDateTime"];
  status?: STATUS_ORDEM_SERVICO;
  prioridade?: PRIORIDADE_ORDEM_SERVICO;
  valor_servico?: FloatValue<number>["value"];
  criado_por_advogado_uuid?: Uuid<string>["value"];
  servico_uuid?: Uuid<string>["value"];
  fatura_uuid: Uuid<string | null>["value"];
  processo_uuid?: Uuid<string | null>["value"];
  caso_uuid?: Uuid<string | null>["value"];
  servico: {
    nome: string;
  } | null;
  processo: {
    numero: string;
  } | null;
  caso: {
    titulo: string;
  } | null;
}>;

export const QUERY_FIND_ORDEM_SERVICO: TypedDocumentNode<
  {
    findOrdemServico: QueryFindOrdemServicoDTO;
  },
  FindOrdemServicoArgs
> = gql`
  query FindOrdemServico($where: String!, $value: String!) {
    findOrdemServico(where: $where, value: $value) {
      uuid
      criado_em
      atualizado_em
      numero
      titulo
      descricao
      data_abertura
      data_conclusao
      data_cancelamento
      prazo_conclusao
      status
      prioridade
      criado_por_advogado_uuid
      valor_servico
      servico_uuid
			fatura_uuid
      servico {
        nome
      }
      processo_uuid
      processo {
        numero
      }
      caso_uuid
      caso {
        titulo
      }
    }
  }
`;

export const MUTATION_UPDATE_ORDEM_SERVICO: TypedDocumentNode<
  {
    updateOrdemServico: UpdateOrdemServicoReturn;
  },
  UpdateOrdemServicoArgs
> = gql`
  mutation UpdateOrdemServico($uuid: String!, $data: UpdateOrdemServico_data) {
    updateOrdemServico(uuid: $uuid, data: $data)
  }
`;
