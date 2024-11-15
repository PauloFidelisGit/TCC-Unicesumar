import { CustomButton } from "@/components/custom-buttons";
import { ControlledInputDate } from "@/components/custom-date";
import { CustomForm } from "@/components/custom-form";
import { ControlledInputText } from "@/components/custom-input";
import { ControlledTextArea } from "@/components/custom-text-area";
import { Card, CardContent } from "@/components/shadcn/card";
import { useListErrors } from "@/hooks/use-list-error";
import { formatGraphQLFormattedError } from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { CasoPageOutletContext } from "../caso.page";
import { mapUpdateCasoToApi } from "./index-caso.dto";
import { MUTATION_UPDATE_CASO } from "./index-caso.queries";
import { formSchema, FormValues } from "./index-caso.schema";

export default function IndexCasoTab() {
  const { caso, caso_uuid } = useOutletContext<CasoPageOutletContext>();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: caso,
  });

  const [update, { loading }] = useMutation(MUTATION_UPDATE_CASO);

  const { ListErrorsComponent, clearErrors, setErrorsMessages } =
    useListErrors();

  async function onSubmit(data: FormValues) {
    const result = await update({
      variables: mapUpdateCasoToApi(caso_uuid!, data),
    });

    if (result.errors) {
      const formatedErrors = formatGraphQLFormattedError(result.errors);
      setErrorsMessages(formatedErrors);
    } else if (result.data?.updateCaso) {
      clearErrors();
      toast.success("Caso atualizado com sucesso!");
    }
  }

  return (
    <Card className="max-w-96 flex-1">
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
  );
}
