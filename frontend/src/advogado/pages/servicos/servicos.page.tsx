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
import {
  MapQueryListServicoDataToViewDTO,
  mapQueryListServicoDTOToView,
} from "./servicos.dto";
import { QUERY_LIST_SERVICO } from "./servicos.queries";
import { navAdvogado } from "@/advogado/routes/nav";

export default function ServicosPage() {
  const isScrollEnd = useScrollEnd(200);
  const [dataView, setDataView] = useState<MapQueryListServicoDataToViewDTO>(
    [],
  );
  const count = useRef(0);
  const limit = useRef(30);

  const variables = {
    cursor: 0,
    limit: limit.current,
    count: true,
  };

  const [fetch, { data, loading }] = useLazyQuery(QUERY_LIST_SERVICO);

  const actions = [
    {
      label: "Novo serviço",
      to: navAdvogado.dashboard.advogado.registerServico,
      icon: IconBaselineSearch,
    },
  ];

  //==========EFFECTS==========//

  function fetchData() {
    fetch({ variables }).then(({ data }) => {
      setDataView(mapQueryListServicoDTOToView(data?.listServico.data || []));
      if (data?.listServico.count) count.current = data?.listServico.count;
    });
  }
  useEffect(fetchData, []);

  function fetchMoreData() {
    if (isScrollEnd && data?.listServico.nextCursor) {
      fetch({
        variables: {
          cursor: data?.listServico.nextCursor,
          limit: variables.limit,
          count: false,
        },
      }).then(({ data }) => {
        setDataView((prev) => [
          ...prev,
          ...mapQueryListServicoDTOToView(data?.listServico.data || []),
        ]);
      });
    }
  }
  useEffect(fetchMoreData, [isScrollEnd]);

  return (
    <DashboardPageContainer>
      <DashBoardPageTitle>Serviços</DashBoardPageTitle>

      <Text variant="muted" className="text-sm">
        {count.current} {count.current === 1 ? "registro" : "registros"}
      </Text>

      <div className="my-4 flex gap-2">
        {actions.map(({ label, to, icon }, index) => (
          <CustomButton to={to} key={index} icon={icon} label={label} />
        ))}
      </div>

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
                        to={navAdvogado.dashboard.advogado.toServico({
                          servico_uuid: uuid,
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
      {!data?.listServico.nextCursor &&
        !loading &&
        (data?.listServico.data?.length || 0) > 0 && (
          <Text className="pt-8 text-zinc-500">Fim da lista</Text>
        )}
      {data?.listServico.data?.length === 0 && (
        <Text className="pt-4 text-zinc-500">Nenhum registro encontrado</Text>
      )}
    </DashboardPageContainer>
  );
}
