import { SelectCasoModal } from "@/advogado/components/select-caso/select-caso.modal";
import { SelectProcessoModal } from "@/advogado/components/select-processo/select-processo.modal";
import { SelectServicoModal } from "@/advogado/components/select-servico/select-servico.modal";
import { AuthContext } from "@/advogado/context/auth-context/auth.context";
import {
  DashboardPageContainer,
  DashBoardPageTitle,
} from "@/advogado/dashboard/dashboard-page";
import { navAdvogado } from "@/advogado/routes/nav";
import { CustomButton } from "@/components/custom-buttons";
import { ControlledInputDate } from "@/components/custom-date";
import { CustomDialog, useDialog } from "@/components/custom-dialog";
import { CustomForm } from "@/components/custom-form";
import {
  ControlledInputFindValue,
  ControlledInputFloat,
} from "@/components/custom-input";
import { ControlledInputSelect } from "@/components/custom-select";
import { ControlledTextArea } from "@/components/custom-text-area";
import { Card, CardContent } from "@/components/shadcn/card";
import { SELECT_PRIORIDADE_ORDEM_SERVICO } from "@/domain/enums/PRIORIDADE_ORDEM_SERVICO";
import {
  SELECT_STATUS_ORDEM_SERVICO,
  STATUS_ORDEM_SERVICO,
} from "@/domain/enums/STATUS_ORDEM_SERVICO";
import { Datetime } from "@/domain/vo/datetime.vo";
import { useListErrors } from "@/hooks/use-list-error";
import { useSelectModal } from "@/hooks/use-select-modal";
import { formatGraphQLFormattedError } from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { mapCreateOrdemServicoFormValuesToApi } from "./register-ordem-servico.dto";
import { MUTATION_CREATE_ORDEM_SERVICO } from "./register-ordem-servico.queries";
import {
  CreateOrdemServicoFormValues,
  formSchema,
} from "./register-ordem-servico.schema";

