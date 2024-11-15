import {
  DashboardPageContainer,
  DashBoardPageTitle,
} from "@/advogado/dashboard/dashboard-page";
import { CustomButton } from "@/components/custom-buttons";
import { IconBaselineSearch } from "@/components/icons";
import { Avatar, AvatarFallback } from "@/components/shadcn/avatar";
import { Card, CardContent } from "@/components/shadcn/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { DefaultSpinnerFallback } from "@/components/spinner";
import { Text } from "@/components/typography";
import { useScrollEnd } from "@/hooks/use-scroll-end";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { MapQueryDTOToView, mapQueryDTOToView } from "./pessoas.dto";
import { QUERY_LIST_PESSOA } from "./pessoas.queries";
import { navAdvogado } from "@/advogado/routes/nav";

export default function PessoasPage() {
  const isScrollEnd = useScrollEnd(200);
  const [dataView, setDataView] = useState<MapQueryDTOToView>([]);
  const count = useRef(0);
  const limit = useRef(30);

  const variables = {
    cursor: 0,
    limit: limit.current,
    count: true,
  };

  const [list, { data, loading }] = useLazyQuery(QUERY_LIST_PESSOA);

  const actions = [
    {
      label: "Nova pessoa",
      to: navAdvogado.dashboard.advogado.registerPessoa,
      icon: IconBaselineSearch,
    },
    {
      label: "Pesquisar pessoa",
      to: navAdvogado.dashboard.advogado.searchPessoa,
      icon: IconBaselineSearch,
    },
  ];

  //==========EFFECTS==========//

  function fetchData() {
    list({ variables }).then(({ data }) => {
      setDataView(mapQueryDTOToView(data?.listPessoa.data || []));
      if (data?.listPessoa.count) count.current = data?.listPessoa.count;
    });
  }
  useEffect(fetchData, []);

  function fetchMoreData() {
    if (isScrollEnd && data?.listPessoa.nextCursor) {
      list({
        variables: {
          cursor: data?.listPessoa.nextCursor,
          limit: variables.limit,
          count: false,
        },
      }).then(({ data }) => {
        setDataView((prev) => [
          ...prev,
          ...mapQueryDTOToView(data?.listPessoa.data || []),
        ]);
      });
    }
  }
  useEffect(fetchMoreData, [isScrollEnd]);

  return (
    <DashboardPageContainer>
      <DashBoardPageTitle>Pessoas</DashBoardPageTitle>
      <Text variant="muted" className="text-sm">
        {count.current} {count.current === 1 ? "registro" : "registros"}
      </Text>
      <div className="my-4 flex gap-2">
        {actions.map(({ label, to, icon }, index) => (
          <CustomButton to={to} key={index} icon={icon} label={label} />
        ))}
      </div>

      {dataView.length > 0 && (
        <div className="max-w-96 space-y-2">
          <Card className="mt-8">
            <CardContent className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataView?.map(({ uuid, nome, nome_fantasia }, index) => (
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
                              {nome?.charAt(0).toUpperCase()}
                              {nome_fantasia?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          {nome || nome_fantasia}
                        </NavLink>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {loading && <DefaultSpinnerFallback className="pt-8" />}
      {!data?.listPessoa.nextCursor &&
        !loading &&
        (data?.listPessoa?.data?.length || 0) > 0 && (
          <Text className="pt-8 text-zinc-500">Fim da lista</Text>
        )}
      {data?.listPessoa?.data?.length === 0 && (
        <Text className="pt-4 text-zinc-500">Nenhum registro encontrado</Text>
      )}
    </DashboardPageContainer>
  );
}
