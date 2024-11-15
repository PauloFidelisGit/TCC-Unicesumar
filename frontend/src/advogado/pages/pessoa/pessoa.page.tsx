import {
  DashboardPageContainer,
  DashboardPageSubtitle,
  DashBoardPageTitle,
} from "@/advogado/dashboard/dashboard-page";
import { ErrorBoundary } from "@/components/error-boundary";
import { Separator } from "@/components/shadcn/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { DefaultSpinnerFallback } from "@/components/spinner";
import { ERRORS, TIPO_PESSOA } from "@/domain/enums";
import { InternalServerError, NotFoundError } from "@/domain/errors";
import { ExtensionsType } from "@/domain/errors/extensions.type";
import { useActiveTabRoute } from "@/hooks/use-active-tab-route";
import { useRequiredParams } from "@/hooks/use-required-params";
import { useSuspenseQuery } from "@apollo/client";
import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  QUERY_FIND_PESSOA,
  QueryFindPessoaPF,
  QueryFindPessoaPJ,
} from "./pessoa.queries";
import { navAdvogado } from "@/advogado/routes/nav";

export interface PessoaPageOutletContext<
  PessoaRaw extends QueryFindPessoaPF | QueryFindPessoaPJ,
> {
  pessoa_uuid: string;
  pessoaRaw: PessoaRaw;
}

export default function PessoaPage() {
  const { pessoa_uuid } = useRequiredParams([
    {
      param: "pessoa_uuid",
      message: "Pessoa não encontrada.",
      isUuid: true,
    },
  ]);

  const find = useSuspenseQuery(QUERY_FIND_PESSOA, {
    variables: {
      where: "uuid",
      value: pessoa_uuid,
    },
  });

  if (find.error) {
    const extensions = find.error.cause?.extensions as ExtensionsType;

    if (extensions?.code === ERRORS.INTERNAL_SERVER_ERROR) {
      throw new InternalServerError(find.error.cause?.message);
    }

    throw new NotFoundError("Pessoa não encontrada.");
  }

  const tabs = useActiveTabRoute([
    [navAdvogado.dashboard.advogado.pessoa.index, "index"],
    [navAdvogado.dashboard.advogado.pessoa.enderecos, "enderecos"],
  ]);

  function selectPageTitle() {
    if (find.data.findPessoa.tipo_pessoa === TIPO_PESSOA.PF) {
      return (
        <>
          <DashBoardPageTitle>{find.data.findPessoa.nome}</DashBoardPageTitle>
          <DashboardPageSubtitle>Pessoa física</DashboardPageSubtitle>
        </>
      );
    } else {
      return (
        <>
          <DashBoardPageTitle>
            {find.data.findPessoa.nome_fantasia}
          </DashBoardPageTitle>
          <DashboardPageSubtitle>Pessoa jurídica</DashboardPageSubtitle>
        </>
      );
    }
  }

  return (
    <DashboardPageContainer>
      <div className="pb-4">{selectPageTitle()}</div>
      <Tabs value={tabs}>
        <TabsList>
          <TabsTrigger value="index">
            <NavLink
              to={navAdvogado.dashboard.advogado.toPessoa({ pessoa_uuid })}
            >
              Dados
            </NavLink>
          </TabsTrigger>
          <TabsTrigger value="enderecos">
            <NavLink
              className="block"
              to={navAdvogado.dashboard.advogado.pessoa.toEnderecos({
                pessoa_uuid,
              })}
            >
              Endereços
            </NavLink>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <ErrorBoundary>
        <Suspense fallback={<DefaultSpinnerFallback />}>
          <Separator className="mt-4" />
          <div className="flex flex-1">
            <Outlet
              context={{
                pessoa_uuid,
                pessoaRaw: find.data.findPessoa,
              }}
            />
          </div>
        </Suspense>
      </ErrorBoundary>
    </DashboardPageContainer>
  );
}
