import { useDialog } from "@/components/custom-dialog";
import { CustomForm } from "@/components/custom-form";
import { ControlledInputText } from "@/components/custom-input";
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
import { UseDialog } from "@/hooks/use-dialog";
import { useListErrors } from "@/hooks/use-list-error";
import { formatGraphQLFormattedError, formatProcessNumber } from "@/lib/utils";
import { useLazyQuery, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchProcessoArgs } from "backend/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { CasoPageOutletContext } from "../caso.page";
import {
  mapQuerySearchProcessosProcessoToView,
  MapQuerySearchProcessoToViewDTO,
} from "./processos-caso.dto";
import {
  MUTATION_CREATE_RELACIONAMENTO_CASO_PROCESSO,
  QUERY_SEARCH_PROCESSO,
} from "./processos-caso.queries";
import { formSchema, FormValues } from "./processos-caso.schemas";
import { Datetime } from "@/domain/vo/datetime.vo";

interface Props {
  firstStepModal: UseDialog;
  refetchProcessos: () => void;
}
export function ProcessosCasoLinkProcessoModal({
  firstStepModal,
  refetchProcessos,
}: Props) {
  const { caso_uuid } = useOutletContext<CasoPageOutletContext>();

  const searchForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
      where: "numero",
    },
  });

  const [search, searchOptions] = useLazyQuery(QUERY_SEARCH_PROCESSO);

  const processos = searchOptions.data?.searchProcesso
    ? mapQuerySearchProcessosProcessoToView(searchOptions.data.searchProcesso)
    : [];

  console.log(processos);

  const [processo, setProcesso] = useState<
    MapQuerySearchProcessoToViewDTO[number] | null
  >(null);

  const secondStepModal = useDialog();

  function toConfirmStep(props: MapQuerySearchProcessoToViewDTO[number]) {
    setProcesso(props);
    secondStepModal.openDialog();
    firstStepModal.closeDialog();
  }

  function goBackToFirstStep() {
    secondStepModal.closeDialog();
    firstStepModal.openDialog();
  }

  async function onSubmitSearch(data: FormValues) {
    const { loading } = await search({
      variables: {
        value: data.value,
        limit: 10,
        where: data.where as SearchProcessoArgs["where"],
      },
    });

    if (!loading && searchOptions.error) {
      toast.success("Pesquisa realizada com sucesso");
    }
  }

  const [create] = useMutation(MUTATION_CREATE_RELACIONAMENTO_CASO_PROCESSO);

  const { ListErrorsComponent, clearErrors, setErrorsMessages } =
    useListErrors();

  async function onSubmitCreate(uuid: string) {
    const result = await create({
      variables: {
        criado_em: Datetime.create().toDateTime,
        caso_uuid,
        processo_uuid: uuid,
      },
    });

    if (result.errors) {
      const formatedErrors = formatGraphQLFormattedError(result.errors);
      setErrorsMessages(formatedErrors);
      toast.error("Erro ao vincular processo");
    } else if (result.data?.createRelacionamentoCasoProcesso?.uuid) {
      toast.success("Processo vinculado com sucesso");
      secondStepModal.closeDialog();
      clearErrors();
      refetchProcessos();
    }
  }

  function clearComponentStateOnChange() {
    clearErrors();
  }
  useEffect(clearComponentStateOnChange, [secondStepModal.control.open]);

  return (
    <>
      <Dialog {...firstStepModal.control}>
        <DialogContent className="flex h-[calc(100hw-20px)] w-screen flex-col sm:min-h-96 sm:max-w-96">
          <DialogHeader>
            <DialogTitle>Selecionar Processo</DialogTitle>
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
                          <RadioGroupItem value="numero" />
                        </FormControl>
                        <FormLabel className="font-normal">Número</FormLabel>
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
              {(processos.length || 0) > 0 ? (
                <Card>
                  <CardContent className="pt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Número</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {processos?.map(({ numero }, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div
                                className="flex cursor-pointer items-center gap-2"
                                onClick={() => toConfirmStep(processos[index])}
                              >
                                {formatProcessNumber(numero)}
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
            <DialogTitle>Selecionar Processo</DialogTitle>
          </DialogHeader>
          <ListErrorsComponent />
          <div className="flex-1">
            <div className="flex flex-col gap-2">
              <div>
                <div className="font-semibold">Número</div>
                {processo?.numero && formatProcessNumber(processo?.numero)}
              </div>
              <div>
                <div className="font-semibold">Polo ativo</div>
                {(processo?.polo.polo_ativo?.length || 0) > 0 ? (
                  processo?.polo.polo_ativo.map((v, index) => {
                    return (
                      <div key={index}>
                        <div>{v.nome}</div>
                        {v.cpf && <div>CPF: {v.cpf}</div>}
                        {v.cnpj && <div>CNPJ: {v.cnpj}</div>}
                      </div>
                    );
                  })
                ) : (
                  <div>Polo não cadastrado</div>
                )}
              </div>

              <div>
                <div className="font-semibold">Polo passivo</div>
                {(processo?.polo.polo_passivo?.length || 0) > 0 ? (
                  processo?.polo.polo_passivo.map((v, index) => {
                    return (
                      <div key={index}>
                        <div>{v.nome}</div>
                        {v.cpf && <div>CPF: {v.cpf}</div>}
                        {v.cnpj && <div>CNPJ: {v.cnpj}</div>}
                      </div>
                    );
                  })
                ) : (
                  <div>Polo não cadastrado</div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-row justify-end space-x-4">
            <Button variant="outline" onClick={goBackToFirstStep}>
              Voltar
            </Button>
            <Button onClick={() => processo && onSubmitCreate(processo.uuid)}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
