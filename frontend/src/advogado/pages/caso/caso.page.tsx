import {
  DashboardPageContainer,
  DashboardPageSubtitle,
  DashBoardPageTitle,
} from "@/advogado/dashboard/dashboard-page";
import { navAdvogado } from "@/advogado/routes/nav";
import { ErrorBoundary } from "@/components/error-boundary";
import { Separator } from "@/components/shadcn/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { DefaultSpinnerFallback } from "@/components/spinner";
import { ERRORS } from "@/domain/enums";
import { InternalServerError, NotFoundError } from "@/domain/errors";
import { ExtensionsType } from "@/domain/errors/extensions.type";
import { useActiveTabRoute } from "@/hooks/use-active-tab-route";
import { useRequiredParams } from "@/hooks/use-required-params";
import { useSuspenseQuery } from "@apollo/client";
import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { mapFindCasoToForm, MapFindCasoToFormDTO } from "./caso.dto";
import { QUERY_FIND_CASO } from "./caso.queries";

export interface CasoPageOutletContext {
  caso_uuid: string;
  caso: MapFindCasoToFormDTO;
  refetchCaso: () => void;
}
export default function CasoPage() {
  const { caso_uuid } = useRequiredParams([
    {
      param: "caso_uuid",
      message: "Caso não encontrado.",
      isUuid: true,
    },
  ]);

  const tabs = useActiveTabRoute([
    [navAdvogado.dashboard.advogado.caso.index, "index"],
    [navAdvogado.dashboard.advogado.caso.processos, "processos"],
    [navAdvogado.dashboard.advogado.caso.anotacoes, "anotacoes"],
  ]);

  const find = useSuspenseQuery(QUERY_FIND_CASO, {
    variables: {
      where: "uuid",
      value: caso_uuid,
    },
  });

  function refetchCaso() {
    find.refetch();
  }

  if (find.error) {
    const extensions = find.error.cause?.extensions as ExtensionsType;

    if (extensions?.code === ERRORS.INTERNAL_SERVER_ERROR) {
      throw new InternalServerError(find.error.cause?.message);
    }

    throw new NotFoundError("Caso não encontrado.");
  }

  const caso = mapFindCasoToForm(find.data.findCaso);

  return (
    <DashboardPageContainer>
      <div className="pb-4">
        <DashBoardPageTitle className="flex items-center gap-2">
          {caso.titulo}
        </DashBoardPageTitle>
        <DashboardPageSubtitle>Caso</DashboardPageSubtitle>
      </div>

      <Tabs value={tabs}>
        <TabsList>
          <TabsTrigger value="index">
            <NavLink to={navAdvogado.dashboard.advogado.toCaso({ caso_uuid })}>
              Dados
            </NavLink>
          </TabsTrigger>
          <TabsTrigger value="processos">
            <NavLink
              to={navAdvogado.dashboard.advogado.caso.toProcessos({
                caso_uuid,
              })}
            >
              Processos
            </NavLink>
          </TabsTrigger>
          <TabsTrigger value="anotacoes">
            <NavLink
              to={navAdvogado.dashboard.advogado.caso.toAnotacoes({
                caso_uuid,
              })}
            >
              Anotações
            </NavLink>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <ErrorBoundary>
        <Suspense fallback={<DefaultSpinnerFallback />}>
          <Separator className="my-4" />
          <div className="flex flex-1">
            <Outlet
              context={{
                refetchCaso,
                caso,
                caso_uuid,
              }}
            />
          </div>
        </Suspense>
      </ErrorBoundary>
    </DashboardPageContainer>
  );
}
