import {
  DashboardPageContainer,
  DashBoardPageTitle,
} from "@/admin/dashboard/dashboard-page";
import { nav } from "@/admin/routes/nav";
import { CustomForm } from "@/components/custom-form";
import { ControlledInputText } from "@/components/custom-input";
import { CustomRadioGroup, CustomRadioItem } from "@/components/custom-radio";
import { Avatar, AvatarFallback } from "@/components/shadcn/avatar";
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
import type { SearchAdvogadoArgs } from "backend/types";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { mapQueryDTOToView } from "./search-advogado.dto";
import { QUERY_SEARCH_ADVOGADO } from "./search-advogado.queries";
import { FormSchema, formSchema } from "./search-advogado.schema";

export default function SearchAdvogadoPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
      where: "nome",
    },
  });

  const [fetch, { loading, data, called }] = useLazyQuery(
    QUERY_SEARCH_ADVOGADO,
  );
  console.log(
    "🚀 ~ file: search-advogado.page.tsx:52 ~ SearchAdvogadoPage ~ data:",
    data?.searchAdvogado,
  );

  const advogado = data?.searchAdvogado
    ? mapQueryDTOToView(data.searchAdvogado)
    : [];

  async function onSubmit(data: FormSchema) {
    const { loading } = await fetch({
      variables: {
        value: data.value,
        limit: 10,
        where: data.where as SearchAdvogadoArgs["where"],
      },
    });

    if (!loading) {
      toast.success("Pesquisa realizada com sucesso");
    }
  }

  return (
    <DashboardPageContainer className="space-y-4">
      <DashBoardPageTitle>Buscar Advogado</DashBoardPageTitle>

      <Card className="max-w-96">
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
          {(advogado.length || 0) > 0 ? (
            <Card className="mt-4">
              <CardContent className="pt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {advogado?.map(({ uuid, nome }, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <NavLink
                            to={nav.dashboard.admin.toAdvogado({
                              advogado_uuid: uuid,
                            })}
                            className="flex items-center gap-2"
                          >
                            <Avatar className="">
                              <AvatarFallback>
                                {nome.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
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
            <>
              {called && (
                <Text variant="muted">Nenhum resultado encontrado</Text>
              )}
            </>
          )}
        </div>
      )}
    </DashboardPageContainer>
  );
}
