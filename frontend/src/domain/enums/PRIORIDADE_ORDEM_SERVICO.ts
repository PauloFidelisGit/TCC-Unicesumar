export enum PRIORIDADE_ORDEM_SERVICO {
  BAIXA = "BAIXA",
  MEDIA = "MEDIA",
  ALTA = "ALTA",
}

export const SELECT_PRIORIDADE_ORDEM_SERVICO = [
  {
    value: PRIORIDADE_ORDEM_SERVICO.BAIXA,
    label: "Baixa",
  },
  {
    value: PRIORIDADE_ORDEM_SERVICO.MEDIA,
    label: "Média",
  },
  {
    value: PRIORIDADE_ORDEM_SERVICO.ALTA,
    label: "Alta",
  },
];
