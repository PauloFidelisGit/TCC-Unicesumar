import {
  DashboardPageContainer,
  DashBoardPageTitle,
} from "@/advogado/dashboard/dashboard-page";
import { navAdvogado } from "@/advogado/routes/nav";
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
import type { SearchPessoaArgs } from "backend/types";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { mapQueryDTOToView } from "./search-pessoa.dto";
import { QUERY_SEARCH_PESSOA } from "./search-pessoa.queries";
import { FormSchema, formSchema } from "./search-pessoa.schema";

export default function SearchPessoaPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
      where: "nome",
    },
  });

  const [fetch, { loading, data, called }] = useLazyQuery(QUERY_SEARCH_PESSOA);

  const pessoa = data?.searchPessoa ? mapQueryDTOToView(data.searchPessoa) : [];

  async function onSubmit(data: FormSchema) {
    const { loading } = await fetch({
      variables: {
        value: data.value,
        limit: 10,
        where: data.where as SearchPessoaArgs["where"],
      },
    });

    if (!loading) {
      toast.success("Pesquisa realizada com sucesso");
    }
  }

  return (
    <DashboardPageContainer className="space-y-4">
      <DashBoardPageTitle>Buscar Pessoa</DashBoardPageTitle>

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
          {(pessoa.length || 0) > 0 ? (
            <Card className="mt-4">
              <CardContent className="pt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pessoa?.map(({ uuid, nome }, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <NavLink
                            to={navAdvogado.dashboard.advogado.toPessoa({
                              pessoa_uuid: uuid,
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
