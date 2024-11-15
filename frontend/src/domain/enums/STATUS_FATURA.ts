export enum STATUS_FATURA {
  PENDENTE = "PENDENTE",
  QUITADA = "QUITADA",
}

export const SELECT_STATUS_FATURA = [
  { label: "Pendente", value: STATUS_FATURA.PENDENTE },
  { label: "Quitada", value: STATUS_FATURA.QUITADA },
];

export function selectLabelStatusFatura(value: STATUS_FATURA): string {
  return SELECT_STATUS_FATURA.find((v) => v.value === value)?.label || "";
}
