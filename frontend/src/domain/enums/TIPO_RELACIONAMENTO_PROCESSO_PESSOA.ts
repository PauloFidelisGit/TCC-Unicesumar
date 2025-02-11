export enum TIPO_RELACIONAMENTO_PROCESSO_PESSOA {
  POLO_ATIVO = "POLO_ATIVO",
  POLO_PASSIVO = "POLO_PASSIVO",
  TESTEMUNHA = "TESTEMUNHA",
}

export const SELECT_TIPO_RELACIONAMENTO_PROCESSO_PESSOA = [
  {
    value: TIPO_RELACIONAMENTO_PROCESSO_PESSOA.POLO_ATIVO,
    label: "Polo Ativo",
  },
  {
    value: TIPO_RELACIONAMENTO_PROCESSO_PESSOA.POLO_PASSIVO,
    label: "Polo Passivo",
  },
  {
    value: TIPO_RELACIONAMENTO_PROCESSO_PESSOA.TESTEMUNHA,
    label: "Testemunha",
  },
];
