import {
  DashboardPageContainer,
  DashBoardPageTitle,
} from "@/advogado/dashboard/dashboard-page";
import { navAdvogado } from "@/advogado/routes/nav";
import { CustomButton } from "@/components/custom-buttons";
import { IconBaselineSearch } from "@/components/icons";
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
import { SELECT_STATUS_ORDEM_SERVICO } from "@/domain/enums/STATUS_ORDEM_SERVICO";
import { useScrollEnd } from "@/hooks/use-scroll-end";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  mapQueryListOrdemServicoDTOToView,
  MapQueryListOrdemServicoDTOToView,
} from "./ordens-servico.dto";
import { QUERY_LIST_ORDEM_SERVICO } from "./ordens-servico.queries";

export default function OrdensServicoPage() {
  const isScrollEnd = useScrollEnd(200);
  const [dataView, setDataView] = useState<MapQueryListOrdemServicoDTOToView>(
    [],
  );
  const count = useRef(0);
  const limit = useRef(30);

  const variables = {
    cursor: 0,
    limit: limit.current,
    count: true,
  };

  const [fetch, { data, loading }] = useLazyQuery(QUERY_LIST_ORDEM_SERVICO);

  const actions = [
    {
      label: "Nova ordem de serviço",
      to: navAdvogado.dashboard.advogado.registerOrdemServico,
      icon: IconBaselineSearch,
    },
  ];

  //==========EFFECTS==========//

  function fetchData() {
    fetch({ variables }).then(({ data }) => {
      setDataView(
        mapQueryListOrdemServicoDTOToView(data?.listOrdemServico.data || []),
      );
      if (data?.listOrdemServico.count)
        count.current = data?.listOrdemServico.count;
    });
  }
  useEffect(fetchData, []);

  function fetchMoreData() {
    if (isScrollEnd && data?.listOrdemServico.nextCursor) {
      fetch({
        variables: {
          cursor: data?.listOrdemServico.nextCursor,
          limit: variables.limit,
          count: false,
        },
      }).then(({ data }) => {
        setDataView((prev) => [
          ...prev,
          ...mapQueryListOrdemServicoDTOToView(
            data?.listOrdemServico.data || [],
          ),
        ]);
      });
    }
  }
  useEffect(fetchMoreData, [isScrollEnd]);

  return (
    <DashboardPageContainer>
      <DashBoardPageTitle>Ordens de serviço</DashBoardPageTitle>
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
                    <TableHead>Data de abertura</TableHead>
                    <TableHead>Número</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataView?.map(
                    ({ uuid, numero, data_abertura, status }, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <NavLink
                            to={navAdvogado.dashboard.advogado.toOrdemServico({
                              ordem_servico_uuid: uuid,
                            })}
                          >
                            {data_abertura}
                          </NavLink>
                        </TableCell>
                        <TableCell>
                          <NavLink
                            to={navAdvogado.dashboard.advogado.toOrdemServico({
                              ordem_servico_uuid: uuid,
                            })}
                          >
                            {numero}
                          </NavLink>
                        </TableCell>
                        <TableCell>
                          <NavLink
                            to={navAdvogado.dashboard.advogado.toOrdemServico({
                              ordem_servico_uuid: uuid,
                            })}
                          >
                            {
                              SELECT_STATUS_ORDEM_SERVICO.find(
                                (v) => v.value === status,
                              )?.label
                            }
                          </NavLink>
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {loading && <DefaultSpinnerFallback className="pt-8" />}
      {!data?.listOrdemServico.nextCursor &&
        !loading &&
        (data?.listOrdemServico.data?.length || 0) > 0 && (
          <Text className="pt-8 text-zinc-500">Fim da lista</Text>
        )}
      {data?.listOrdemServico.data?.length === 0 && (
        <Text className="pt-4 text-zinc-500">Nenhum registro encontrado</Text>
      )}
    </DashboardPageContainer>
  );
}
