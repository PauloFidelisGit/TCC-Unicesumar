import { CustomButton } from "@/components/custom-buttons";
import { CustomForm } from "@/components/custom-form";
import { ControlledInputText } from "@/components/custom-input";
import { ControlledTextArea } from "@/components/custom-text-area";
import {
  IconBaselineDeleteOutline,
  IconBaselineEdit,
  IconBaselinePerson,
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
import { Datetime } from "@/domain/vo/datetime.vo";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { TypeAnotacaoProcesso } from "./anotacoes-processo.dto";
import {
  MUTATION_DELETE_ANOTACAO_PROCESSO,
  MUTATION_UPDATE_ANOTACAO_PROCESSO,
} from "./anotacoes-processo.queries";
import {
  UpdateAnotacoesProcessoFormValues,
  updateAnotacoesProcesso,
} from "./anotacoes-processo.schema";

interface CardAnotacaoProps {
  data: TypeAnotacaoProcesso;
  refetchAnotacoesProcesso: () => void;
}
export function CardAnotacao({
  data: { uuid, atualizado_em, criado_em, descricao, titulo, advogado },
  refetchAnotacoesProcesso,
}: CardAnotacaoProps) {
  const [isEdit, setIsEdit] = useState(false);

  const form = useForm<UpdateAnotacoesProcessoFormValues>({
    resolver: zodResolver(updateAnotacoesProcesso),
    values: {
      titulo,
      descricao,
    },
  });

  const [update, updateOptions] = useMutation(
    MUTATION_UPDATE_ANOTACAO_PROCESSO,
  );

  const [deleteFn, deleteOptions] = useMutation(
    MUTATION_DELETE_ANOTACAO_PROCESSO,
  );

  async function handleDelete(uuid: string) {
    const result = await deleteFn({
      variables: {
        uuid,
      },
    });
    if (result.data?.deleteAnotacoesProcesso) {
      refetchAnotacoesProcesso();
      toast.success("Anotação excluída com sucesso!");
    }
  }

  function cancelEdit() {
    setIsEdit(false);
  }

  async function onSubmit(data: UpdateAnotacoesProcessoFormValues) {
    const result = await update({
      variables: {
        uuid,
        data: {
          atualizado_em: Datetime.create().toDateTime,
          descricao: data.descricao,
          titulo: data.titulo,
        },
      },
    });

    if (result.data?.updateAnotacoesProcesso) {
      setIsEdit(false);
      refetchAnotacoesProcesso();
      toast.success("Anotação atualizada com sucesso!");
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
              <CardTitle className="text-lg">Editar anotação</CardTitle>
            </CardHeader>
            <CardContent>
              <ControlledInputText name="titulo" label="Título" />
              <ControlledTextArea
                name="descricao"
                label="Descrição"
                className="min-h-32"
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
            <CardTitle className="text-lg">{titulo}</CardTitle>
            <LabelIcon
              icon={IconBaselinePerson}
              label={advogado.label}
              className="text-sm text-zinc-500 dark:text-zinc-400"
            />
            <div className="flex gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <LabelIcon icon={IconBaselineStar} label={criado_em} />
              {atualizado_em && (
                <LabelIcon icon={IconBaselineEdit} label={atualizado_em} />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Text className="font-semibold">Descrição</Text>
            {descricao}
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
