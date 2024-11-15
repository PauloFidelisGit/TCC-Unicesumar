import { RouteObject } from "react-router-dom";
import { MunicipioPage, SearchMunicipioPage } from "./lazy-imports";

export const _navMunicipio = {
  municipio: "/dashboard/advogado/municipio/:municipio_uuid",
  toMunicipio: ({ municipio_uuid }: { municipio_uuid: string }) =>
    `/dashboard/advogado/municipio/${municipio_uuid}`,
  searchMunicipio: "/dashboard/advogado/search-municipio",
  toSelectMunicipio: ({
    page_ref,
    action,
  }: {
    page_ref: string;
    action: "select";
  }) => {
    const searchParams = new URLSearchParams();
    searchParams.set("page_ref", page_ref);
    searchParams.set("action", action);
    return `/dashboard/advogado/search-municipio?${searchParams.toString()}`;
  },
} as const;

export const routesMunicipio: RouteObject[] = [
  {
    path: _navMunicipio.municipio,
    element: <MunicipioPage />,
  },
  {
    path: _navMunicipio.searchMunicipio,
    element: <SearchMunicipioPage />,
  },
];
