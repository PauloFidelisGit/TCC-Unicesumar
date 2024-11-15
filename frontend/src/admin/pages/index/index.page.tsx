import { DashboardPageContainer } from "@/admin/dashboard/dashboard-page";
import { nav } from "@/admin/routes/nav";
import { IconScaleBalance } from "@/components/icons";
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
import { Heading, Text } from "@/components/typography";
import { useSuspenseQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";
import { QUERY } from "./index.queries";

export default function IndexPage() {
  const result = useSuspenseQuery(QUERY, {
    variables: {
      where: "id",
      value: "",
      limit: 5,
    },
  });
  console.log(
    "🚀 ~ file: index.page.tsx:42 ~ IndexPage ~ result:",
    result.data.searchAdvogado.length > 0,
  );

  const data = [
    {
      label: "Advogados",
      count: result.data.countAdvogado,
      icon: IconScaleBalance,
    },
  ];

  return (
    <DashboardPageContainer>
      <Heading as="h2" className="pb-4">
        Bem vindo!
      </Heading>
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
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Advogados recentes</CardTitle>
        </CardHeader>
        <CardContent>
          {result.data.searchAdvogado.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.data.searchAdvogado.map(({ nome, uuid }, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <NavLink
                        to={nav.dashboard.admin.toAdvogado({
                          advogado_uuid: uuid,
                        })}
                      >
                        {nome}
                      </NavLink>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div>
              <Text variant="muted" className="text-sm">
                Nenhum advogado encontrado
              </Text>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardPageContainer>
  );
}
