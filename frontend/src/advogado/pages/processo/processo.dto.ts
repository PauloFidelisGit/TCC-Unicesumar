import { TIPO_RELACIONAMENTO_PROCESSO_PESSOA } from "@/domain/enums";
import { Datetime } from "@/domain/vo/datetime.vo";
import { FloatValue } from "@/domain/vo/float-value";
import {
  formatCNPJ,
  formatCPF,
  formatProcessNumber,
  setBlankStringIfUndefinedOrNull,
} from "@/lib/utils";
import { QueryFindProcessoDTO } from "./processo.queries";

export type Polo = {
  pessoa_uuid: string;
  nome: string;
  doc: string;
  relacionamento_processo_uuid: string;
};

function mapFindPolosProcesso(data?: QueryFindProcessoDTO["polos"]) {
  const polo_ativo: Polo[] = [];
  const polo_passivo: Polo[] = [];
  const testemunha: Polo[] = [];

  data?.forEach((v) => {
    const item = {
      pessoa_uuid: v?.pessoa?.uuid || "",
      nome: v?.pessoa?.nome || v?.pessoa?.nome_fantasia || "",
      doc:
        (v?.pessoa?.cpf ? formatCPF(v?.pessoa?.cpf) : undefined) ||
        (v?.pessoa?.cnpj ? formatCNPJ(v?.pessoa?.cnpj) : undefined) ||
        "Não cadastrado",
      relacionamento_processo_uuid: v.uui,
    };
    switch (v?.tipo_relacionamento) {
      case TIPO_RELACIONAMENTO_PROCESSO_PESSOA.POLO_ATIVO:
        polo_ativo.push(item);
        break;
      case TIPO_RELACIONAMENTO_PROCESSO_PESSOA.POLO_PASSIVO:
        polo_passivo.push(item);
        break;
      case TIPO_RELACIONAMENTO_PROCESSO_PESSOA.TESTEMUNHA:
        testemunha.push(item);
        break;
    }
  });

  return {
    polo_ativo,
    polo_passivo,
    testemunha,
  };
}
export function mapFindProcessoToEditForm(data?: QueryFindProcessoDTO) {
  return setBlankStringIfUndefinedOrNull({
    numero: data?.numero ? formatProcessNumber(data.numero) : "",
    data_autuacao: data?.data_autuacao
      ? new Datetime(data.data_autuacao)?.toDate
      : "",
    valor_causa: new FloatValue(data?.valor_causa).formatDecimalBr(),
    segredo_justica: data?.segredo_justica || false,
    tutela_urgencia: data?.tutela_urgencia || false,
    orgao: {
      value: data?.orgao_uuid || "",
      label: data?.orgao?.nome || "",
    },
    classe_judicial: {
      value: data?.classe_judicial_uuid || "",
      label: data?.classe_judicial?.nome || "",
    },
    polo: mapFindPolosProcesso(data?.polos),
  });
}
export type MapFindProcessoToEditFormDTO = ReturnType<
  typeof mapFindProcessoToEditForm
>;
