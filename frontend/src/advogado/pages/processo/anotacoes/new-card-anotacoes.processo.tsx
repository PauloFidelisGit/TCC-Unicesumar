import { AuthContext } from "@/advogado/context/auth-context/auth.context";
import { CustomButton } from "@/components/custom-buttons";
import { CustomForm } from "@/components/custom-form";
import { ControlledInputText } from "@/components/custom-input";
import { ControlledTextArea } from "@/components/custom-text-area";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Separator } from "@/components/shadcn/separator";
import { Datetime } from "@/domain/vo/datetime.vo";
import { useListErrors } from "@/hooks/use-list-error";
import { formatGraphQLFormattedError } from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MUTATION_CREATE_ANOTACAO_PROCESSO } from "./anotacoes-processo.queries";
import {
  CreateAnotacoesProcessoFormValues,
  createAnotacoesProcessoSchema,
} from "./anotacoes-processo.schema";

interface NewCardProps {
  setShowAddCard: (value: boolean) => void;
  processo_uuid: string;
  refetchAnotacoesProcesso: () => void;
}
export function NewCard({
  setShowAddCard,
  processo_uuid,
  refetchAnotacoesProcesso,
}: NewCardProps) {
  const authContext = useContext(AuthContext);

  const form = useForm<CreateAnotacoesProcessoFormValues>({
    resolver: zodResolver(createAnotacoesProcessoSchema),
    defaultValues: {
      titulo: "",
      descricao: "",
    },
    values: {
      titulo: "",
      descricao: "",
    },
  });

  const [create, { loading }] = useMutation(MUTATION_CREATE_ANOTACAO_PROCESSO);

  const { ListErrorsComponent, clearErrors, setErrorsMessages } =
    useListErrors();

  async function onSubmit(data: CreateAnotacoesProcessoFormValues) {
    const result = await create({
      variables: {
        criado_em: Datetime.create().toDateTime,
        titulo: data.titulo,
        descricao: data.descricao,
        criado_por_advogado_uuid: authContext.state.advogado.uuid,
        processo_uuid,
      },
    });

    if (result.errors) {
      const formatedErrors = formatGraphQLFormattedError(result.errors);
      setErrorsMessages(formatedErrors);
      toast.error("Erro ao criar anotação");
    } else if (result.data?.createAnotacoesProcesso.uuid) {
      setShowAddCard(false);
      form.reset();
      refetchAnotacoesProcesso();
      clearErrors();
      toast.success("Anotação criada com sucesso!");
    }
  }

  function cancelCreate() {
    setShowAddCard(false);
  }

  return (
    <Card className="text-sm md:text-base">
      <CustomForm methods={form} onSubmit={onSubmit}>
        <CardHeader className="pb-0">
          <CardTitle className="text-lg">Nova anotação</CardTitle>
        </CardHeader>
        <CardContent>
          <ListErrorsComponent />
          <ControlledInputText name="titulo" label="Título" />
          <ControlledTextArea
            name="descricao"
            label="Descrição"
            className="min-h-32"
            maxLength={255}
          />
        </CardContent>
        <Separator className="mb-6" />
        <CardFooter className="flex justify-end space-x-4">
          <CustomButton
            label="Cancelar"
            onClick={cancelCreate}
            variant="outline"
          />
          <CustomButton
            type="submit"
            label="Salvar"
            loadingLabel="Salvando..."
            loading={loading}
          />
        </CardFooter>
      </CustomForm>
    </Card>
  );
}