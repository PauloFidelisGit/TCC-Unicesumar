import {
  DashboardPageContainer,
  DashBoardPageTitle,
} from "@/admin/dashboard/dashboard-page";
import { nav } from "@/admin/routes/nav";
import { CustomButton } from "@/components/custom-buttons";
import {
  IconBaselineAddCircleOutline,
  IconBaselineSearch,
} from "@/components/icons";
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
import { MapQueryListToView, mapQueryListToView } from "./advogados.dto";
import { QUERY_LIST_ADVOGADO } from "./advogados.queries";

export default function AdvogadosPage() {
  const isScrollEnd = useScrollEnd(200);
  const [dataView, setDataView] = useState<MapQueryListToView>([]);
  const count = useRef(0);
  const limit = useRef(30);

  const variables = {
    cursor: 0,
    limit: limit.current,
    count: true,
  };

  const [list, { data, loading }] = useLazyQuery(QUERY_LIST_ADVOGADO);

  const actions = [
    {
      label: "Novo advogado",
      to: nav.dashboard.admin.registerAdvogado,
      icon: IconBaselineAddCircleOutline,
    },
    {
      label: "Pesquisar advogado",
      to: nav.dashboard.admin.searchAdvogado,
      icon: IconBaselineSearch,
    },
  ];

  //==========EFFECTS==========//

  function fetchData() {
    list({ variables }).then(({ data }) => {
      setDataView(mapQueryListToView(data?.listAdvogado.data || []));
      if (data?.listAdvogado.count) count.current = data?.listAdvogado.count;
    });
  }
  useEffect(fetchData, []);

  function fetchMoreData() {
    if (isScrollEnd && data?.listAdvogado.nextCursor) {
      list({
        variables: {
          cursor: data?.listAdvogado.nextCursor,
          limit: variables.limit,
          count: false,
        },
      }).then(({ data }) => {
        setDataView((prev) => [
          ...prev,
          ...mapQueryListToView(data?.listAdvogado.data || []),
        ]);
      });
    }
  }
  useEffect(fetchMoreData, [isScrollEnd]);

  return (
    <DashboardPageContainer>
      <DashBoardPageTitle>Advogados</DashBoardPageTitle>

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
                  {dataView?.map(({ uuid, nome }, index) => (
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
        </div>
      )}

      {loading && <DefaultSpinnerFallback className="pt-8" />}
      {!data?.listAdvogado.nextCursor &&
        !loading &&
        (data?.listAdvogado.data?.length || 0) > 0 && (
          <Text className="pt-8 text-zinc-500">Fim da lista</Text>
        )}
      {data?.listAdvogado.data?.length === 0 && (
        <Text className="pt-4 text-zinc-500">Nenhum registro encontrado</Text>
      )}
    </DashboardPageContainer>
  );
}
