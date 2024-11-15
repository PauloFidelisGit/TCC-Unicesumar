import { RouteObject } from "react-router-dom";
import {
  RegisterTribunalPage,
  SearchTribunalPage,
  TribunaisPage,
  TribunalPage,
} from "./lazy-imports";

export const _navTribunal = {
  registerTribunal: "/dashboard/advogado/register-tribunal",
  tribunais: "/dashboard/advogado/tribunais",
  searchTribunal: "/dashboard/advogado/search-tribunal",
  tribunal: "/dashboard/advogado/tribunal/:tribunal_uuid",
  toTribunal: ({ tribunal_uuid }: { tribunal_uuid: string }) =>
    `/dashboard/advogado/tribunal/${tribunal_uuid}`,
  toSelectTribunal: ({
    page_ref,
    action,
  }: {
    page_ref: string;
    action: "select";
  }) => {
    const searchParams = new URLSearchParams();
    searchParams.set("page_ref", page_ref);
    searchParams.set("action", action);
    return `/dashboard/advogado/search-tribunal?${searchParams.toString()}`;
  },
} as const;

export const routesTribunais: RouteObject[] = [
  {
    path: _navTribunal.tribunais,
    element: <TribunaisPage />,
  },
  {
    path: _navTribunal.tribunal,
    element: <TribunalPage />,
  },
  {
    path: _navTribunal.searchTribunal,
    element: <SearchTribunalPage />,
  },
  {
    path: _navTribunal.registerTribunal,
    element: <RegisterTribunalPage />,
  },
];
