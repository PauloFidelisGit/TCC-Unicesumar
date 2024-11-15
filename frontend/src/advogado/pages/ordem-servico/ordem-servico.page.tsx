import { SelectCasoModal } from "@/advogado/components/select-caso/select-caso.modal";
import { SelectProcessoModal } from "@/advogado/components/select-processo/select-processo.modal";
import { SelectServicoModal } from "@/advogado/components/select-servico/select-servico.modal";
import {
  DashboardPageContainer,
  DashboardPageSubtitle,
  DashBoardPageTitle,
} from "@/advogado/dashboard/dashboard-page";
import { navAdvogado } from "@/advogado/routes/nav";
import { CustomButton } from "@/components/custom-buttons";
import { ControlledInputDate } from "@/components/custom-date";
import { CustomForm } from "@/components/custom-form";
import {
  ControlledInputFindValue,
  ControlledInputFloat,
} from "@/components/custom-input";
import { ControlledInputSelect } from "@/components/custom-select";
import { ControlledTextArea } from "@/components/custom-text-area";
import { Card, CardContent } from "@/components/shadcn/card";
import { Separator } from "@/components/shadcn/separator";
import { Text } from "@/components/typography";
import { ERRORS } from "@/domain/enums";
import { SELECT_PRIORIDADE_ORDEM_SERVICO } from "@/domain/enums/PRIORIDADE_ORDEM_SERVICO";
import {
  SELECT_STATUS_ORDEM_SERVICO,
  STATUS_ORDEM_SERVICO,
} from "@/domain/enums/STATUS_ORDEM_SERVICO";
import { InternalServerError, NotFoundError } from "@/domain/errors";
import { ExtensionsType } from "@/domain/errors/extensions.type";
import { useListErrors } from "@/hooks/use-list-error";
import { useRequiredParams } from "@/hooks/use-required-params";
import { useSelectModal } from "@/hooks/use-select-modal";
import { formatGraphQLFormattedError } from "@/lib/utils";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  mapQueryFindOrdemServicoDTOToForm,
  mapUpdateOrdemServicoToApi,
} from "./ordem-servico.dto";
import {
  MUTATION_UPDATE_ORDEM_SERVICO,
  QUERY_FIND_ORDEM_SERVICO,
} from "./ordem-servico.queries";
import {
  UpdateOrdemServicoFormValues,
  updateOrdemServicoSchema,
} from "./ordem-servico.schema";

export default function OrdemServicoPage() {
  const { ordem_servico_uuid } = useRequiredParams([
    {
      param: "ordem_servico_uuid",
      message: "Ordem de serviço não encontrada.",
      isUuid: true,
    },
  ]);

  const find = useSuspenseQuery(QUERY_FIND_ORDEM_SERVICO, {
    variables: {
      where: "uuid",
      value: ordem_servico_uuid,
    },
  });

  const disableCreateFatura = !!find.data.findOrdemServico.fatura_uuid;

  if (find.error) {
    const extensions = find.error.cause?.extensions as ExtensionsType;

    if (extensions?.code === ERRORS.INTERNAL_SERVER_ERROR) {
      throw new InternalServerError(find.error.cause?.message);
    }

    throw new NotFoundError("Ordem de serviço não encontrada.");
  }

  const form = useForm<UpdateOrdemServicoFormValues>({
    resolver: zodResolver(updateOrdemServicoSchema),
    values: mapQueryFindOrdemServicoDTOToForm(find.data.findOrdemServico),
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

  const [update, { loading }] = useMutation(MUTATION_UPDATE_ORDEM_SERVICO);

  const { ListErrorsComponent, clearErrors, setErrorsMessages } =
    useListErrors();

  async function onSubmit(data: UpdateOrdemServicoFormValues) {
    const result = await update({
      variables: mapUpdateOrdemServicoToApi({
        uuid: ordem_servico_uuid,
        data,
      }),
    });

    if (result.errors) {
      const formatedErrors = formatGraphQLFormattedError(result.errors);
      setErrorsMessages(formatedErrors);
      toast.error("Erro ao atualizar ordem de serviço.");
    } else if (result?.data?.updateOrdemServico) {
      clearErrors();
      find.refetch();
      toast.success("Ordem de serviço atualizada com sucesso!");
    }
  }

  return (
    <DashboardPageContainer>
      <div>
        <DashBoardPageTitle>
          OS nº {find.data.findOrdemServico.numero}
        </DashBoardPageTitle>
        <DashboardPageSubtitle>Ordem de serviço</DashboardPageSubtitle>
      </div>

      <Separator className="my-4" />

      <div className="my-4">
        {!disableCreateFatura ? (
          <CustomButton
            label="Criar Fatura"
            disabled={
              find.data.findOrdemServico.status !==
              STATUS_ORDEM_SERVICO.CONCLUIDA
            }
            to={navAdvogado.dashboard.advogado.createFatura}
          />
        ) : (
          <div className="flex flex-col gap-4">
            <CustomButton
              label="Ir para fatura"
              to={navAdvogado.dashboard.advogado.toFatura({
                fatura_uuid: find.data.findOrdemServico.fatura_uuid!,
              })}
            />
            {disableCreateFatura && (
              <Text variant="muted">
                Atenção: A ordem de serviço se encontra bloqueada pois está
                vinculada a uma fatura.
              </Text>
            )}
          </div>
        )}
      </div>

      <Card className="max-w-96 flex-1">
        <CardContent>
          <ListErrorsComponent />
          <CustomForm
            methods={form}
            onSubmit={onSubmit}
            className="space-y-4 pt-4"
            disabled={!!disableCreateFatura}
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
                label="Atualizar"
                loadingLabel="Atualizando..."
                loading={loading}
                className="m-auto mt-2"
              />
            </div>
          </CustomForm>
        </CardContent>
      </Card>
      <SelectServicoModal control={selectModalServico.control} />
      <SelectProcessoModal control={selectModalProcesso.control} />
      <SelectCasoModal control={selectModalCaso.control} />
    </DashboardPageContainer>
  );
}
