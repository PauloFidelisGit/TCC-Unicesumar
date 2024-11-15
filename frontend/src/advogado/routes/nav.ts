import { _navCaso } from "./caso";
import { _navClasseJudicial } from "./classe-judicial";
import { _navFatura } from "./fatura";
import { _navMunicipio } from "./municipio";
import { _navOrdemServico } from "./ordem-servico";
import { _navOrgao } from "./orgao";
import { _navPessoa } from "./pessoa";
import { _navProcesso } from "./processos.";
import { _navServico } from "./servico";
import { _navTribunal } from "./tribunal";

export const navAdvogado = {
  dashboard: {
    advogado: {
      index: "/dashboard/advogado",
      ..._navPessoa,
      ..._navClasseJudicial,
      ..._navTribunal,
      ..._navMunicipio,
      ..._navOrgao,
      ..._navProcesso,
      ..._navCaso,
      ..._navOrdemServico,
      ..._navFatura,
      ..._navServico,
    },
  },
} as const;
