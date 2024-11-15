import { CustomButton } from "@/components/custom-buttons";
import { IconBaselineAddCircleOutline } from "@/components/icons";
import { Text } from "@/components/typography";
import { useSuspenseQuery } from "@apollo/client";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { AdvogadoPageOutletContext } from "../advogado.page";
import { CardEndereco } from "./card-enderecos-advogado";
import { mapQuerySearchEnderecoToView } from "./enderecos-advogado.dto";
import { QUERY_SEARCH_ENDERECOS } from "./enderecos-advogado.queries";
import { NewCard } from "./new-card-enderecos.advogado";

export default function EnderecosAdvogadoTab() {
  const { advogado_uuid } = useOutletContext<AdvogadoPageOutletContext>();

  const search = useSuspenseQuery(QUERY_SEARCH_ENDERECOS, {
    variables: {
      limit: 100,
      where: "advogado_uuid",
      value: advogado_uuid!,
    },
  });

  const dataView = mapQuerySearchEnderecoToView(
    search.data.searchEndereco || [],
  );

  const [showAddCard, setShowAddCard] = useState(false);

  function refetchAnotacoesProcesso() {
    search.refetch();
    console.log("Refetching anotacoes processo");
  }

  return (
    <div className="max-w-96 flex-1">
      <CustomButton
        label="Novo endereco"
        icon={IconBaselineAddCircleOutline}
        className="mb-4"
        type="button"
        onClick={() => setShowAddCard(true)}
      />
      <div className="flex flex-col gap-2">
        {showAddCard && (
          <NewCard
            {...{
              refetchAnotacoesProcesso,
              setShowAddCard,
              advogado_uuid,
            }}
          />
        )}
        {dataView.map((data, index) => (
          <CardEndereco
            key={data.uuid}
            {...{
              index,
              data,
              refetchAnotacoesProcesso,
            }}
          />
        ))}
        {dataView.length === 0 && !showAddCard && (
          <Text variant="muted">Nenhum endereço encontrado</Text>
        )}
      </div>
    </div>
  );
}
