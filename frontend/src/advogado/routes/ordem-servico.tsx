import { RouteObject } from "react-router-dom";
import {
  OrdemServicoPage,
  OrdensServicoPage,
  RegisterOrdemServicoPage,
} from "./lazy-imports";

export const _navOrdemServico = {
  toOrdemServico: ({ ordem_servico_uuid }: { ordem_servico_uuid: string }) =>
    `/dashboard/advogado/ordem-servico/${ordem_servico_uuid}`,
  registerOrdemServico: "/dashboard/advogado/register-ordem-servico",
  ordemServico: {
    index: "/dashboard/advogado/ordem-servico/:ordem_servico_uuid",
  },
  ordensServico: "/dashboard/advogado/ordens-servico",
} as const;

export const routesOrdemServico: RouteObject[] = [
  {
    path: _navOrdemServico.registerOrdemServico,
    element: <RegisterOrdemServicoPage />,
  },
  {
    path: _navOrdemServico.ordemServico.index,
    element: <OrdemServicoPage />,
  },
  {
    path: _navOrdemServico.ordensServico,
    element: <OrdensServicoPage />,
  },
];
