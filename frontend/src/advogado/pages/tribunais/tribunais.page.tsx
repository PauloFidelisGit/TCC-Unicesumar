import {
  DashboardPageContainer,
  DashBoardPageTitle,
} from "@/advogado/dashboard/dashboard-page";
import { navAdvogado } from "@/advogado/routes/nav";
import { CustomButton } from "@/components/custom-buttons";
import {
  IconBaselineAddCircleOutline,
  IconBaselineSearch,
} from "@/components/icons";
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
import { mapListToView, MapListToViewDTO } from "./tribunais.dto";
import { QUERY_LIST_TRIBUNAL } from "./tribunais.queries";

export default function TribunaisPage() {
  const isScrollEnd = useScrollEnd(200);
  const [dataView, setDataView] = useState<MapListToViewDTO>([]);
  const count = useRef(0);
  const limit = useRef(30);

  const variables = {
    cursor: 0,
    limit: limit.current,
    count: true,
  };

  const [list, { data, loading }] = useLazyQuery(QUERY_LIST_TRIBUNAL);

  const actions = [
    {
      label: "Novo tribunal",
      to: navAdvogado.dashboard.advogado.registerTribunal,
      icon: IconBaselineAddCircleOutline,
    },
    {
      label: "Pesquisar tribunal",
      to: navAdvogado.dashboard.advogado.searchTribunal,
      icon: IconBaselineSearch,
    },
  ];

  //==========EFFECTS==========//

  function fetchData() {
    list({ variables }).then(({ data }) => {
      setDataView(mapListToView(data?.listTribunal.data || []));
      if (data?.listTribunal.count) count.current = data?.listTribunal.count;
    });
  }
  useEffect(fetchData, []);

  function fetchMoreData() {
    if (isScrollEnd && data?.listTribunal.nextCursor) {
      list({
        variables: {
          cursor: data?.listTribunal.nextCursor,
          limit: variables.limit,
          count: false,
        },
      }).then(({ data }) => {
        setDataView((prev) => [
          ...prev,
          ...mapListToView(data?.listTribunal.data || []),
        ]);
      });
    }
  }
  useEffect(fetchMoreData, [isScrollEnd]);

  return (
    <DashboardPageContainer>
      <DashBoardPageTitle>Tribunais</DashBoardPageTitle>
      <Text variant="muted" className="text-sm">
        {count.current} {count.current === 1 ? "registro" : "registros"}
      </Text>
      <div className="my-4 flex gap-2">
        {actions.map(({ label, to, icon }, index) => (
          <CustomButton to={to} key={index} icon={icon} label={label} />
        ))}
      </div>
      <div className="space-y-2">
        <Card className="mt-8">
          <CardContent className="pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataView?.map(({ uuid, nome }, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <NavLink
                        to={navAdvogado.dashboard.advogado.toTribunal({
                          tribunal_uuid: uuid,
                        })}
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
      </div>

      {loading && <DefaultSpinnerFallback className="pt-8" />}
      {!data?.listTribunal.nextCursor &&
        !loading &&
        (data?.listTribunal.data?.length || 0) > 0 && (
          <Text className="pt-8 text-zinc-500">Fim da lista</Text>
        )}
      {data?.listTribunal.data?.length === 0 && (
        <Text className="pt-4 text-zinc-500">Nenhum registro encontrado</Text>
      )}
    </DashboardPageContainer>
  );
}
