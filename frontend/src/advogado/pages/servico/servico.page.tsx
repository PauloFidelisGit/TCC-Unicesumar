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
import {
  mapQueryFindServicoDTOToForm,
  mapUpdateServicoToApi,
} from "./servico.dto";
import { MUTATION_UPDATE_SERVICO, QUERY_FIND_SERVICO } from "./servico.queries";
import { UpdateServicoFormValues, updateServicoSchema } from "./servico.schema";

export default function ServicoPage() {
  const { servico_uuid } = useRequiredParams([
    {
      param: "servico_uuid",
      message: "Serviço não encontrado.",
      isUuid: true,
    },
  ]);

  const find = useSuspenseQuery(QUERY_FIND_SERVICO, {
    variables: {
      where: "uuid",
      value: servico_uuid,
    },
  });

  if (find.error) {
    const extensions = find.error.cause?.extensions as ExtensionsType;

    if (extensions?.code === ERRORS.INTERNAL_SERVER_ERROR) {
      throw new InternalServerError(find.error.cause?.message);
    }

    throw new NotFoundError("Órgão não encontrado.");
  }

  const [servico, setServico] = useState(
    mapQueryFindServicoDTOToForm(find.data.findServico),
  );

  const form = useForm<UpdateServicoFormValues>({
    resolver: zodResolver(updateServicoSchema),
    values: servico,
  });

  const [update, { loading }] = useMutation(MUTATION_UPDATE_SERVICO);

  const { ListErrorsComponent, clearErrors, setErrorsMessages } =
    useListErrors();

  async function onSubmit(data: UpdateServicoFormValues) {
    const result = await update({
      variables: mapUpdateServicoToApi(servico_uuid, data),
    });

    if (result.errors) {
      const formatedErrors = formatGraphQLFormattedError(result.errors);
      setErrorsMessages(formatedErrors);
    } else if (result?.data?.updateServico) {
      clearErrors();
      setServico(form.getValues());
      toast.success("Serviço atualizado com sucesso!");
    }
  }

  return (
    <DashboardPageContainer>
      <div>
        <DashBoardPageTitle>{servico.nome}</DashBoardPageTitle>
        <DashboardPageSubtitle>Serviço</DashboardPageSubtitle>
      </div>

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
