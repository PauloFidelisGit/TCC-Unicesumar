import {
  DashboardPageContainer,
  DashboardPageSubtitle,
  DashBoardPageTitle,
} from "@/advogado/dashboard/dashboard-page";
import { CustomButton } from "@/components/custom-buttons";
import { CustomForm } from "@/components/custom-form";
import { ControlledInputText } from "@/components/custom-input";
import { Card, CardContent } from "@/components/shadcn/card";
import { Separator } from "@/components/shadcn/separator";
import { ERRORS } from "@/domain/enums";
import { InternalServerError, NotFoundError } from "@/domain/errors";
import { ExtensionsType } from "@/domain/errors/extensions.type";
import { useListErrors } from "@/hooks/use-list-error";
import { useRequiredParams } from "@/hooks/use-required-params";
import { formatGraphQLFormattedError } from "@/lib/utils";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { mapFindToForm, mapUpdateToApi } from "./tribunal.dto";
import {
  MUTATION_UPDATE_TRIBUNAL,
  QUERY_FIND_TRIBUNAL,
} from "./tribunal.queries";
import { EditTribunalFormValues, editTribunalSchema } from "./tribunal.schema";

export default function TribunalPage() {
  const { tribunal_uuid } = useRequiredParams([
    {
      param: "tribunal_uuid",
      message: "Tribunal não encontrado.",
      isUuid: true,
    },
  ]);

  const find = useSuspenseQuery(QUERY_FIND_TRIBUNAL, {
    variables: {
      where: "uuid",
      value: tribunal_uuid,
    },
  });

  if (find.error) {
    const extensions = find.error.cause?.extensions as ExtensionsType;

    if (extensions?.code === ERRORS.INTERNAL_SERVER_ERROR) {
      throw new InternalServerError(find.error.cause?.message);
    }

    throw new NotFoundError("Tribunal não encontrado.");
  }

  const [tribunal, setTribunal] = useState(
    mapFindToForm(find.data.findTribunal),
  );

  const form = useForm<EditTribunalFormValues>({
    resolver: zodResolver(editTribunalSchema),
    values: tribunal,
  });

  const [update, { loading }] = useMutation(MUTATION_UPDATE_TRIBUNAL);

  const { ListErrorsComponent, clearErrors, setErrorsMessages } =
    useListErrors();

  async function onSubmit(data: EditTribunalFormValues) {
    const result = await update({
      variables: mapUpdateToApi(tribunal_uuid!, data),
    });

    if (result.errors) {
      const formatedErrors = formatGraphQLFormattedError(result.errors);
      setErrorsMessages(formatedErrors);
    } else if (result?.data?.updateTribunal) {
      clearErrors();
      setTribunal(form.getValues());
      toast.success("Tribunal atualizado com sucesso!");
    }
  }

  return (
    <DashboardPageContainer>
      <DashBoardPageTitle>{tribunal.nome}</DashBoardPageTitle>
      <DashboardPageSubtitle>Tribunal</DashboardPageSubtitle>

      <Separator className="my-4" />
      <Card className="max-w-96 flex-1">
        <CardContent>
          <ListErrorsComponent />
          <CustomForm
            methods={form}
            onSubmit={onSubmit}
            className="space-y-4 pt-4"
          >
            <ControlledInputText name="nome" label="Nome" required />
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
    </DashboardPageContainer>
  );
}
