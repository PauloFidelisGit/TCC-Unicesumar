import { ErrorBoundary } from "@/components/error-boundary";
import { IconOutlineBusinessCenter, IconOutlineHome } from "@/components/icons";
import { DefaultSpinnerFallback } from "@/components/spinner";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { nav } from "../routes/nav";
import { NavBarProps } from "./dashboard-nav-bar";
import { Dashboard } from "./dashboard";

const navBarItems: NavBarProps["items"] = [
  {
    label: "Dashboard",
    to: nav.dashboard.admin.index,
    icon: IconOutlineHome,
  },

  {
    label: "Advogados",
    to: nav.dashboard.admin.advogados,
    icon: IconOutlineBusinessCenter,
  },
];

const userOptions = [
  {
    label: "Alterar senha",
    to: "#",
  },
];

export default function DashboardAdmin() {
  return (
    <Dashboard
      mobileNavBar={{
        items: navBarItems,
      }}
      navBar={{
        items: navBarItems,
      }}
      userHeaderOptions={userOptions}
    >
      <Suspense fallback={<DefaultSpinnerFallback />}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </Suspense>
    </Dashboard>
  );
}
