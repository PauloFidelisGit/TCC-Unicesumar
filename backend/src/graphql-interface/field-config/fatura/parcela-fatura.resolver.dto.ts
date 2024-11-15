import { ParcelaFaturaRepositoryDTO } from "../../../domain/repositories/parcela-fatura.repository-abstract.js";
import { DeepPartial } from "../../../domain/types/index.js";
import { Datetime } from "../../../domain/vo/datetime.vo.js";
import { FloatValue } from "../../../domain/vo/float-value.js";
import { Uuid } from "../../../domain/vo/uuid.vo.js";

export interface ParcelaFaturaInputResolverDTO {
  id: number;
  uuid: string;
  criado_em: Datetime<string>["toDateTime"];
  atualizado_em: Datetime<string | null>["toDateTime"];
  fatura_uuid: string;
  numero: number;
  valor: number;
  data_vencimento: string;
  data_pagamento: string | null;
}
export type PickParcelaFaturaInputResolverDTO<
  T extends DeepPartial<ParcelaFaturaInputResolverDTO>,
> = keyof T extends keyof ParcelaFaturaInputResolverDTO ? T : never;

export type ParcelaFaturaOutputResolverDTO = {
  id?: number;
  uuid?: string;
  criado_em?: string;
  atualizado_em?: string | null;
  fatura_uuid?: string;
  numero?: number;
  valor?: number;
  data_vencimento?: string;
  data_pagamento?: string | null;
};
export type PickParcelaFaturaOutputResolverDTO<
  T extends DeepPartial<ParcelaFaturaOutputResolverDTO>,
> = keyof T extends keyof ParcelaFaturaOutputResolverDTO ? T : never;

export function parcelaFaturaOutputResolverDTO(
  props: Partial<ParcelaFaturaRepositoryDTO>,
): ParcelaFaturaOutputResolverDTO {
  return {
    id: props.id,
    uuid: new Uuid(props.uuid)?.value,
    criado_em: new Datetime(props.criado_em)?.toDateTime,
    atualizado_em: new Datetime(props.atualizado_em)?.toDateTime,
    fatura_uuid: new Uuid(props.fatura_uuid)?.value,
    numero: props.numero,
    valor: new FloatValue(props.valor)?.value,
    data_vencimento: new Datetime(props.data_vencimento)?.toDate,
    data_pagamento: new Datetime(props.data_pagamento)?.toDate,
  };
}
