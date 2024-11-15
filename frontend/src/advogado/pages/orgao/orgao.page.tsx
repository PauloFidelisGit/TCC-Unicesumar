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
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { mapQueryFindOrgaoDTOToForm, mapUpdateToApi } from "./orgao.dto";
import { MUTATION_UPDATE_ORGAO, QUERY_FIND_ORGAO } from "./orgao.queries";
import { EditOrgaoFormValues, editOrgaoSchema } from "./orgao.schema";

export default function OrgaoPage() {
  const { orgao_uuid } = useRequiredParams([
    {
      param: "orgao_uuid",
      message: "Órgão não encontrado.",
      isUuid: true,
    },
  ]);

  const find = useSuspenseQuery(QUERY_FIND_ORGAO, {
    variables: {
      where: "uuid",
      value: orgao_uuid,
    },
  });

  if (find.error) {
    const extensions = find.error.cause?.extensions as ExtensionsType;

    if (extensions?.code === ERRORS.INTERNAL_SERVER_ERROR) {
      throw new InternalServerError(find.error.cause?.message);
    }

    throw new NotFoundError("Órgão não encontrado.");
  }

  const orgao = mapQueryFindOrgaoDTOToForm(find.data.findOrgao);

  const form = useForm<EditOrgaoFormValues>({
    resolver: zodResolver(editOrgaoSchema),
    values: orgao,
  });

  const [update, { loading }] = useMutation(MUTATION_UPDATE_ORGAO);

  const { ListErrorsComponent, clearErrors, setErrorsMessages } =
    useListErrors();

  async function onSubmit(data: EditOrgaoFormValues) {
    const variables = mapUpdateToApi(orgao_uuid!, data);

    const result = await update({
      variables,
    });

    if (result.errors) {
      const formatedErrors = formatGraphQLFormattedError(result.errors);
      setErrorsMessages(formatedErrors);
      toast.error("Não foi possível atualizar o órgão.");
    } else if (result?.data?.updateOrgao) {
      clearErrors();
      find.refetch();
      toast.success("Órgão atualizado com sucesso!");
    }
  }

  return (
    <DashboardPageContainer>
      <div>
        <DashBoardPageTitle>{orgao.nome}</DashBoardPageTitle>
        <DashboardPageSubtitle>Órgão</DashboardPageSubtitle>
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
