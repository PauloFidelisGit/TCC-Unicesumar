export enum TIPO_PESSOA {
  PJ = "PJ",
  PF = "PF",
}

export const SELECT_TIPO_PESSOA = [
  { label: "Pessoa Física", value: TIPO_PESSOA.PF },
  { label: "Pessoa Jurídica", value: TIPO_PESSOA.PJ },
] as const;
