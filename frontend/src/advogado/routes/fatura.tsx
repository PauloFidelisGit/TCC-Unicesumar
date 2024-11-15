import { RouteObject } from "react-router-dom";
import { CreateFaturaPage, FaturaPage, FaturasPage } from "./lazy-imports";

export const _navFatura = {
  createFatura: "/dashboard/advogado/create-fatura",
  toFatura: ({ fatura_uuid }: { fatura_uuid: string }) =>
    `/dashboard/advogado/fatura/${fatura_uuid}`,
  faturas: "/dashboard/advogado/faturas",
  fatura: {
    index: "/dashboard/advogado/fatura/:fatura_uuid",
  },
} as const;

export const routesFatura: RouteObject[] = [
  {
    path: _navFatura.createFatura,
    element: <CreateFaturaPage />,
  },
  {
    path: _navFatura.faturas,
    element: <FaturasPage />,
  },
  {
    path: _navFatura.fatura.index,
    element: <FaturaPage />,
  },
];
