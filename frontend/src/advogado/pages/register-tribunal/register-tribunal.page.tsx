import {
  DashboardPageContainer,
  DashBoardPageTitle,
} from "@/advogado/dashboard/dashboard-page";
import { navAdvogado } from "@/advogado/routes/nav";
import { CustomButton } from "@/components/custom-buttons";
import { CustomDialog, useDialog } from "@/components/custom-dialog";
import { CustomForm } from "@/components/custom-form";
import { ControlledInputText } from "@/components/custom-input";
import { Card, CardContent } from "@/components/shadcn/card";
import { useListErrors } from "@/hooks/use-list-error";
import { formatGraphQLFormattedError } from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { mapCreateFormToApi } from "./register-tribunal.dto";
import { MUTATION_CREATE_TRIBUNAL } from "./register-tribunal.queries";
import { formSchema, FormValues } from "./register-tribunal.schema";

// const fakeValues = {
//   nome: fakerPT_BR.company.name(),
// };

export default function RegisterTribunalPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
    },
  });

  const [create, { loading, data }] = useMutation(MUTATION_CREATE_TRIBUNAL);

  const tribunal = data?.createTribunal;

  const { ListErrorsComponent, clearErrors, setErrorsMessages } =
    useListErrors();

  const { openDialog, control } = useDialog();

  async function onSubmit(data: FormValues) {
    const result = await create({
      variables: mapCreateFormToApi(data),
    });

    if (result.errors) {
      const formatedErrors = formatGraphQLFormattedError(result.errors);
      setErrorsMessages(formatedErrors);
    } else if (result.data?.createTribunal.uuid) {
      form.reset();
      clearErrors();
      openDialog();
    }
  }

  return (
    <DashboardPageContainer>
      <DashBoardPageTitle className="pb-4">Novo tribunal</DashBoardPageTitle>

      <Card className="max-w-96">
        <CardContent>
          <ListErrorsComponent />
          <CustomForm
            methods={form}
            onSubmit={onSubmit}
            className="flex flex-col gap-4 space-y-2 bg-white pt-4"
          >
            <ControlledInputText name="nome" label="Nome" required />
            <CustomButton
              type="submit"
              label="Salvar"
              loading={loading}
              loadingLabel="Salvando..."
            />
          </CustomForm>
        </CardContent>
      </Card>

      <CustomDialog
        control={control}
        to={navAdvogado.dashboard.advogado.toTribunal({
          tribunal_uuid: tribunal?.uuid || "",
        })}
        labelAction="Ir para registro"
      />
    </DashboardPageContainer>
  );
}
