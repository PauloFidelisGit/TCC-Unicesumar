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
import { mapCreateServicoFormValuesToApi } from "./register-servico.dto";
import { MUTATION_CREATE_SERVICO } from "./register-servico.queries";
import { CreateServicoFormValues, formSchema } from "./register-servico.schema";

// const values = {
//   nome: fakerPT_BR.company.name(),
// };

export default function RegisterServicoPage() {
  const { openDialog, control } = useDialog();

  const form = useForm<CreateServicoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
    },
  });

  const [create, { loading, data }] = useMutation(MUTATION_CREATE_SERVICO);

  const servico = data?.createServico;

  const { ListErrorsComponent, clearErrors, setErrorsMessages } =
    useListErrors();

  async function onSubmit(data: CreateServicoFormValues) {
    console.log(
      "🚀 ~ file: register-servico.page.tsx:47 ~ onSubmit ~ data:",
      data,
    );

    const result = await create({
      variables: mapCreateServicoFormValuesToApi(data),
    });

    if (result.errors) {
      const formatedErrors = formatGraphQLFormattedError(result.errors);
      setErrorsMessages(formatedErrors);
    } else if (result.data?.createServico.uuid) {
      form.reset();
      clearErrors();
      openDialog();
    }
  }

  return (
    <DashboardPageContainer>
      <DashBoardPageTitle className="pb-4">Novo Serviço</DashBoardPageTitle>
      <Card className="max-w-96">
        <CardContent>
          <CustomForm
            methods={form}
            onSubmit={onSubmit}
            className="flex flex-col gap-2 bg-white pt-4"
          >
            <ListErrorsComponent />
            <ControlledInputText name="nome" label="Nome" required />
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
        to={navAdvogado.dashboard.advogado.toServico({
          servico_uuid: servico?.uuid || "",
        })}
        labelAction="Ir para registro"
      />
    </DashboardPageContainer>
  );
}
