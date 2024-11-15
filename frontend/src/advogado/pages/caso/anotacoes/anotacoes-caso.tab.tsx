import { CustomButton } from "@/components/custom-buttons";
import { IconBaselineAddCircleOutline } from "@/components/icons";
import { Text } from "@/components/typography";
import { useSuspenseQuery } from "@apollo/client";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CasoPageOutletContext } from "../caso.page";
import { QUERY_SEARCH_ANOTACOES_CASO } from "./anotacoes-caso.queries";
import { CardAnotacao } from "./card-anotacoes-caso";
import { NewCard } from "./new-card-anotacoes.caso";
import { mapQuerySearchAnotacoesCasoToView } from "./anotacoes-caso.dto";

export default function AnotacoesCasoTab() {
  const { caso_uuid } = useOutletContext<CasoPageOutletContext>();

  const search = useSuspenseQuery(QUERY_SEARCH_ANOTACOES_CASO, {
    variables: {
      where: "caso_uuid",
      value: caso_uuid,
      limit: 30,
    },
  });

  const dataView = mapQuerySearchAnotacoesCasoToView(
    search.data?.searchAnotacoesCaso || [],
  );

  const [showAddCard, setShowAddCard] = useState(false);

  function refetchAnotacoesCaso() {
    search.refetch();
  }

  return (
    <div className="max-w-96 flex-1">
      <CustomButton
        label="Nova anotação"
        icon={IconBaselineAddCircleOutline}
        className="mb-4"
        type="button"
        onClick={() => setShowAddCard(true)}
      />

      <div className="flex flex-col gap-2">
        {showAddCard && (
          <NewCard
            {...{
              setShowAddCard,
              caso_uuid,
              refetchAnotacoesCaso,
            }}
          />
        )}

        {dataView.map((data, index) => {
          return (
            <CardAnotacao
              key={data.uuid}
              {...{
                index,
                data,
                refetchAnotacoesCaso,
              }}
            />
          );
        })}

        {dataView.length === 0 && !showAddCard && (
          <Text variant="muted">Nenhuma anotação encontrada</Text>
        )}
      </div>
    </div>
  );
}
