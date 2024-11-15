import {
  DashboardPageContainer,
  DashboardPageSubtitle,
  DashBoardPageTitle,
} from "@/advogado/dashboard/dashboard-page";
import { navAdvogado } from "@/advogado/routes/nav";
import { CopyButton } from "@/components/custom-buttons";
import { ErrorBoundary } from "@/components/error-boundary";
import { Separator } from "@/components/shadcn/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { DefaultSpinnerFallback } from "@/components/spinner";
import { ERRORS } from "@/domain/enums";
import { InternalServerError, NotFoundError } from "@/domain/errors";
import { ExtensionsType } from "@/domain/errors/extensions.type";
import { useActiveTabRoute } from "@/hooks/use-active-tab-route";
import { useRequiredParams } from "@/hooks/use-required-params";
import { copyToClipboard } from "@/lib/utils";
import { useSuspenseQuery } from "@apollo/client";
import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  mapFindProcessoToEditForm,
  MapFindProcessoToEditFormDTO,
} from "./processo.dto";
import { QUERY_FIND_PROCESSO } from "./processo.queries";

export interface ProcessoPageOutletContext {
  processo_uuid: string;
  processo: MapFindProcessoToEditFormDTO;
  refetchProcesso: () => void;
}
export default function ProcessoPage() {
  const { processo_uuid } = useRequiredParams([
    {
      param: "processo_uuid",
      message: "Processo não encontrado.",
      isUuid: true,
    },
  ]);

  const tabs = useActiveTabRoute([
    [navAdvogado.dashboard.advogado.processo.index, "index"],
    [navAdvogado.dashboard.advogado.processo.anotacoes, "anotacoes"],
    [navAdvogado.dashboard.advogado.processo.partes, "partes"],
  ]);

  const find = useSuspenseQuery(QUERY_FIND_PROCESSO, {
    variables: {
      where: "uuid",
      value: processo_uuid,
    },
  });

  function refetchProcesso() {
    find.refetch();
  }

  if (find.error) {
    const extensions = find.error.cause?.extensions as ExtensionsType;

    if (extensions?.code === ERRORS.INTERNAL_SERVER_ERROR) {
      throw new InternalServerError(find.error.cause?.message);
    }

    throw new NotFoundError("Processo não encontrado.");
  }

  const processo = mapFindProcessoToEditForm(find.data.findProcesso);

  return (
    <DashboardPageContainer>
      <div className="pb-4">
        <DashBoardPageTitle className="flex items-center gap-2">
          {processo.numero}
          <CopyButton onClick={() => copyToClipboard(processo.numero)} />
        </DashBoardPageTitle>
        <DashboardPageSubtitle>Processo</DashboardPageSubtitle>
      </div>

      <Tabs value={tabs}>
        <TabsList>
          <TabsTrigger value="index">
            <NavLink
              to={navAdvogado.dashboard.advogado.toProcesso({ processo_uuid })}
            >
              Dados
            </NavLink>
          </TabsTrigger>
          <TabsTrigger value="partes">
            <NavLink
              to={navAdvogado.dashboard.advogado.processo.toPartes({
                processo_uuid,
              })}
            >
              Partes
            </NavLink>
          </TabsTrigger>
          <TabsTrigger value="anotacoes">
            <NavLink
              to={navAdvogado.dashboard.advogado.processo.toAnotacoes({
                processo_uuid,
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
                processo,
                processo_uuid,
                refetchProcesso,
              }}
            />
          </div>
        </Suspense>
      </ErrorBoundary>
    </DashboardPageContainer>
  );
}
