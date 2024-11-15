import { STATUS_FATURA } from "../../../domain/enums/STATUS_FATURA.js";
import { FaturaRepositoryDTO } from "../../../domain/repositories/fatura.repository-abstract.js";
import { DeepPartial } from "../../../domain/types/index.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { FloatValue } from "../../../domain/vo/float-value.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";
import { OrdemServicoOutputResolverDTO } from "../ordem-servico/ordem-servico.resolver-dto.js";
import { ParcelaFaturaOutputResolverDTO } from "./parcela-fatura.resolver.dto.js";

export interface FaturaInputResolverDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDateTime"];
  atualizado_em: Datetime<string | null>["toDateTime"];
  valor_total: number;
  data_emissao: string;
  status_fatura: STATUS_FATURA;
  observacoes: string | null;
  criado_por_advogado_uuid: string;
}
export type PickFaturaInputResolverDTO<
  T extends DeepPartial<FaturaInputResolverDTO>,
> = keyof T extends keyof FaturaInputResolverDTO ? T : never;

export type FaturaOutputResolverDTO = {
  id?: number;
  uuid?: string;
  criado_em?: string;
  atualizado_em?: string | null;
  valor_total?: number;
  data_emissao?: string;
  status_fatura?: STATUS_FATURA;
  observacoes?: string | null;
  criado_por_advogado_uuid?: string;
} & {
  parcelas?: Partial<ParcelaFaturaOutputResolverDTO>[];
  ordens_servico?: Partial<OrdemServicoOutputResolverDTO>[];
};
export type PickFaturaOutputResolverDTO<
  T extends DeepPartial<FaturaOutputResolverDTO>,
> = keyof T extends keyof FaturaOutputResolverDTO ? T : never;

export function faturaOutputResolverDTO(
  props: Partial<FaturaRepositoryDTO>,
): FaturaOutputResolverDTO {
  return {
    id: props.id,
    uuid: new Uuid(props.uuid)?.value,
    criado_em: new Datetime(props.criado_em)?.toDateTime,
    atualizado_em: new Datetime(props.atualizado_em)?.toDateTime,
    valor_total: new FloatValue(props.valor_total)?.value,
    data_emissao: new Datetime(props.data_emissao)?.toDateTime,
    status_fatura: props.status_fatura,
    observacoes: props.observacoes,
    criado_por_advogado_uuid: new Uuid(props.criado_por_advogado_uuid)?.value,
  };
}
