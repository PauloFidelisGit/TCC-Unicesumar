import { SelectMunicipioModal } from "@/advogado/components/select-municipio/select-municipio.modal";
import { SelectTribunalModal } from "@/advogado/components/select-tribunal/select-tribunal.modal";
import {
  DashboardPageContainer,
  DashBoardPageTitle,
} from "@/advogado/dashboard/dashboard-page";
import { navAdvogado } from "@/advogado/routes/nav";
import { CustomButton } from "@/components/custom-buttons";
import { CustomDialog, useDialog } from "@/components/custom-dialog";
import { CustomForm } from "@/components/custom-form";
import {
  ControlledInputFindValue,
  ControlledInputText,
} from "@/components/custom-input";
import { Card, CardContent } from "@/components/shadcn/card";
import { useListErrors } from "@/hooks/use-list-error";
import { useSelectModal } from "@/hooks/use-select-modal";
import { formatGraphQLFormattedError } from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { mapCreateToApi } from "./register-orgao.dto";
import { MUTATION_CREATE_ORGAO } from "./register-orgao.queries";
import { CreateOrgaoFormValues, formSchema } from "./register-orgao.schema";

// const values = {
//   nome: fakerPT_BR.company.name(),
// };

export default function RegisterOrgaoPage() {
  const { openDialog, control } = useDialog();

  const form = useForm<CreateOrgaoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      municipio: {
        label: "",
        value: "",
      },
      tribunal: {
        label: "",
        value: "",
      },
    },
  });

  const modalSelectMunicipio = useSelectModal("municipio", {
    setFieldValue: form.setValue,
  });
  const modalSelectTribunal = useSelectModal("tribunal", {
    setFieldValue: form.setValue,
  });

  const [create, { loading, data }] = useMutation(MUTATION_CREATE_ORGAO);

  const { ListErrorsComponent, clearErrors, setErrorsMessages } =
    useListErrors();

  async function onSubmit(data: CreateOrgaoFormValues) {
    const result = await create({
      variables: mapCreateToApi(data),
    });

    if (result.errors) {
      const formatedErrors = formatGraphQLFormattedError(result.errors);
      setErrorsMessages(formatedErrors);
    } else if (result.data?.createOrgao.uuid) {
      form.reset();
      clearErrors();
      openDialog();
    }
  }

  return (
    <DashboardPageContainer>
      <DashBoardPageTitle className="pb-4">Novo Órgão</DashBoardPageTitle>
      <SelectMunicipioModal control={modalSelectMunicipio.control} />
      <SelectTribunalModal control={modalSelectTribunal.control} />
      <Card className="max-w-96">
        <CardContent>
          <CustomForm
            methods={form}
            onSubmit={onSubmit}
            className="flex flex-col gap-2 bg-white pt-4"
          >
            <ListErrorsComponent />
            <ControlledInputText name="nome" label="Nome" required />
            <ControlledInputFindValue
              name="municipio"
              label="Município"
              onClick={modalSelectMunicipio.openModal}
              buttonLabel="Buscar Município"
            />
            <ControlledInputFindValue
              name="tribunal"
              label="Tribunal"
              onClick={modalSelectTribunal.openModal}
              buttonLabel="Buscar Tribunal"
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
        to={navAdvogado.dashboard.advogado.toOrgao({
          orgao_uuid: data?.createOrgao?.uuid || "",
        })}
        labelAction="Ir para registro"
      />
    </DashboardPageContainer>
  );
}
