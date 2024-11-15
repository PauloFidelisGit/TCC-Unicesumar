import { ProcessoRepositoryDTO } from "../../../domain/repositories/processo.repository-abstract.js";
import { DeepPartial } from "../../../domain/types/index.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";

export interface ProcessoInputResolverInputDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDateTime"];
  atualizado_em: Datetime<string | null>["toDateTime"];
  numero: string;
  data_autuacao: string | null;
  valor_causa: number | null;
  segredo_justica: boolean | null;
  tutela_urgencia: boolean | null;
  criado_por_advogado_uuid: string;
  orgao_uuid: string;
  classe_judicial_uuid: string | null;
}

export type PickProcessoInputResolverDTO<
  T extends DeepPartial<ProcessoInputResolverInputDTO>,
> = keyof T extends keyof ProcessoInputResolverInputDTO ? T : never;

export type ProcessoOutputResolverDTO = {
  id?: number;
  uuid?: string;
  criado_em?: Datetime<string>["toDateTime"];
  atualizado_em?: Datetime<string | null>["toDateTime"];
  numero?: string;
  data_autuacao?: string | null;
  valor_causa?: number | null;
  segredo_justica?: boolean | null;
  tutela_urgencia?: boolean | null;
  orgao_uuid?: string | null;
  classe_judicial_uuid?: string | null;
  criado_por_advogado_uuid?: string;
};
export type PickProcessoOutputResolverDTO<
  T extends DeepPartial<ProcessoOutputResolverDTO>,
> = keyof T extends keyof ProcessoOutputResolverDTO ? T : never;

export function processoOutputResolverDTO(
  props: Partial<ProcessoRepositoryDTO>,
): ProcessoOutputResolverDTO {
  return {
    id: props?.id,
    uuid: new Uuid(props.uuid)?.value,
    criado_em: new Datetime(props.criado_em)?.toDateTime,
    atualizado_em: new Datetime(props.atualizado_em)?.toDateTime,
    numero: props.numero,
    data_autuacao: new Datetime(props.data_autuacao)?.toDateTime,
    valor_causa: props.valor_causa,
    segredo_justica: props.segredo_justica,
    tutela_urgencia: props.tutela_urgencia,
    orgao_uuid: new Uuid(props.orgao_uuid)?.value,
    classe_judicial_uuid: new Uuid(props.classe_judicial_uuid)?.value,
    criado_por_advogado_uuid: new Uuid(props.criado_por_advogado_uuid)?.value,
  };
}
