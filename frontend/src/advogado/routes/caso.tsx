import { RouteObject } from "react-router-dom";
import {
  AnotacoesCasoTab,
  CasoPage,
  CasosPage,
  IndexCasoTab,
  ProcessosCasoTab,
  RegisterCasoPage,
} from "./lazy-imports";

export const _navCaso = {
  casos: "/dashboard/advogado/casos",
  caso: {
    index: "/dashboard/advogado/caso/:caso_uuid",
    processos: "/dashboard/advogado/caso/:caso_uuid/processos",
    toProcessos: ({ caso_uuid }: { caso_uuid: string }) =>
      `/dashboard/advogado/caso/${caso_uuid}/processos`,
    anotacoes: "/dashboard/advogado/caso/:caso_uuid/anotacoes",
    toAnotacoes: ({ caso_uuid }: { caso_uuid: string }) =>
      `/dashboard/advogado/caso/${caso_uuid}/anotacoes`,
  },
  toCaso: ({ caso_uuid }: { caso_uuid: string }) =>
    `/dashboard/advogado/caso/${caso_uuid}`,
  registerCaso: "/dashboard/advogado/register-caso",
  searchCaso: "/dashboard/advogado/search-caso",
} as const;

export const routesCaso: RouteObject[] = [
  {
    path: _navCaso.casos,
    element: <CasosPage />,
  },
  {
    path: _navCaso.registerCaso,
    element: <RegisterCasoPage />,
  },
  {
    path: _navCaso.caso.index,
    element: <CasoPage />,
    children: [
      {
        path: _navCaso.caso.index,
        element: <IndexCasoTab />,
      },
      {
        path: _navCaso.caso.processos,
        element: <ProcessosCasoTab />,
      },
      {
        path: _navCaso.caso.anotacoes,
        element: <AnotacoesCasoTab />,
      },
    ],
  },
];
