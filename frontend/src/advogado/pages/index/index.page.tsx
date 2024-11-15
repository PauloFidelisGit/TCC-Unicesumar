import { AuthContext } from "@/advogado/context/auth-context/auth.context";
import { DashboardPageContainer } from "@/advogado/dashboard/dashboard-page";
import { navAdvogado } from "@/advogado/routes/nav";
import { IconOutlineFolder, IconOutlineGroups } from "@/components/icons";
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
import { Text } from "@/components/typography";
import { TIPO_RELACIONAMENTO_PROCESSO_PESSOA } from "@/domain/enums";
import { formatProcessNumber } from "@/lib/utils";
import { useSuspenseQuery } from "@apollo/client";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { QUERY_SEARCH_PROCESSOS } from "./index.queries";

export default function IndexPage() {
  const authContext = useContext(AuthContext);

  const result = useSuspenseQuery(QUERY_SEARCH_PROCESSOS, {
    variables: {
      where: "id",
      value: "",
      limit: 5,
    },
  });

  const data = [
    {
      label: "Processos",
      count: result.data.countProcesso,
      icon: IconOutlineFolder,
    },
    {
      label: "Pessoas",
      count: result.data.countPessoa,
      icon: IconOutlineGroups,
    },
  ];

  return (
    <DashboardPageContainer>
      <Text className="pb-4 text-lg font-semibold">
        Bem vindo, {authContext.state.advogado.nome}!
      </Text>
      <div className="flex flex-wrap justify-center">
        {data.map(({ label, count, icon: Icon }, index) => (
          <Card key={index} className="m-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <CardHeader>
              <CardTitle>{label}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Icon size={30} />
              <p className="text-4xl font-medium">{count}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mx-auto mt-8 max-w-[calc(100vw-40px)] overflow-x-auto">
        <CardHeader>
          <CardTitle>Processos recentes</CardTitle>
        </CardHeader>
        <CardContent className="">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Polo ativo</TableHead>
                <TableHead>Polo passivo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.data.searchProcesso.map(({ numero, uuid }, index) => (
                <TableRow key={index}>
                  <TableCell className="w-[170px]">
                    <NavLink
                      to={navAdvogado.dashboard.advogado.toProcesso({
                        processo_uuid: uuid,
                      })}
                    >
                      {formatProcessNumber(numero)}
                    </NavLink>
                  </TableCell>
                  <TableCell>
                    {result.data.searchProcesso[index].polos.map(
                      (polo, index) => {
                        if (
                          polo.tipo_relacionamento !==
                          TIPO_RELACIONAMENTO_PROCESSO_PESSOA.POLO_ATIVO
                        )
                          return null;
                        return (
                          <div
                            key={index}
                            className="overflow-hidden whitespace-nowrap"
                          >
                            {polo.pessoa.nome}
                          </div>
                        );
                      },
                    )}
                  </TableCell>
                  <TableCell>
                    {result.data.searchProcesso[index].polos.map(
                      (polo, index) => {
                        if (
                          polo.tipo_relacionamento !==
                          TIPO_RELACIONAMENTO_PROCESSO_PESSOA.POLO_PASSIVO
                        )
                          return null;
                        return (
                          <div
                            key={index}
                            className="overflow-hidden whitespace-nowrap"
                          >
                            {polo.pessoa.nome}
                          </div>
                        );
                      },
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardPageContainer>
  );
}
