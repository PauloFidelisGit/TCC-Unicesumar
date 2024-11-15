export enum FORMA_PAGAMENTO_FATURA {
  A_VISTA = "A_VISTA",
  PARCELADO = "PARCELADO",
}

export const SELECT_FORMA_PAGAMETO_FATURA = [
	{ label: "À vista", value: FORMA_PAGAMENTO_FATURA.A_VISTA },
	{ label: "Parcelado", value: FORMA_PAGAMENTO_FATURA.PARCELADO },
];
