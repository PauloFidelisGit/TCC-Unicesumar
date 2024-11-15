import SelectClasseJudicialModal from "@/advogado/components/select-classe-judicial/select-classe-judicial.modal";
import { SelectOrgaoModal } from "@/advogado/components/select-orgao/select-orgao.modal";
import { CustomButton } from "@/components/custom-buttons";
import { ControlledInputDate } from "@/components/custom-date";
import { CustomForm } from "@/components/custom-form";
import {
  ControlledInputFindValue,
  ControlledInputText,
} from "@/components/custom-input";
import { ControlledInputSwitch } from "@/components/custom-switch";
import { Card, CardContent } from "@/components/shadcn/card";
import { useListErrors } from "@/hooks/use-list-error";
import { useSelectModal } from "@/hooks/use-select-modal";
import {
  formatCurrencyFromInputValue,
  formatGraphQLFormattedError,
  formatProcessNumberFromInputValue,
} from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { ProcessoPageOutletContext } from "../processo.page";
import {
  UpdateProcessoFormValues,
  updateProcessoSchema,
} from "./index-processo.schemas";
import { mapUpdateToApi } from "./index.processo.dto";
import { MUTATION_UPDATE_PROCESSO } from "./index.processo.queries";

export default function IndexProcessoTab() {
  const { processo, processo_uuid, refetchProcesso } =
    useOutletContext<ProcessoPageOutletContext>();

  const form = useForm<UpdateProcessoFormValues>({
    resolver: zodResolver(updateProcessoSchema),
    values: {
      ...processo,
    },
  });

  const selectModalOrgao = useSelectModal("orgao", {
    initialValue: processo.orgao,
    setFieldValue: form.setValue,
  });
  const selectModalClasseJudicial = useSelectModal("classe_judicial", {
    initialValue: processo.classe_judicial,
    setFieldValue: form.setValue,
  });

  const [update, { loading }] = useMutation(MUTATION_UPDATE_PROCESSO);

  const { ListErrorsComponent, clearErrors, setErrorsMessages } =
    useListErrors();

  async function onSubmit(data: UpdateProcessoFormValues) {
    const result = await update({
      variables: mapUpdateToApi(processo_uuid!, data),
    });

    if (result.errors) {
      const formatedErrors = formatGraphQLFormattedError(result.errors);
      setErrorsMessages(formatedErrors);
    } else if (result.data?.updateProcesso) {
      clearErrors();
      refetchProcesso();
      toast.success("Processo atualizado com sucesso!");
    }
  }

  return (
    <Card className="max-w-96 flex-1">
      <CardContent>
        <SelectOrgaoModal control={selectModalOrgao.control} />
        <SelectClasseJudicialModal
          control={selectModalClasseJudicial.control}
        />
        <ListErrorsComponent />
        <CustomForm
          methods={form}
          onSubmit={onSubmit}
          className="flex flex-col gap-2 bg-white pt-4"
        >
          <ControlledInputText
            name="numero"
            label="Número"
            onChange={formatProcessNumberFromInputValue}
            required
          />
          <ControlledInputDate name="data_autuacao" label="Data da autuação" />
          <ControlledInputText
            name="valor_causa"
            label="Valor da causa"
            onChange={formatCurrencyFromInputValue}
          />
          <ControlledInputSwitch
            name="tutela_urgencia"
            label="Tutéla de urgência?"
          />
          <ControlledInputSwitch
            name="segredo_justica"
            label="Segredo de justiça?"
          />
          <ControlledInputFindValue
            name="orgao"
            label="Órgão"
            buttonLabel="Buscar Órgão"
            onClick={selectModalOrgao.openModal}
          />
          <ControlledInputFindValue
            name="classe_judicial"
            label="Classe Judicial"
            buttonLabel="Buscar Classe Judicial"
            onClick={selectModalClasseJudicial.openModal}
          />
          <div className="flex items-center">
            <CustomButton
              type="submit"
              label="Atualizar"
              loadingLabel="Atualizando..."
              loading={loading}
              className="m-auto"
            />
          </div>
        </CustomForm>
      </CardContent>
    </Card>
  );
}
