import { dashboardAdmin } from "@/admin/routes/dashboard-admin.routes";
import { dashboardAdvogado } from "@/advogado/routes/dashboard-advogado.routes";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login/login.page";
import { navRoot } from "./nav-root";

export const router = createBrowserRouter([
  {
    path: navRoot.login,
    element: <LoginPage />,
  },
  ...dashboardAdmin,
  ...dashboardAdvogado,
]);
