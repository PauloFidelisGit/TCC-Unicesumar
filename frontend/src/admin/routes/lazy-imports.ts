import { lazy } from "react";

// DASHBOARD
const DashboardAdminContainer = lazy(
  () => import("@/admin/dashboard/dashboard-admin"),
);
const IndexPage = lazy(() => import("@/admin/pages/index/index.page"));

// ADVOGADO
const AdvogadoPage = lazy(() => import("@/admin/pages/advogado/advogado.page"));
const AdvogadoIndexPage = lazy(
  () => import("@/admin/pages/advogado/index/index-advogado.page"),
);
const AdvogadoEnderecosPage = lazy(
  () => import("@/admin/pages/advogado/enderecos/enderecos-advogado.tab"),
);
const AdvogadosPage = lazy(
  () => import("@/admin/pages/advogados/advogados.page"),
);
const RegisterAdvogadoPage = lazy(
  () => import("@/admin/pages/register-advogado/register-advogado.page"),
);
const SearchAdvogadoPage = lazy(
  () => import("@/admin/pages/search-advogado/search-advogado.page"),
);

export default {
  AdvogadoEnderecosPage,
  AdvogadoIndexPage,
  AdvogadoPage,
  AdvogadosPage,
  DashboardAdminContainer,
  IndexPage,
  RegisterAdvogadoPage,
  SearchAdvogadoPage,
};
