import { RouteObject } from "react-router-dom";
import { RegisterServicoPage, ServicoPage, ServicosPage } from "./lazy-imports";

export const _navServico = {
  // Servico
  servicos: "/dashboard/advogado/servicos",
  registerServico: "/dashboard/advogado/register-servico",
  toServico: ({ servico_uuid }: { servico_uuid: string }) =>
    `/dashboard/advogado/servico/${servico_uuid}`,
  servico: {
    index: "/dashboard/advogado/servico/:servico_uuid",
  },
} as const;

export const routesServico: RouteObject[] = [
  {
    path: _navServico.registerServico,
    element: <RegisterServicoPage />,
  },
  {
    path: _navServico.servico.index,
    element: <ServicoPage />,
  },
  {
    path: _navServico.servicos,
    element: <ServicosPage />,
  },
];
