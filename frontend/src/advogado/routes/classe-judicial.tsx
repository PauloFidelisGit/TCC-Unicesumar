import { RouteObject } from "react-router-dom";
import { ClasseJudicialPage, SearchClasseJudicialPage } from "./lazy-imports";

export const _navClasseJudicial = {
  searchClasseJudicial: "/dashboard/advogado/search-classe-judicial",
  classeJudicial: "/dashboard/advogado/classe-judicial/:classe_judicial_uuid",
  toClasseJudicial: ({
    classe_judicial_uuid,
  }: {
    classe_judicial_uuid: string;
  }) => `/dashboard/advogado/classe-judicial/${classe_judicial_uuid}`,
  toSelectClasseJudicial: ({
    page_ref,
    action,
  }: {
    page_ref: string;
    action: "select";
  }) => {
    const searchParams = new URLSearchParams();
    searchParams.set("page_ref", page_ref);
    searchParams.set("action", action);
    return `/dashboard/advogado/search-classe-judicial?${searchParams.toString()}`;
  },
} as const;

export const routesClasseJudicial: RouteObject[] = [
  {
    path: _navClasseJudicial.classeJudicial,
    element: <ClasseJudicialPage />,
  },
  {
    path: _navClasseJudicial.searchClasseJudicial,
    element: <SearchClasseJudicialPage />,
  },
];
