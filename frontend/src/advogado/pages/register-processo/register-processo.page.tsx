import SelectClasseJudicialModal from "@/advogado/components/select-classe-judicial/select-classe-judicial.modal";
import { SelectOrgaoModal } from "@/advogado/components/select-orgao/select-orgao.modal";
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
  ControlledInputText,
} from "@/components/custom-input";
import { ControlledInputSwitch } from "@/components/custom-switch";
import { Card, CardContent } from "@/components/shadcn/card";
import { useSelectModal } from "@/hooks/use-select-modal";
import {
  formatCurrencyFromInputValue,
  formatGraphQLFormattedError,
  formatProcessNumberFromInputValue,
} from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { mapCreateToApi } from "./register-processo.dto";
import { MUTATION_CREATE_PROCESSO } from "./register-processo.queries";
import { FormSchema, formSchema } from "./register-processo.schema";

// const fakeValues = {
//   numero: formatProcessNumber(fakerPT_BR.string.numeric(20).toString()),
//   data_autuacao: fakerPT_BR.date.anytime().toISOString().slice(0, 10),
//   valor_causa: new Money(
//     fakerPT_BR.number.float({
//       min: 1,
//       max: 100000000,
//       fractionDigits: 2,
//     }),
//   ).formatBr,
//   segredo_justica: fakerPT_BR.datatype.boolean(),
//   tutela_urgencia: fakerPT_BR.datatype.boolean(),
// };

export default function RegisterProcessoPage() {
  const authContext = useContext(AuthContext);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numero: "",
      data_autuacao: "",
      valor_causa: "",
      segredo_justica: false,
      tutela_urgencia: false,
      orgao: { value: "", label: "" },
      classe_judicial: { value: "", label: "" },
    },
  });

  const selectModalOrgao = useSelectModal("orgao", {
    setFieldValue: form.setValue,
  });
  const selectModalClasseJudicial = useSelectModal("classe_judicial", {
    setFieldValue: form.setValue,
  });

  const [create, { loading, data }] = useMutation(MUTATION_CREATE_PROCESSO);

  const processo = data?.createProcesso;

  const { openDialog, control } = useDialog();

  async function onSubmit(data: FormSchema) {
    const result = await create({
      variables: mapCreateToApi({
        ...data,
        criado_por_advogado_uuid: authContext.state.advogado.uuid,
      }),
    });

    if (result.errors) {
      const formatedErrors = formatGraphQLFormattedError(result.errors);
      formatedErrors.forEach((error) => {
        toast.error(error.message);
      });
    } else if (result.data?.createProcesso.uuid) {
      form.reset();
      openDialog();
    }
  }

  return (
    <DashboardPageContainer>
      <SelectOrgaoModal control={selectModalOrgao.control} />
      <SelectClasseJudicialModal control={selectModalClasseJudicial.control} />
      <DashBoardPageTitle className="pb-4">Novo Processo</DashBoardPageTitle>
      <Card className="max-w-96">
        <CardContent>
          <CustomForm
            methods={form}
            onSubmit={onSubmit}
            className="flex max-w-96 flex-col gap-2 pt-4"
            disabled={loading}
          >
            <ControlledInputText
              name="numero"
              label="Número"
              onChange={formatProcessNumberFromInputValue}
              required
            />
            <ControlledInputDate
              name="data_autuacao"
              label="Data da autuação"
              type="date"
            />
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
            <div className="flex items-center gap-2">
              <CustomButton
                type="submit"
                label="Salvar"
                loading={loading}
                loadingLabel="Salvando..."
                className="m-auto"
              />
            </div>
          </CustomForm>
        </CardContent>
      </Card>

      <CustomDialog
        control={control}
        to={navAdvogado.dashboard.advogado.toProcesso({
          processo_uuid: processo?.uuid || "",
        })}
        labelAction="Ir para registro"
      />
    </DashboardPageContainer>
  );
}
