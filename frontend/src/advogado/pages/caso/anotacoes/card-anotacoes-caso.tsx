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
import { TypeAnotacaoCaso } from "./anotacoes-caso.dto";
import {
  MUTATION_DELETE_ANOTACAO_CASO,
  MUTATION_UPDATE_ANOTACAO_CASO,
} from "./anotacoes-caso.queries";
import {
  UpdateAnotacoesCasoFormValues,
  updateAnotacoesCaso,
} from "./anotacoes-caso.schema";

interface CardAnotacaoProps {
  data: TypeAnotacaoCaso;
  refetchAnotacoesCaso: () => void;
}
export function CardAnotacao({
  data: { uuid, atualizado_em, criado_em, descricao, titulo, advogado },
  refetchAnotacoesCaso: refetchAnotacoesCaso,
}: CardAnotacaoProps) {
  const [isEdit, setIsEdit] = useState(false);

  const form = useForm<UpdateAnotacoesCasoFormValues>({
    resolver: zodResolver(updateAnotacoesCaso),
    values: {
      titulo,
      descricao,
    },
  });

  const [update, updateOptions] = useMutation(MUTATION_UPDATE_ANOTACAO_CASO);

  const [deleteFn, deleteOptions] = useMutation(MUTATION_DELETE_ANOTACAO_CASO);

  async function handleDelete(uuid: string) {
    const result = await deleteFn({
      variables: {
        uuid,
      },
    });
    if (result.data?.deleteAnotacoesCaso) {
      refetchAnotacoesCaso();
      toast.success("Anotação excluída com sucesso!");
    }
  }

  function cancelEdit() {
    setIsEdit(false);
  }

  async function onSubmit(data: UpdateAnotacoesCasoFormValues) {
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

    if (result.data?.updateAnotacoesCaso) {
      setIsEdit(false);
      refetchAnotacoesCaso();
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
