export enum STATUS_ORDEM_SERVICO {
  ABERTA = "ABERTA",
  EM_ANDAMENTO = "EM_ANDAMENTO",
  CONCLUIDA = "CONCLUIDA",
  CANCELADA = "CANCELADA",
}

export const SELECT_STATUS_ORDEM_SERVICO = [
  {
    value: STATUS_ORDEM_SERVICO.ABERTA,
    label: "Aberta",
  },
  {
    value: STATUS_ORDEM_SERVICO.EM_ANDAMENTO,
    label: "Em andamento",
  },
  {
    value: STATUS_ORDEM_SERVICO.CONCLUIDA,
    label: "Concluída",
  },
  {
    value: STATUS_ORDEM_SERVICO.CANCELADA,
    label: "Cancelada",
  },
];
