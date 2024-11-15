import { IconBaselineAddCircleOutline } from "@/components/icons";
import { Text } from "@/components/typography";
import { useSuspenseQuery } from "@apollo/client";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PessoaPageOutletContext } from "../pessoa.page";
import { CardEndereco } from "./card-enderecos-pessoa";
import { mapQuerySearchEnderecoToView } from "./enderecos-pessoa.dto";
import { QUERY_SEARCH_ENDERECOS } from "./enderecos-pessoa.queries";
import { NewCard } from "./new-card-enderecos.pessoa";
import { CustomButton } from "@/components/custom-buttons";

export default function EnderecosPessoaTab() {
  const { pessoa_uuid } = useOutletContext<PessoaPageOutletContext<any>>();

  const search = useSuspenseQuery(QUERY_SEARCH_ENDERECOS, {
    variables: {
      limit: 100,
      where: "pessoa_uuid",
      value: pessoa_uuid!,
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
        className="my-4"
        type="button"
        onClick={() => setShowAddCard(true)}
        disabled={showAddCard}
      />
      <div className="flex flex-col gap-2">
        {showAddCard && (
          <NewCard
            {...{
              refetchAnotacoesProcesso,
              setShowAddCard,
              pessoa_uuid,
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
