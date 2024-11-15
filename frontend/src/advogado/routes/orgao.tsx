import { RouteObject } from "react-router-dom";
import {
  OrgaoPage,
  OrgaosPage,
  RegisterOrgaoPage,
  SearchOrgaoPage,
} from "./lazy-imports";

export const _navOrgao = {
  orgaos: "/dashboard/advogado/orgaos",
  orgao: "/dashboard/advogado/orgao/:orgao_uuid",
  registerOrgao: "/dashboard/advogado/register-orgao",
  searchOrgao: "/dashboard/advogado/search-orgao",
  toOrgao: ({ orgao_uuid }: { orgao_uuid: string }) =>
    `/dashboard/advogado/orgao/${orgao_uuid}`,
  toSelectOrgao: ({
    page_ref,
    action,
  }: {
    page_ref: string;
    action: "select";
  }) => {
    const searchParams = new URLSearchParams();
    searchParams.set("page_ref", page_ref);
    searchParams.set("action", action);
    return `/dashboard/advogado/search-orgao?${searchParams.toString()}`;
  },
} as const;

export const routesOrgao: RouteObject[] = [
  {
    path: _navOrgao.orgaos,
    element: <OrgaosPage />,
  },
  {
    path: _navOrgao.orgao,
    element: <OrgaoPage />,
  },
  {
    path: _navOrgao.searchOrgao,
    element: <SearchOrgaoPage />,
  },
  {
    path: _navOrgao.registerOrgao,
    element: <RegisterOrgaoPage />,
  },
];
