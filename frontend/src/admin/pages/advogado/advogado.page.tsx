import {
  DashboardPageContainer,
  DashboardPageSubtitle,
  DashBoardPageTitle,
} from "@/admin/dashboard/dashboard-page";
import { nav } from "@/admin/routes/nav";
import { ErrorBoundary } from "@/components/error-boundary";
import { Separator } from "@/components/shadcn/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { DefaultSpinnerFallback } from "@/components/spinner";
import { NotFoundError } from "@/domain/errors";
import { useActiveTabRoute } from "@/hooks/use-active-tab-route";
import { useRequiredParams } from "@/hooks/use-required-params";
import { useSuspenseQuery } from "@apollo/client";
import { Suspense, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MapFindAdvogado, mapQueryFindAdvogadoToForm } from "./advogado.dto";
import { QUERY_FIND_ADVOGADO, QueryFindAdvogadoDTO } from "./advogado.queries";

export interface AdvogadoPageOutletContext {
  advogado_uuid: string;
  advogado: MapFindAdvogado;
  advogado_raw: QueryFindAdvogadoDTO;
  setAdvogado: (advogado: MapFindAdvogado) => void;
}

export default function AdvogadoPage() {
  const { advogado_uuid } = useRequiredParams([
    {
      param: "advogado_uuid",
      message: "Advogado não encontrado.",
      isUuid: true,
    },
  ]);

  const { data, error } = useSuspenseQuery(QUERY_FIND_ADVOGADO, {
    variables: {
      where: "uuid",
      value: advogado_uuid,
    },
  });

  if (error) {
    throw new NotFoundError("Advogado não encontrado.");
  }

  const [advogado, setAdvogado] = useState(
    mapQueryFindAdvogadoToForm(data.findAdvogado),
  );

  //==========EFFECTS==========//

  const tabs = useActiveTabRoute([
    [nav.dashboard.admin.advogado.index, "index"],
    [nav.dashboard.admin.advogado.enderecos, "enderecos"],
  ]);

  return (
    <DashboardPageContainer>
      <div className="pb-4">
        <DashBoardPageTitle>{advogado.nome}</DashBoardPageTitle>
        <DashboardPageSubtitle>Advogado</DashboardPageSubtitle>
      </div>
      <Tabs value={tabs}>
        <TabsList>
          <TabsTrigger value="index">
            <NavLink to={nav.dashboard.admin.toAdvogado({ advogado_uuid })}>
              Dados
            </NavLink>
          </TabsTrigger>
          <TabsTrigger value="enderecos">
            <NavLink
              className="block"
              to={nav.dashboard.admin.advogado.toEnderecos({
                advogado_uuid,
              })}
            >
              Endereços
            </NavLink>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <ErrorBoundary>
        <Suspense fallback={<DefaultSpinnerFallback />}>
          <Separator className="my-4" />
          <div className="flex flex-1" id="container">
            <Outlet
              context={{
                advogado_uuid,
                advogado,
                advogado_raw: data.findAdvogado,
                setAdvogado,
              }}
            />
          </div>
        </Suspense>
      </ErrorBoundary>
    </DashboardPageContainer>
  );
}
