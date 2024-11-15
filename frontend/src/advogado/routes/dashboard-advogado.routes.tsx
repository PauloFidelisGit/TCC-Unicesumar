import { RouteObject } from "react-router-dom";
import { routesCaso } from "./caso";
import { routesClasseJudicial } from "./classe-judicial";
import { routesFatura } from "./fatura";
import { DashboardAdvogado, IndexPage } from "./lazy-imports";
import { routesMunicipio } from "./municipio";
import { routesOrdemServico } from "./ordem-servico";
import { routesOrgao } from "./orgao";
import { routesPessoa } from "./pessoa";
import { routesProcesso } from "./processos.";
import { routesServico } from "./servico";
import { routesTribunais } from "./tribunal";
import { navAdvogado } from "./nav";

export const dashboardAdvogado: RouteObject[] = [
  {
    path: navAdvogado.dashboard.advogado.index,
    element: <DashboardAdvogado />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      ...routesCaso,
      ...routesMunicipio,
      ...routesOrgao,
      ...routesClasseJudicial,
      ...routesFatura,
      ...routesOrdemServico,
      ...routesPessoa,
      ...routesProcesso,
      ...routesServico,
      ...routesTribunais,
    ],
  },
];
