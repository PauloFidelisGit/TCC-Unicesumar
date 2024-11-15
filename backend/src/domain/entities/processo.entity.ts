import { DeepPartial } from "../types/index.js";
import { Datetime } from "../vo/datetime.vo.js";
import { Uuid } from "../vo/uuid.vo.js";

export interface Processo {
  id: number;
  uuid: Uuid<string>;
  criado_em: Datetime<string>;
  atualizado_em: Datetime<string | null>;
  numero: string;
  data_autuacao: Datetime<string | null>;
  valor_causa: number | null;
  segredo_justica: boolean | null;
  tutela_urgencia: boolean | null;

  // Relacionamentos
  criado_por_advogado_uuid: Uuid<string>;
  orgao_uuid: Uuid<string | null> | null;
  classe_judicial_uuid: Uuid<string | null> | null;
}

export type PickProcesso<T extends DeepPartial<Processo>> =
  keyof T extends keyof Processo ? T : never;
