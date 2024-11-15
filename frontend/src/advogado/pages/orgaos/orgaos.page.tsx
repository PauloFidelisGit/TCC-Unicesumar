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
import { mapListToView, MapListToViewDTO } from "./orgaos.dto";
import { QUERY_LIST_ORGAO } from "./orgaos.queries";
import { navAdvogado } from "@/advogado/routes/nav";

export default function OrgaosPage() {
  const isScrollEnd = useScrollEnd(200);
  const [dataView, setDataView] = useState<MapListToViewDTO>([]);
  const count = useRef(0);
  const limit = useRef(30);

  const variables = {
    cursor: 0,
    limit: limit.current,
    count: true,
  };

  const [fetch, { data, loading }] = useLazyQuery(QUERY_LIST_ORGAO);

  const actions = [
    {
      label: "Novo órgão",
      to: navAdvogado.dashboard.advogado.registerOrgao,
      icon: IconBaselineSearch,
    },
    {
      label: "Pesquisar órgão",
      to: navAdvogado.dashboard.advogado.searchOrgao,
      icon: IconBaselineSearch,
    },
  ];

  //==========EFFECTS==========//

  function fetchData() {
    fetch({ variables }).then(({ data }) => {
      setDataView(mapListToView(data?.listOrgao.data || []));
      if (data?.listOrgao.count) count.current = data?.listOrgao.count;
    });
  }
  useEffect(fetchData, []);

  function fetchMoreData() {
    if (isScrollEnd && data?.listOrgao.nextCursor) {
      fetch({
        variables: {
          cursor: data?.listOrgao.nextCursor,
          limit: variables.limit,
          count: false,
        },
      }).then(({ data }) => {
        setDataView((prev) => [
          ...prev,
          ...mapListToView(data?.listOrgao.data || []),
        ]);
      });
    }
  }
  useEffect(fetchMoreData, [isScrollEnd]);

  return (
    <DashboardPageContainer>
      <DashBoardPageTitle>Órgãos</DashBoardPageTitle>
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
                        to={navAdvogado.dashboard.advogado.toOrgao({
                          orgao_uuid: uuid,
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
      {!data?.listOrgao.nextCursor &&
        !loading &&
        (data?.listOrgao.data?.length || 0) > 0 && (
          <Text className="pt-8 text-zinc-500">Fim da lista</Text>
        )}
      {data?.listOrgao.data?.length === 0 && (
        <Text className="pt-4 text-zinc-500">Nenhum registro encontrado</Text>
      )}
    </DashboardPageContainer>
  );
}
