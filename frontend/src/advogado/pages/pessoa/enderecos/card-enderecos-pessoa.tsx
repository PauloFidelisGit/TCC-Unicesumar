import { CustomButton } from "@/components/custom-buttons";
import { CustomForm } from "@/components/custom-form";
import { ControlledInputText } from "@/components/custom-input";
import { ControlledInputSelect } from "@/components/custom-select";
import {
  IconBaselineDeleteOutline,
  IconBaselineEdit,
  IconBaselineSave,
  IconBaselineStar,
} from "@/components/icons";
import LabelIcon from "@/components/label-icon";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Separator } from "@/components/shadcn/separator";
import { Text } from "@/components/typography";
import { SELECT_UF } from "@/domain/enums";
import { Datetime } from "@/domain/vo/datetime.vo";
import { formatCepFromInputValue } from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { TypeEndereco } from "./enderecos-pessoa.dto";
import {
  MUTATION_DELETE_ENDERECO,
  MUTATION_UPDATE_ENDERECO,
} from "./enderecos-pessoa.queries";
import {
  UpdateEnderecoFormValues,
  updateEnderecoSchema,
} from "./enderecos-pessoa.schemas";

interface EnderecoCardProps {
  data: TypeEndereco;
  refetchAnotacoesProcesso: () => void;
}
export function CardEndereco({
  data: {
    logradouro,
    numero,
    complemento,
    bairro,
    cidade,
    estado,
    cep,
    uuid,
    atualizado_em,
    criado_em,
  },
  refetchAnotacoesProcesso,
}: EnderecoCardProps) {
  const [isEdit, setIsEdit] = useState(false);

  const form = useForm<UpdateEnderecoFormValues>({
    resolver: zodResolver(updateEnderecoSchema),
    values: {
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      cep,
    },
  });

  const [update, updateOptions] = useMutation(MUTATION_UPDATE_ENDERECO);

  const [deleteFn, deleteOptions] = useMutation(MUTATION_DELETE_ENDERECO);

  async function handleDelete(uuid: string) {
    const result = await deleteFn({
      variables: {
        uuid,
      },
    });
    if (result.data?.deleteEndereco) {
      refetchAnotacoesProcesso();
      toast.success("Endereço excluído com sucesso!");
    }
  }

  function cancelEdit() {
    setIsEdit(false);
  }

  async function onSubmit(data: UpdateEnderecoFormValues) {
    const updateData = {
      ...data,
      uuid,
      criado_em,
      atualizado_em: Datetime.create().toDateTime,
    };
    const result = await update({
      variables: {
        uuid,
        data: {
          atualizado_em: updateData.atualizado_em,
          logradouro: updateData.logradouro,
          numero: updateData.numero,
          complemento: updateData.complemento,
          bairro: updateData.bairro,
          cidade: updateData.cidade,
          estado: updateData.estado,
          cep: updateData.cep,
        },
      },
    });

    if (result.data?.updateEndereco) {
      setIsEdit(false);
      refetchAnotacoesProcesso();
      toast.success("Endereço atualizado com sucesso!");
    }
  }

  return (
    <>
      {isEdit ? (
        <Card className="text-sm md:text-base">
          <CustomForm
            methods={form}
            onSubmit={onSubmit}
            disabled={deleteOptions.loading || updateOptions.loading}
          >
            <CardHeader>
              <CardTitle className="text-lg">Editar endereço</CardTitle>
            </CardHeader>
            <CardContent>
              <ControlledInputText name={`logradouro`} label="Logradouro" />
              <ControlledInputText name={`numero`} label="Número" />
              <ControlledInputText name={`complemento`} label="Complemento" />
              <ControlledInputText name={`bairro`} label="Bairro" />
              <ControlledInputText name={`cidade`} label="Cidade" />
              <ControlledInputSelect
                label="Estado"
                name="uf"
                options={SELECT_UF}
                placeholder="Selecione um estado"
              />
              <ControlledInputText
                name="cep"
                label="CEP"
                className="w-40"
                onChange={formatCepFromInputValue}
              />
            </CardContent>
            <Separator className="mb-6" />
            <CardFooter className="flex justify-end space-x-4">
              <CustomButton
                label="Cancelar"
                onClick={cancelEdit}
                variant="outline"
              />
              <CustomButton
                label="Atualizar"
                loadingLabel="Atualizando..."
                icon={IconBaselineSave}
                loading={updateOptions.loading}
              />
            </CardFooter>
          </CustomForm>
        </Card>
      ) : (
        <Card className="text-sm md:text-base">
          <CardHeader>
            <div className="flex gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <LabelIcon icon={IconBaselineStar} label={criado_em} />
              <LabelIcon icon={IconBaselineEdit} label={atualizado_em} />
            </div>
          </CardHeader>
          <CardContent>
            <Text>
              <strong>Logradouro:</strong> {logradouro}
            </Text>
            <Text>
              <strong>Número:</strong> {numero}
            </Text>
            <Text>
              <strong>Complemento:</strong> {complemento}
            </Text>
            <Text>
              <strong>Bairro:</strong> {bairro}
            </Text>
            <Text>
              <strong>Cidade:</strong> {cidade}
            </Text>
            <Text>
              <strong>Estado:</strong> {estado}
            </Text>
            <Text>
              <strong>CEP:</strong> {cep}
            </Text>
          </CardContent>
          <Separator className="mb-6" />
          <CardFooter className="flex justify-end space-x-4">
            <CustomButton
              label="Excluir"
              loadingLabel="Excluindo..."
              loading={deleteOptions.loading}
              variant="destructive"
              icon={IconBaselineDeleteOutline}
              onClick={() => handleDelete(uuid)}
            />
            <CustomButton
              label="Editar"
              icon={IconBaselineEdit}
              onClick={() => setIsEdit(true)}
            />
          </CardFooter>
        </Card>
      )}
    </>
  );
}
