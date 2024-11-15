import { CustomForm } from "@/components/custom-form";
import { ControlledInputText } from "@/components/custom-input";
import { Button } from "@/components/shadcn/button";
import { Card, CardContent } from "@/components/shadcn/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import { SELECT_STATUS_ORDEM_SERVICO } from "@/domain/enums/STATUS_ORDEM_SERVICO";
import { useLazyQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SearchOrdemServicoArgs } from "backend/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FormValues } from "../create-fatura.schema";
import {
  QUERY_SEARCH_ORDEM_SERVICO,
  QuerySearchOrdemServicoDTO,
} from "./select-ordem-servico.queries";
import { formSchema, FormSchema } from "./select-ordem-servico.schema";
import { mapQuerySearchOrdemServicoDTOToView } from "./selected-ordem-servico.dto";

interface Props {
  control: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  };
  appendOrdemServico(args: FormValues["ordens_servico"][number]): void;
}
export function SelectOrdemServicoModal({
  control: { onOpenChange, open },
  appendOrdemServico,
}: Props) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
      where: "numero",
    },
  });

  const [data, setData] = useState<QuerySearchOrdemServicoDTO[]>([]);

  const [search, { loading, called }] = useLazyQuery(
    QUERY_SEARCH_ORDEM_SERVICO,
    {
      onCompleted: (data) => {
        setData(data.searchOrdemServico);
      },
    },
  );

  const ordemServico = mapQuerySearchOrdemServicoDTOToView(data);

  async function onSubmit(data: FormSchema) {
    const { loading } = await search({
      variables: {
        value: data.value,
        limit: 10,
        where: data.where as SearchOrdemServicoArgs["where"],
        without_fatura: true,
      },
    });

    if (!loading) {
      toast.success("Pesquisa realizada com sucesso");
    }
  }

  function handleSelectData(props: FormValues["ordens_servico"][number]) {
    appendOrdemServico(props);
    onOpenChange(false);
  }

  useEffect(() => {
    setData([]);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-screen w-screen flex-col sm:max-h-[calc(100vh-50px)] sm:min-h-96
          sm:max-w-96"
      >
        <DialogHeader>
          <DialogTitle>Selecionar Ordem de serviço</DialogTitle>
          <DialogDescription>
            Apenas ordens de serviço concluídas serão exibidas.
          </DialogDescription>
        </DialogHeader>

        <CustomForm
          methods={form}
          onSubmit={onSubmit}
          className="max-w-[700px] space-y-4"
        >
          <fieldset disabled={loading} className="space-y-4">
            <FormField
              control={form.control}
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
          </fieldset>
        </CustomForm>

        {loading ? (
          <div className="m-auto mt-4 flex w-fit items-center gap-1">
            <Spinner />
            Pesquisando...
          </div>
        ) : (
          <div className="flex max-w-[700px] flex-1 flex-col overflow-x-scroll">
            {(ordemServico.length || 0) > 0 ? (
              <Card>
                <CardContent className="pt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Número</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ordemServico?.map(
                        ({ numero, uuid, valor_servico, ...props }, index) => (
                          <TableRow
                            key={index}
                            onClick={() =>
                              handleSelectData({
                                uuid,
                                valor_servico,
                                ...props,
                                numero,
                              })
                            }
                            className="cursor-pointer"
                          >
                            <TableCell>{numero}</TableCell>
                            <TableCell>{valor_servico}</TableCell>
                            <TableCell>
                              {
                                SELECT_STATUS_ORDEM_SERVICO.find(
                                  (item) => item.value === status,
                                )?.label
                              }
                            </TableCell>
                          </TableRow>
                        ),
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ) : (
              <>
                {called && (
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
  );
}
