import { PRIORIDADE_ORDEM_SERVICO } from "../../../domain/enums/PRIORIDADE_ORDEM_SERVICO.js";
import { STATUS_ORDEM_SERVICO } from "../../../domain/enums/STATUS_ORDEM_SERVICO.js";
import { OrdemServicoRepositoryDTO } from "../../../domain/repositories/ordem-servico.repository-abstract.js";
import { DeepPartial } from "../../../domain/types/index.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { FloatValue } from "../../../domain/vo/float-value.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { CasoOutputResolverDTO } from "../caso/caso.resolver-dto.js";
import { FaturaOutputResolverDTO } from "../fatura/fatura.resolver-dto.js";
import { ProcessoOutputResolverDTO } from "../processo/processo.resolver-dto.js";
import { ServicoOutputResolverDTO } from "../servico/servico.resolver-dto.js";

export interface OrdemServicoInputResolverDTO {
  id: number;
  uuid: Uuid<string>["value"];
  criado_em: Datetime<string>["toDateTime"];
  atualizado_em: Datetime<string | null>["toDateTime"];
  numero: number;
  descricao: string | null;
  data_abertura: Datetime<string>["toDateTime"];
  data_conclusao: Datetime<string | null>["toDateTime"];
  data_cancelamento: Datetime<string | null>["toDateTime"];
  prazo_conclusao: Datetime<string | null>["toDateTime"];
  status: STATUS_ORDEM_SERVICO;
  prioridade: PRIORIDADE_ORDEM_SERVICO;
  valor_servico: FloatValue<number>["value"];
  criado_por_advogado_uuid: Uuid<string>["value"];
  servico_uuid: Uuid<string>["value"];
  fatura_uuid: Uuid<string | null>["value"];
  processo_uuid: Uuid<string | null>["value"];
  caso_uuid: Uuid<string | null>["value"];
}
export type PickOrdemServicoInputResolverDTO<
  T extends DeepPartial<OrdemServicoInputResolverDTO>,
> = keyof T extends keyof OrdemServicoInputResolverDTO ? T : never;

export type OrdemServicoOutputResolverDTO = {
  id?: number;
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
  fatura_uuid?: Uuid<string | null>["value"];
  processo_uuid?: Uuid<string | null>["value"];
  caso_uuid?: Uuid<string | null>["value"];
} & {
  caso?: Partial<CasoOutputResolverDTO> | null;
  fatura?: Partial<FaturaOutputResolverDTO> | null;
  processo?: Partial<ProcessoOutputResolverDTO> | null;
  servico?: Partial<ServicoOutputResolverDTO> | null;
};
export type PickOrdemServicoOutputResolverDTO<
  T extends DeepPartial<OrdemServicoOutputResolverDTO>,
> = keyof T extends keyof OrdemServicoOutputResolverDTO ? T : never;

export function ordemServicoOutputResolverDTO(
  props: Partial<OrdemServicoRepositoryDTO>,
): OrdemServicoOutputResolverDTO {
  return {
    id: props.id,
    uuid: new Uuid(props.uuid)?.value,
    criado_em: new Datetime(props.criado_em)?.toDateTime,
    atualizado_em: new Datetime(props.atualizado_em)?.toDateTime,
    numero: props.numero,
    descricao: props.descricao,
    data_abertura: new Datetime(props.data_abertura)?.toDateTime,
    data_conclusao: new Datetime(props.data_conclusao)?.toDateTime,
    data_cancelamento: new Datetime(props.data_cancelamento)?.toDateTime,
    prazo_conclusao: new Datetime(props.prazo_conclusao)?.toDateTime,
    status: props.status,
    prioridade: props.prioridade,
		valor_servico: new FloatValue(props.valor_servico)?.value,
    criado_por_advogado_uuid: new Uuid(props.criado_por_advogado_uuid)?.value,
    servico_uuid: new Uuid(props.servico_uuid)?.value,
    fatura_uuid: new Uuid(props.fatura_uuid)?.value,
    processo_uuid: new Uuid(props.processo_uuid)?.value,
    caso_uuid: new Uuid(props.caso_uuid)?.value,
  };
}