export default function RegisterOrdemServicoPage() {
  const authContext = useContext(AuthContext);

  const { openDialog, control } = useDialog();

  const form = useForm<CreateOrdemServicoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descricao: "",
      data_abertura: Datetime.create().toDateTimeLocal,
      data_conclusao: "",
      data_cancelamento: "",
      prazo_conclusao: "",
      status: SELECT_STATUS_ORDEM_SERVICO[0].value,
      prioridade: SELECT_PRIORIDADE_ORDEM_SERVICO[0].value,
      valor_servico: "0,00",
      servico: {
        value: "",
        label: "",
      },
      processo: {
        value: "",
        label: "",
      },
      caso: { value: "", label: "" },
    },
  });

  const state_data_cancelamento = form.getFieldState("data_cancelamento");
  const state_data_conclusao = form.getFieldState("data_conclusao");
  const state_prazo_conclusao = form.getFieldState("prazo_conclusao");
  const dateTimeLocalLength = 16;
  function setErrorInIncompleteInputDateTimeLocal() {
    if (
      state_data_cancelamento.isTouched &&
      !state_data_cancelamento.isDirty &&
      !(form.getValues("data_cancelamento").length === dateTimeLocalLength)
    ) {
      form.setError("data_cancelamento", {
        message: "Prencha o campo completo.",
      });
    } else {
      form.clearErrors("data_cancelamento");
    }
    if (
      state_data_conclusao.isTouched &&
      !state_data_conclusao.isDirty &&
      !(form.getValues("data_conclusao").length === dateTimeLocalLength)
    ) {
      form.setError("data_conclusao", {
        message: "Prencha o campo completo.",
      });
    } else {
      form.clearErrors("data_conclusao");
    }
    if (
      state_prazo_conclusao.isTouched &&
      !state_prazo_conclusao.isDirty &&
      !(form.getValues("prazo_conclusao").length === dateTimeLocalLength)
    ) {
      form.setError("prazo_conclusao", {
        message: "Prencha o campo completo.",
      });
    } else {
      form.clearErrors("prazo_conclusao");
    }
  }
  useEffect(setErrorInIncompleteInputDateTimeLocal, [
    state_data_cancelamento.isTouched,
    state_data_cancelamento.isDirty,
    state_data_conclusao.isTouched,
    state_data_conclusao.isDirty,
    state_prazo_conclusao.isTouched,
    state_prazo_conclusao.isDirty,
  ]);

  const state_status = form.watch("status");
  function clearStatusFieldIfNotConcluida() {
    if (state_status !== STATUS_ORDEM_SERVICO.CONCLUIDA) {
      form.setValue("data_conclusao", "");
    }
  }
  useEffect(clearStatusFieldIfNotConcluida, [state_status]);

  const selectModalServico = useSelectModal("servico", {
    setFieldValue: form.setValue,
  });
  const selectModalProcesso = useSelectModal("processo", {
    setFieldValue: form.setValue,
  });
  const selectModalCaso = useSelectModal("caso", {
    setFieldValue: form.setValue,
  });

  const [create, { loading, data }] = useMutation(
    MUTATION_CREATE_ORDEM_SERVICO,
  );

  const servico = data?.createOrdemServico;

  const { ListErrorsComponent, clearErrors, setErrorsMessages } =
    useListErrors();

  async function onSubmit(data: CreateOrdemServicoFormValues) {
    console.log("onSubmit", data);

    const result = await create({
      variables: mapCreateOrdemServicoFormValuesToApi({
        ...data,
        criado_por_advogado_uuid: authContext.state.advogado.uuid,
      }),
    });

    if (result.errors) {
      const formatedErrors = formatGraphQLFormattedError(result.errors);
      setErrorsMessages(formatedErrors);
      toast.error("Erro ao criar ordem de serviço");
    } else if (result.data?.createOrdemServico.uuid) {
      form.reset();
      clearErrors();
      openDialog();
    }
  }

  return (
    <DashboardPageContainer>
      <DashBoardPageTitle className="pb-4">
        Nova ordem de serviço
      </DashBoardPageTitle>

      <Card className="max-w-96">
        <CardContent>
          <ListErrorsComponent />
          <CustomForm
            methods={form}
            onSubmit={onSubmit}
            className="flex flex-col gap-2 bg-white pt-4"
          >
            <ControlledInputDate
              name="data_abertura"
              label="Data de abertura"
              type="datetime-local"
            />
            <ControlledInputDate
              name="prazo_conclusao"
              label="Prazo de conclusão"
              type="datetime-local"
            />

            <ControlledInputDate
              name="data_cancelamento"
              label="Data de cancelamento"
              type="datetime-local"
            />

            <ControlledInputSelect
              name="status"
              label="Status"
              options={SELECT_STATUS_ORDEM_SERVICO}
            />
            <ControlledInputDate
              name="data_conclusao"
              label="Data de conclusão"
              type="datetime-local"
              disabled={state_status !== STATUS_ORDEM_SERVICO.CONCLUIDA}
            />
            <ControlledInputSelect
              name="prioridade"
              label="Prioridade"
              options={SELECT_PRIORIDADE_ORDEM_SERVICO}
            />
            <ControlledInputFindValue
              name="servico"
              label="Serviço"
              onClick={selectModalServico.openModal}
              buttonLabel="Buscar Serviço"
            />
            <ControlledInputFindValue
              name="processo"
              label="Processo"
              onClick={selectModalProcesso.openModal}
              buttonLabel="Buscar Processo"
              disabled={form.watch("caso").value !== ""}
            />
            <ControlledInputFindValue
              name="caso"
              label="Caso"
              onClick={selectModalCaso.openModal}
              buttonLabel="Buscar Caso"
              disabled={form.watch("processo").value !== ""}
            />
            <ControlledInputFloat
              name="valor_servico"
              label="Valor do serviço"
            />
            <ControlledTextArea name="descricao" label="Descrição" />
            <div className="flex items-center gap-2">
              <CustomButton
                type="submit"
                label="Salvar"
                loading={loading}
                loadingLabel="Salvando..."
                className="m-auto mt-4"
              />
            </div>
          </CustomForm>
        </CardContent>
      </Card>

      <CustomDialog
        control={control}
        to={navAdvogado.dashboard.advogado.toOrdemServico({
          ordem_servico_uuid: servico?.uuid || "",
        })}
        labelAction="Ir para registro"
      />

      <SelectServicoModal control={selectModalServico.control} />
      <SelectProcessoModal control={selectModalProcesso.control} />
      <SelectCasoModal control={selectModalCaso.control} />
    </DashboardPageContainer>
  );
}
