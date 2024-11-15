import { CustomButton } from "@/components/custom-buttons";
import { CustomForm } from "@/components/custom-form";
import { ControlledInputText } from "@/components/custom-input";
import { ControlledInputSelect } from "@/components/custom-select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Separator } from "@/components/shadcn/separator";
import { SELECT_UF } from "@/domain/enums";
import { useListErrors } from "@/hooks/use-list-error";
import {
  formatCepFromInputValue,
  formatGraphQLFormattedError,
} from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { fakerPT_BR } from "@faker-js/faker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { mapFormCreateEnderecoToApi } from "./enderecos-advogado.dto";
import { MUTATION_CREATE_ENDERECO } from "./enderecos-advogado.queries";
import {
  CreateEnderecoFormValues,
  createEnderecoSchema,
} from "./enderecos-advogado.schemas";

const fakeData = {
  logradouro: fakerPT_BR.location.street(),
  numero: fakerPT_BR.location.buildingNumber(),
  complemento: fakerPT_BR.location.secondaryAddress(),
  bairro: fakerPT_BR.location.county(),
  cidade: fakerPT_BR.location.city(),
  estado: fakerPT_BR.location.state({ abbreviated: true }),
  cep: fakerPT_BR.location.zipCode({
    format: "##.###-###",
  }),
};

interface NewCardProps {
  refetchAnotacoesProcesso: () => void;
  setShowAddCard: (value: boolean) => void;
  advogado_uuid: string;
}
export function NewCard({
  refetchAnotacoesProcesso,
  setShowAddCard,
  advogado_uuid,
}: NewCardProps) {
  const form = useForm<CreateEnderecoFormValues>({
    resolver: zodResolver(createEnderecoSchema),
    defaultValues: {
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
    },
    values: fakeData,
  });

  const [create, { loading }] = useMutation(MUTATION_CREATE_ENDERECO);

  const { ListErrorsComponent, clearErrors, setErrorsMessages } =
    useListErrors();

  async function onSubmit(data: CreateEnderecoFormValues) {
    const result = await create({
      variables: mapFormCreateEnderecoToApi({
        ...data,
        advogado_uuid,
      }),
    });
    if (result.data?.createEndereco.uuid) {
      setShowAddCard(false);
      form.reset();
      refetchAnotacoesProcesso();
      clearErrors();
      toast.success("Endereço criado com sucesso!");
    } else {
      const formatedErrors = formatGraphQLFormattedError(result.errors);
      setErrorsMessages(formatedErrors);
      toast.error("Erro ao criar endereço");
    }
  }

  function cancelCreate() {
    setShowAddCard(false);
  }

  return (
    <Card className="text-sm md:text-base">
      <CustomForm
        methods={form}
        onSubmit={onSubmit}
        className="flex flex-col pt-4"
        disabled={loading}
      >
        <CardHeader className="pb-0">
          <CardTitle className="text-lg">Novo endereço</CardTitle>
        </CardHeader>
        <CardContent>
          <ListErrorsComponent />
          <ControlledInputText name={`logradouro`} label="Logradouro" />
          <ControlledInputText name={`numero`} label="Número" />
          <ControlledInputText name={`complemento`} label="Complemento" />
          <ControlledInputText name={`bairro`} label="Bairro" />
          <ControlledInputText name={`cidade`} label="Cidade" />
          <ControlledInputSelect
            label="Estado"
            name={`uf`}
            options={SELECT_UF}
            placeholder="Selecione um estado"
          />
          <ControlledInputText
            name={`cep`}
            label="CEP"
            className="w-40"
            onChange={formatCepFromInputValue}
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
