import { CustomButton } from "@/components/custom-buttons";
import { IconBaselineAddCircleOutline } from "@/components/icons";
import { Text } from "@/components/typography";
import { useSuspenseQuery } from "@apollo/client";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ProcessoPageOutletContext } from "../processo.page";
import { mapQuerySearchAnotacoesProcessoToView } from "./anotacoes-processo.dto";
import { QUERY_SEARCH_ANOTACOES_PROCESSO } from "./anotacoes-processo.queries";
import { CardAnotacao } from "./card-anotacoes-processo";
import { NewCard } from "./new-card-anotacoes.processo";

export default function AnotacoesProcessoTab() {
  const { processo_uuid } = useOutletContext<ProcessoPageOutletContext>();

  const search = useSuspenseQuery(QUERY_SEARCH_ANOTACOES_PROCESSO, {
    variables: {
      where: "processo_uuid",
      value: processo_uuid,
      limit: 30,
    },
  });

  const dataView = mapQuerySearchAnotacoesProcessoToView(
    search.data?.searchAnotacoesProcesso || [],
  );

  const [showAddCard, setShowAddCard] = useState(false);

  function refetchAnotacoesProcesso() {
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
            {...{ setShowAddCard, processo_uuid, refetchAnotacoesProcesso }}
          />
        )}

        {dataView.map((data, index) => {
          return (
            <CardAnotacao
              key={data.uuid}
              {...{
                index,
                data,
                refetchAnotacoesProcesso,
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
