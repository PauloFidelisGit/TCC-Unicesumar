import {
  DashboardPageContainer,
  DashBoardPageTitle,
} from "@/advogado/dashboard/dashboard-page";
import { navAdvogado } from "@/advogado/routes/nav";
import { CustomButton } from "@/components/custom-buttons";
import { IconBaselineAddCircleOutline } from "@/components/icons";
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
import {
  mapQueryListFaturaDTOToView,
  MapQueryListFaturaDTOToViewDTO,
} from "./faturas.dto";
import { QUERY_LIST_FATURAS } from "./faturas.queries";

export default function FaturasPage() {
  const isScrollEnd = useScrollEnd(200);
  const [dataView, setDataView] = useState<MapQueryListFaturaDTOToViewDTO>([]);
  const count = useRef(0);
  const limit = useRef(30);

  const variables = {
    cursor: 0,
    limit: limit.current,
    count: true,
  };

  const [fetch, { data, loading }] = useLazyQuery(QUERY_LIST_FATURAS);

  const actions = [
    {
      label: "Nova fatura",
      to: navAdvogado.dashboard.advogado.createFatura,
      icon: IconBaselineAddCircleOutline,
    },
  ];

  //==========EFFECTS==========//

  function fetchData() {
    fetch({ variables }).then(({ data }) => {
      setDataView(mapQueryListFaturaDTOToView(data?.listFatura.data || []));
      if (data?.listFatura.count) count.current = data?.listFatura.count;
    });
  }
  useEffect(fetchData, []);

  function fetchMoreData() {
    if (isScrollEnd && data?.listFatura.nextCursor) {
      fetch({
        variables: {
          cursor: data?.listFatura.nextCursor,
          limit: variables.limit,
          count: false,
        },
      }).then(({ data }) => {
        setDataView((prev) => [
          ...prev,
          ...mapQueryListFaturaDTOToView(data?.listFatura.data || []),
        ]);
      });
    }
  }
  useEffect(fetchMoreData, [isScrollEnd]);

  return (
    <DashboardPageContainer>
      <DashBoardPageTitle>Faturas</DashBoardPageTitle>
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
                    <TableHead>Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataView?.map(
                    ({ uuid, data_emissao, valor_total }, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <NavLink
                            to={navAdvogado.dashboard.advogado.toFatura({
                              fatura_uuid: uuid,
                            })}
                          >
                            {data_emissao}
                          </NavLink>
                        </TableCell>
                        <TableCell>
                          <NavLink
                            to={navAdvogado.dashboard.advogado.toFatura({
                              fatura_uuid: uuid,
                            })}
                          >
                            {valor_total}
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
      {!data?.listFatura.nextCursor &&
        !loading &&
        (data?.listFatura.data?.length || 0) > 0 && (
          <Text className="pt-8 text-zinc-500">Fim da lista</Text>
        )}
      {data?.listFatura.data?.length === 0 && (
        <Text className="pt-4 text-zinc-500">Nenhum registro encontrado</Text>
      )}
    </DashboardPageContainer>
  );
}
