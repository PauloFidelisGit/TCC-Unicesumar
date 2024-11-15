import { CustomForm } from "@/components/custom-form";
import { ControlledInputText } from "@/components/custom-input";
import { CustomUncontrolledSelect } from "@/components/custom-select";
import { Avatar, AvatarFallback } from "@/components/shadcn/avatar";
import { Button } from "@/components/shadcn/button";
import { Card, CardContent } from "@/components/shadcn/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { Spinner } from "@/components/spinner";
import { Text } from "@/components/typography";
import {
  SELECT_TIPO_RELACIONAMENTO_PROCESSO_PESSOA,
  TIPO_RELACIONAMENTO_PROCESSO_PESSOA,
} from "@/domain/enums/TIPO_RELACIONAMENTO_PROCESSO_PESSOA";
import { UseDialog, useDialog } from "@/hooks/use-dialog";
import { useListErrors } from "@/hooks/use-list-error";
import { formatGraphQLFormattedError } from "@/lib/utils";
import { useLazyQuery, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SearchPessoaArgs } from "backend/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { ProcessoPageOutletContext } from "../processo.page";
import {
  mapSearchPessoaToView,
  MapSearchPessoaToViewDTO,
} from "./partes-processo.dto";
import {
  MUTATION_CREATE_RELACIONAMENTO_PROCESSO,
  QUERY_SEARCH_PESSOA,
} from "./partes-processo.queries";
import { formSchema, FormValues } from "./partes-processo.schemas";
import { Datetime } from "@/domain/vo/datetime.vo";

interface Props {
  firstStepModal: UseDialog;
}
export function PartesProcessoLinkPoloModal({ firstStepModal }: Props) {
  const { processo_uuid, refetchProcesso } =
    useOutletContext<ProcessoPageOutletContext>();

  const searchForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
      where: "nome",
    },
  });

  const [search, searchOptions] = useLazyQuery(QUERY_SEARCH_PESSOA);

  const pessoas = searchOptions.data?.searchPessoa
    ? mapSearchPessoaToView(searchOptions.data.searchPessoa)
    : [];

  const [pessoa, setPessoa] = useState<MapSearchPessoaToViewDTO[number] | null>(
    null,
  );

  const [tipoRelacionamento, setTipoRelacionamento] = useState<
    TIPO_RELACIONAMENTO_PROCESSO_PESSOA | ""
  >("");

  const secondStepModal = useDialog();

  function toConfirmStep(props: MapSearchPessoaToViewDTO[number]) {
    setPessoa(props);
    secondStepModal.openDialog();
    firstStepModal.closeDialog();
  }

  async function onSubmitSearch(data: FormValues) {
    const { loading } = await search({
      variables: {
        value: data.value,
        limit: 10,
        where: data.where as SearchPessoaArgs["where"],
      },
    });

    if (!loading && searchOptions.error) {
      toast.success("Pesquisa realizada com sucesso");
    }
  }

  const [create] = useMutation(MUTATION_CREATE_RELACIONAMENTO_PROCESSO);

  const { ListErrorsComponent, clearErrors, setErrorsMessages } =
    useListErrors();

  async function onSubmitCreate(uuid: string) {
    const result = await create({
      variables: {
        criado_em: Datetime.create().toDateTime,
        tipo_relacionamento:
          tipoRelacionamento as TIPO_RELACIONAMENTO_PROCESSO_PESSOA,
        pessoa_uuid: uuid,
        processo_uuid,
      },
    });

    if (result.errors) {
      const formatedErrors = formatGraphQLFormattedError(result.errors);
      setErrorsMessages(formatedErrors);
      toast.error("Erro ao vincular pessoa");
    } else if (result.data?.createRelacionamentoProcessoPessoa?.uuid) {
      toast.success("Pessoa vinculada com sucesso");
      secondStepModal.closeDialog();
      clearErrors();
      refetchProcesso();
    }
  }

  function clearComponentStateOnChange() {
    setTipoRelacionamento("");
    clearErrors();
  }
  useEffect(clearComponentStateOnChange, [secondStepModal.control.open]);

  return (
    <>
      <Dialog {...firstStepModal.control}>
        <DialogContent className="flex h-[calc(100hw-20px)] w-screen flex-col sm:min-h-96 sm:max-w-96">
          <DialogHeader>
            <DialogTitle>Selecionar Pessoa</DialogTitle>
          </DialogHeader>

          <CustomForm
            methods={searchForm}
            onSubmit={onSubmitSearch}
            className="max-w-[700px] space-y-4"
          >
            <FormField
              control={searchForm.control}
              name="where"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Parâmetro</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="nome" />
                        </FormControl>
                        <FormLabel className="font-normal">Nome</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ControlledInputText
              name="value"
              placeholder="Pesquisar..."
              required
            />
          </CustomForm>

          {searchOptions.loading ? (
            <div className="m-auto mt-4 flex w-fit items-center gap-1">
              <Spinner />
              Pesquisando...
            </div>
          ) : (
            <div className="max-w-96 flex-1 space-y-2 overflow-x-auto">
              {(pessoas.length || 0) > 0 ? (
                <Card>
                  <CardContent className="pt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pessoas?.map(({ nome }, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div
                                className="flex cursor-pointer items-center gap-2"
                                onClick={() => toConfirmStep(pessoas[index])}
                              >
                                <Avatar className="">
                                  <AvatarFallback>
                                    {nome.charAt(0).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                {nome}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {searchOptions.called && (
                    <Text variant="muted">Nenhum resultado encontrado</Text>
                  )}
                </>
              )}
            </div>
          )}
          <DialogClose asChild>
            <Button variant="outline">Fechar</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog {...secondStepModal.control}>
        <DialogContent className="flex min-h-60 w-screen flex-col sm:max-w-96">
          <DialogHeader>
            <DialogTitle>Selecionar Pessoa</DialogTitle>
          </DialogHeader>
          <ListErrorsComponent />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>
                  {pessoa?.nome.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {pessoa?.nome}
            </div>
            <CustomUncontrolledSelect
              className="mt-2"
              value={tipoRelacionamento}
              options={SELECT_TIPO_RELACIONAMENTO_PROCESSO_PESSOA}
              onValueChange={(value: TIPO_RELACIONAMENTO_PROCESSO_PESSOA) =>
                setTipoRelacionamento(value)
              }
              placeholder="Selecione o tipo de relacionamento"
              label="Tipo de relacionamento"
              required
            />
          </div>
          <DialogFooter className="flex flex-row justify-end space-x-4">
            <Button variant="outline" onClick={secondStepModal.closeDialog}>
              Fechar
            </Button>
            <Button
              onClick={() => pessoa && onSubmitCreate(pessoa.uuid)}
              disabled={!tipoRelacionamento}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
