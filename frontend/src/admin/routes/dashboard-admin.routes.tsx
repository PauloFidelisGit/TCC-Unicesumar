import { RouteObject } from "react-router-dom";
import LazyPages from "./lazy-imports";
import { nav } from "./nav";

export const dashboardAdmin: RouteObject[] = [
  {
    path: nav.dashboard.admin.index,
    element: <LazyPages.DashboardAdminContainer />,
    children: [
      {
        index: true,
        element: <LazyPages.IndexPage />,
      },

      // Advogado
      {
        path: nav.dashboard.admin.advogado.index,
        element: <LazyPages.AdvogadoPage />,
        children: [
          {
            index: true,
            element: <LazyPages.AdvogadoIndexPage />,
          },
          {
            path: nav.dashboard.admin.advogado.enderecos,
            element: <LazyPages.AdvogadoEnderecosPage />,
          },
        ],
      },
      {
        path: nav.dashboard.admin.advogados,
        element: <LazyPages.AdvogadosPage />,
      },
      {
        path: nav.dashboard.admin.registerAdvogado,
        element: <LazyPages.RegisterAdvogadoPage />,
      },
      {
        path: nav.dashboard.admin.searchAdvogado,
        element: <LazyPages.SearchAdvogadoPage />,
      },
    ],
  },
];
