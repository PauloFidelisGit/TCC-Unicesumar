import { CustomForm } from "@/components/custom-form";
import { ControlledInputText } from "@/components/custom-input";
import { Button } from "@/components/shadcn/button";
import { Card, CardContent } from "@/components/shadcn/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
import { UseSelectModalControl } from "@/hooks/use-select-modal";
import { useLazyQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SearchProcessoArgs } from "backend/types";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { QUERY_SEARCH_PROCESSO } from "./select-processo.queries";
import { formSchema, FormSchema } from "./select-processo.schema";
import { mapQuerySearchProcessosDTOToView } from "./selected-processo.dto";

interface Props {
  control: UseSelectModalControl;
}
export function SelectProcessoModal({
  control: { onOpenChange, open, setData },
}: Props) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
      where: "numero",
    },
  });

  const [search, { loading, data, called }] = useLazyQuery(
    QUERY_SEARCH_PROCESSO,
  );

  const processo = mapQuerySearchProcessosDTOToView(data?.searchProcesso);

  async function onSubmit(data: FormSchema) {
    const { loading } = await search({
      variables: {
        value: data.value,
        limit: 10,
        where: data.where as SearchProcessoArgs["where"],
      },
    });

    if (!loading) {
      toast.success("Pesquisa realizada com sucesso");
    }
  }

  function handleSelectData(props: { numero: string; uuid: string }) {
    setData({
      label: props.numero,
      value: props.uuid,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-screen w-screen flex-col sm:max-h-[calc(100vh-50px)] sm:min-h-96
          sm:max-w-96"
      >
        <DialogHeader>
          <DialogTitle>Selecionar Processo</DialogTitle>
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
            {(processo.length || 0) > 0 ? (
              <Card>
                <CardContent className="pt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Número</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {processo?.map(({ numero, uuid }, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <button
                              type="button"
                              className="flex gap-2 text-left"
                              onClick={() => handleSelectData({ numero, uuid })}
                            >
                              {numero}
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
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
