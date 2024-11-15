import {
  DashboardPageContainer,
  DashBoardPageTitle,
} from "@/advogado/dashboard/dashboard-page";
import { navAdvogado } from "@/advogado/routes/nav";
import { CustomForm } from "@/components/custom-form";
import { ControlledInputText } from "@/components/custom-input";
import { CustomRadioGroup, CustomRadioItem } from "@/components/custom-radio";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { Spinner } from "@/components/spinner";
import { Text } from "@/components/typography";
import { useLazyQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SearchClasseJudicialArgs } from "backend/types";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { mapQueryDTOToView } from "./search-classe-judicial.dto";
import { QUERY_SEARCH_CLASSE_JUDICIAL } from "./search-classe-judicial.queries";
import { formSchema, FormSchema } from "./search-classe-judicial.schema";

export default function SearchClasseJudicialPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
      where: "nome",
    },
  });

  const [fetch, { loading, data, called }] = useLazyQuery(
    QUERY_SEARCH_CLASSE_JUDICIAL,
  );

  const classeJudicial = data?.searchClasseJudicial
    ? mapQueryDTOToView(data?.searchClasseJudicial)
    : [];

  async function onSubmit(data: FormSchema) {
    const { loading } = await fetch({
      variables: {
        value: data.value,
        limit: 10,
        where: data.where as SearchClasseJudicialArgs["where"],
      },
    });

    if (!loading) {
      toast.success("Pesquisa realizada com sucesso");
    }
  }

  return (
    <DashboardPageContainer className="space-y-4">
      <DashBoardPageTitle>Buscar Classe Judicial</DashBoardPageTitle>

      <Card className="max-w-96 mt-4">
        <CardHeader>
          <CardTitle>Parâmetros</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomForm
            methods={form}
            onSubmit={onSubmit}
            className="max-w-96 space-y-4"
            disabled={loading}
          >
            <CustomRadioGroup name="where">
              {[{ label: "Nome", value: "nome" }].map(
                ({ label, value }, index) => {
                  return <CustomRadioItem key={index} {...{ label, value }} />;
                },
              )}
            </CustomRadioGroup>
            <ControlledInputText
              name="value"
              placeholder="Pesquisar..."
              required
            />
          </CustomForm>
        </CardContent>
      </Card>

      {loading ? (
        <div className="m-auto mt-4 flex w-fit items-center gap-1">
          <Spinner />
          Pesquisando...
        </div>
      ) : (
        <div className="max-w-96 space-y-2">
          {(classeJudicial.length || 0) > 0 ? (
            <Card className="mt-4">
              <CardContent className="pt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classeJudicial?.map(({ uuid, nome }, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <NavLink
                            to={navAdvogado.dashboard.advogado.toClasseJudicial(
                              {
                                classe_judicial_uuid: uuid,
                              },
                            )}
                          >
                            {nome}
                          </NavLink>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <div className="mt-4">
              {called && (
                <Text variant="muted">Nenhum resultado encontrado</Text>
              )}
            </div>
          )}
        </div>
      )}
    </DashboardPageContainer>
  );
}
