export enum ESTADO_CIVIL {
  SOLTEIRO = "solteiro",
  CASADO = "casado",
  DIVORCIADO = "divorciado",
  UNIAO_ESTAVEL = "uniao_estavel",
  VIUVO = "viuvo",
}

export const SELECT_ESTADO_CIVIL = [
  { label: "Solteiro", value: ESTADO_CIVIL.SOLTEIRO },
  { label: "Casado", value: ESTADO_CIVIL.CASADO },
  { label: "Divorciado", value: ESTADO_CIVIL.DIVORCIADO },
  { label: "Viúvo", value: ESTADO_CIVIL.VIUVO },
  { label: "União estável", value: ESTADO_CIVIL.UNIAO_ESTAVEL },
] as const;
