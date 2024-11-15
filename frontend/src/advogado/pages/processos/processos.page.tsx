import {
  DashboardPageContainer,
  DashBoardPageTitle,
} from "@/advogado/dashboard/dashboard-page";
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
import { useScrollEnd } from "@/hooks/use-scroll-end";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { mapListToView, MapListToViewDTO } from "./processos.dto";
import { QueryLIST_PROCESSO } from "./processos.queries";
import { navAdvogado } from "@/advogado/routes/nav";

export default function ProcessosPage() {
  const isScrollEnd = useScrollEnd(200);
  const [dataView, setDataView] = useState<MapListToViewDTO>([]);
  const count = useRef(0);
  const limit = useRef(30);

  const variables = {
    cursor: 0,
    limit: limit.current,
    count: true,
  };

  const [list, { data, loading }] = useLazyQuery(QueryLIST_PROCESSO);

  const actions = [
    {
      label: "Novo processo",
      to: navAdvogado.dashboard.advogado.registerProcesso,
      icon: IconBaselineSearch,
    },
    {
      label: "Pesquisar processo",
      to: navAdvogado.dashboard.advogado.searchProcesso,
      icon: IconBaselineSearch,
    },
  ];

  //==========EFFECTS==========//

  function fetchData() {
    list({ variables }).then(({ data }) => {
      setDataView(mapListToView(data?.listProcesso.data || []));
      if (data?.listProcesso.count) count.current = data?.listProcesso.count;
    });
  }
  useEffect(fetchData, []);

  function fetchMoreData() {
    if (isScrollEnd && data?.listProcesso.nextCursor) {
      list({
        variables: {
          cursor: data?.listProcesso.nextCursor,
          limit: variables.limit,
          count: false,
        },
      }).then(({ data }) => {
        setDataView((prev) => [
          ...prev,
          ...mapListToView(data?.listProcesso.data || []),
        ]);
      });
    }
  }
  useEffect(fetchMoreData, [isScrollEnd]);

  return (
    <DashboardPageContainer>
      <DashBoardPageTitle>Processos</DashBoardPageTitle>
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
                    <TableHead>Número</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataView?.map(({ uuid, numero }, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <NavLink
                          to={navAdvogado.dashboard.advogado.toProcesso({
                            processo_uuid: uuid,
                          })}
                        >
                          {numero}
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
      {!data?.listProcesso.nextCursor &&
        !loading &&
        (data?.listProcesso.data?.length || 0) > 0 && (
          <Text className="pt-8 text-zinc-500">Fim da lista</Text>
        )}
      {data?.listProcesso.data?.length === 0 && (
        <Text className="pt-4 text-zinc-500">Nenhum registro encontrado</Text>
      )}
    </DashboardPageContainer>
  );
}
