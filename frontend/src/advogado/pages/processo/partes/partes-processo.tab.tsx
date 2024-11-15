import { CustomButton } from "@/components/custom-buttons";
import { IconBaselineAddCircleOutline } from "@/components/icons";
import { useDialog } from "@/hooks/use-dialog";
import { useMutation } from "@apollo/client";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { ProcessoPageOutletContext } from "../processo.page";
import { CardPolo } from "./card-polo";
import { PartesProcessoLinkPoloModal } from "./partes-processo-link-polo.modal";
import { MUTATION_DELETE_RELACIONAMENTO_PROCESSO } from "./partes-processo.queries";

export default function PartesProcessoTab() {
  const { processo, refetchProcesso } =
    useOutletContext<ProcessoPageOutletContext>();

  const [destroy] = useMutation(MUTATION_DELETE_RELACIONAMENTO_PROCESSO);

  async function handleDelete(uuid: string) {
    const result = await destroy({ variables: { uuid } });
    if (result.data?.deleteRelacionamentoProcessoPessoa) {
      refetchProcesso();
      toast.success("Parte removida com sucesso");
    }
  }

  const firstStepModal = useDialog();

  return (
    <div className="flex w-full flex-col">
      <CustomButton
        label="Vincular parte"
        icon={IconBaselineAddCircleOutline}
        className="mb-4 w-fit"
        type="button"
        onClick={firstStepModal.openDialog}
      />
      <PartesProcessoLinkPoloModal firstStepModal={firstStepModal} />
      <div className="space-y-4">
        <CardPolo
          name="Polo ativo"
          handleDelete={handleDelete}
          pessoas={processo.polo.polo_ativo}
        />
        <CardPolo
          name="Polo passivo"
          handleDelete={handleDelete}
          pessoas={processo.polo.polo_passivo}
        />
        <CardPolo
          name="Testemunha"
          handleDelete={handleDelete}
          pessoas={processo.polo.testemunha}
        />
      </div>
    </div>
  );
}
