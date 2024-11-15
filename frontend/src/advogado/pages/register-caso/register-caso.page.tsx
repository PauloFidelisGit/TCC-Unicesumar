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
import { ControlledInputText } from "@/components/custom-input";
import { ControlledTextArea } from "@/components/custom-text-area";
import { Card, CardContent } from "@/components/shadcn/card";
import { Datetime } from "@/domain/vo/datetime.vo";
import { useListErrors } from "@/hooks/use-list-error";
import { formatGraphQLFormattedError } from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { mapCreateToApi } from "./register-caso.dto";
import { MUTATION_CREATE_CASO } from "./register-caso.queries";
import { formSchema, FormSchema } from "./register-caso.schema";

// const fakeValues = {
//   titulo: fakerPT_BR.company.name(),
//   data_abertura: Datetime.create().toDateTimeLocal,
//   data_encerramento: "",
//   descricao: fakerPT_BR.lorem.paragraph(),
// };

export default function RegisterCasoPage() {
  const { openDialog, control } = useDialog();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      data_abertura: Datetime.create().toDateTimeLocal,
      data_encerramento: "",
      descricao: "",
    },
  });

  const [create, { loading, data }] = useMutation(MUTATION_CREATE_CASO);

  const caso = data?.createCaso;

  const { ListErrorsComponent, clearErrors, setErrorsMessages } =
    useListErrors();

  const authContext = useContext(AuthContext);

  async function onSubmit(data: FormSchema) {
    const result = await create({
      variables: mapCreateToApi({
        ...data,
        criado_por_advogado_uuid: authContext.state.advogado.uuid,
      }),
    });

    if (result.errors) {
      const formatedErrors = formatGraphQLFormattedError(result.errors);
      setErrorsMessages(formatedErrors);
      toast.error("Erro ao criar caso");
    } else if (result.data?.createCaso.uuid) {
      form.reset();
      clearErrors();
      openDialog();
    }
  }

  return (
    <DashboardPageContainer>
      <DashBoardPageTitle className="pb-4">Novo Caso</DashBoardPageTitle>
      <Card className="max-w-96">
        <CardContent>
          <CustomForm
            methods={form}
            onSubmit={onSubmit}
            className="flex flex-col gap-2 bg-white pt-4"
          >
            <ListErrorsComponent />
            <ControlledInputText name="titulo" label="Título" required />
            <ControlledInputDate
              name="data_abertura"
              label="Data de abertura"
              type="datetime-local"
              required
            />
            <ControlledInputDate
              name="data_encerramento"
              label="Data de encerramento"
              type="datetime-local"
            />
            <ControlledTextArea
              name="descricao"
              label="Descrição"
              className="min-h-32"
              maxLength={255}
            />
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
        to={navAdvogado.dashboard.advogado.toCaso({
          caso_uuid: caso?.uuid || "",
        })}
        labelAction="Ir para registro"
      />
    </DashboardPageContainer>
  );
}
