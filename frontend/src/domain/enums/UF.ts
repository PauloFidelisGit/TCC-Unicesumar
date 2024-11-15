const states = [
  { codigo: 11, nome: "Rondônia", sigla: "RO" },
  { codigo: 12, nome: "Acre", sigla: "AC" },
  { codigo: 13, nome: "Amazonas", sigla: "AM" },
  { codigo: 14, nome: "Roraima", sigla: "RR" },
  { codigo: 15, nome: "Pará", sigla: "PA" },
  { codigo: 16, nome: "Amapá", sigla: "AP" },
  { codigo: 17, nome: "Tocantins", sigla: "TO" },
  { codigo: 21, nome: "Maranhão", sigla: "MA" },
  { codigo: 22, nome: "Piauí", sigla: "PI" },
  { codigo: 23, nome: "Ceará", sigla: "CE" },
  { codigo: 24, nome: "Rio Grande do Norte", sigla: "RN" },
  { codigo: 25, nome: "Paraíba", sigla: "PB" },
  { codigo: 26, nome: "Pernambuco", sigla: "PE" },
  { codigo: 27, nome: "Alagoas", sigla: "AL" },
  { codigo: 28, nome: "Sergipe", sigla: "SE" },
  { codigo: 29, nome: "Bahia", sigla: "BA" },
  { codigo: 31, nome: "Minas Gerais", sigla: "MG" },
  { codigo: 32, nome: "Espírito Santo", sigla: "ES" },
  { codigo: 33, nome: "Rio de Janeiro", sigla: "RJ" },
  { codigo: 35, nome: "São Paulo", sigla: "SP" },
  { codigo: 41, nome: "Paraná", sigla: "PR" },
  { codigo: 42, nome: "Santa Catarina", sigla: "SC" },
  { codigo: 43, nome: "Rio Grande do Sul", sigla: "RS" },
  { codigo: 50, nome: "Mato Grosso do Sul", sigla: "MS" },
  { codigo: 51, nome: "Mato Grosso", sigla: "MT" },
  { codigo: 52, nome: "Goiás", sigla: "GO" },
  { codigo: 53, nome: "Distrito Federal", sigla: "DF" },
] as const;

export const SELECT_UF: {
  label: string;
  value: string;
}[] = states.map((state) => ({
  label: state.nome,
  value: state.sigla,
}));

export function getUfByCod(codigo: number | string) {
  return states.find((state) => state.codigo.toString() === codigo.toString());
}
