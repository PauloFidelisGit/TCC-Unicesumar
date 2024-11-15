import { ErrorBoundary } from "@/components/error-boundary";
import {
  IconMapSearchOutline,
  IconOutlineAssignment,
  IconOutlineBuilding,
  IconOutlineCases,
  IconOutlineFolder,
  IconOutlineGroups,
  IconOutlineHome,
  IconScaleBalance,
  IconTagOutline,
} from "@/components/icons";
import IconOutlineDesignServices from "@/components/icons/icon-outline-design-services";
import { DefaultSpinnerFallback } from "@/components/spinner";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/auth-context/auth.provider";
import { navAdvogado } from "../routes/nav";
import { Dashboard } from "./dashboard";
import { NavBarProps } from "./dashboard-nav-bar";

const navBarItems: NavBarProps["items"] = [
  {
    label: "Dashboard",
    to: navAdvogado.dashboard.advogado.index,
    icon: IconOutlineHome,
  },
  {
    label: "Processos",
    to: navAdvogado.dashboard.advogado.processos,
    icon: IconOutlineFolder,
  },
  {
    label: "Pessoas",
    to: navAdvogado.dashboard.advogado.pessoas,
    icon: IconOutlineGroups,
  },
  {
    label: "Casos",
    to: navAdvogado.dashboard.advogado.casos,
    icon: IconOutlineCases,
  },
  {
    label: "Tribunais",
    to: navAdvogado.dashboard.advogado.tribunais,
    icon: IconScaleBalance,
  },
  {
    label: "Órgãos",
    to: navAdvogado.dashboard.advogado.orgaos,
    icon: IconOutlineBuilding,
  },
  {
    label: "Classes judiciais",
    to: navAdvogado.dashboard.advogado.searchClasseJudicial,
    icon: IconTagOutline,
  },

  {
    label: "Municipios",
    to: navAdvogado.dashboard.advogado.searchMunicipio,
    icon: IconMapSearchOutline,
  },
  {
    label: "Servicos",
    to: navAdvogado.dashboard.advogado.servicos,
    icon: IconOutlineDesignServices,
  },
  {
    label: "Ordens de serviço",
    to: navAdvogado.dashboard.advogado.ordensServico,
    icon: IconOutlineAssignment,
  },
  {
    label: "Faturas",
    to: navAdvogado.dashboard.advogado.faturas,
    icon: IconOutlineCases,
  },
];

const userOptions = [
  {
    label: "Alterar senha",
    to: "#",
  },
];

export default function DashboardAdvogado() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Dashboard
          mobileNavBar={{
            items: navBarItems,
          }}
          navBar={{
            items: navBarItems,
          }}
          userHeaderOptions={userOptions}
        >
          <ErrorBoundary>
            <Suspense fallback={<DefaultSpinnerFallback />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </Dashboard>
      </AuthProvider>
    </ErrorBoundary>
  );
}
