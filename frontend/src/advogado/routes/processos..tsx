import { RouteObject } from "react-router-dom";
import {
  AnotacoesProcessoTab,
  IndexProcessoPage,
  PartesProcessoTab,
  ProcessoPage,
  ProcessosPage,
  RegisterProcessoPage,
  SearchProcessoPage,
} from "./lazy-imports";

export const _navProcesso = {
  processos: "/dashboard/advogado/processos",
  processo: {
    index: "/dashboard/advogado/processo/:processo_uuid",
    anotacoes: "/dashboard/advogado/processo/:processo_uuid/anotacoes",
    toAnotacoes: ({ processo_uuid }: { processo_uuid: string }) =>
      `/dashboard/advogado/processo/${processo_uuid}/anotacoes`,
    partes: "/dashboard/advogado/processo/:processo_uuid/partes",
    toPartes: ({ processo_uuid }: { processo_uuid: string }) =>
      `/dashboard/advogado/processo/${processo_uuid}/partes`,
  },
  toProcesso: ({ processo_uuid }: { processo_uuid: string }) =>
    `/dashboard/advogado/processo/${processo_uuid}`,
  registerProcesso: "/dashboard/advogado/register-processo",
  searchProcesso: "/dashboard/advogado/search-processo",
} as const;

export const routesProcesso: RouteObject[] = [
  {
    path: _navProcesso.processos,
    element: <ProcessosPage />,
  },
  {
    path: _navProcesso.processo.index,
    element: <ProcessoPage />,
    children: [
      {
        index: true,
        element: <IndexProcessoPage />,
      },
      {
        path: _navProcesso.processo.partes,
        element: <PartesProcessoTab />,
      },
      {
        path: _navProcesso.processo.anotacoes,
        element: <AnotacoesProcessoTab />,
      },
    ],
  },
  {
    path: _navProcesso.searchProcesso,
    element: <SearchProcessoPage />,
  },
  {
    path: _navProcesso.registerProcesso,
    element: <RegisterProcessoPage />,
  },
];
