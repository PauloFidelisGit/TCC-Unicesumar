import {
  DashboardPageContainer,
  DashboardPageSubtitle,
  DashBoardPageTitle,
} from "@/advogado/dashboard/dashboard-page";
import { navAdvogado } from "@/advogado/routes/nav";
import { CustomButton } from "@/components/custom-buttons";
import { ControlledInputDate } from "@/components/custom-date";
import { CustomForm } from "@/components/custom-form";
import {
  ControlledInputFloat,
  ControlledInputInt,
} from "@/components/custom-input";
import { ControlledTextArea } from "@/components/custom-text-area";
import {
  IconBaselineAddCircleOutline,
  IconBaselineDeleteOutline,
} from "@/components/icons";
import { Card, CardContent } from "@/components/shadcn/card";
import { Label } from "@/components/shadcn/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { ERRORS } from "@/domain/enums";
import { selectLabelStatusFatura } from "@/domain/enums/STATUS_FATURA";
import { InternalServerError, NotFoundError } from "@/domain/errors";
import { ExtensionsType } from "@/domain/errors/extensions.type";
import { FloatValue } from "@/domain/vo/float-value";
import { useListErrors } from "@/hooks/use-list-error";
import { useRequiredParams } from "@/hooks/use-required-params";
import { formatGraphQLFormattedError } from "@/lib/utils";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  mapCreateParcelas,
  mapQueryFindFaturaDTOToForm,
  mapUpdateFaturaToApi,
} from "./fatura.dto";
import { MUTATION_UPDATE_FATURA, QUERY_FIND_FATURA } from "./fatura.queries";
import { FaturaFormValues, formSchema } from "./fatura.schema";
import { createParcelasFromFatura } from "./fatura.utils";
import { SelectOrdemServicoModal } from "./select-ordem-servico/select-ordem-servico.modal";

export default function CreateFaturaPage() {
  const { fatura_uuid } = useRequiredParams([
    {
      param: "fatura_uuid",
      message: "Fatura não encontrada.",
      isUuid: true,
    },
  ]);

  const find = useSuspenseQuery(QUERY_FIND_FATURA, {
    variables: {
      where: "uuid",
      value: fatura_uuid,
    },
  });

  if (find.error) {
    const extensions = find.error.cause?.extensions as ExtensionsType;
    if (extensions?.code === ERRORS.INTERNAL_SERVER_ERROR) {
      throw new InternalServerError(find.error.cause?.message);
    }
    throw new NotFoundError("Fatura não encontrada.");
  }

  const fatura = mapQueryFindFaturaDTOToForm(find.data.findFatura);

  console.dir(fatura.parcelas, { depth: null });

  const form = useForm<FaturaFormValues>({
    resolver: zodResolver(formSchema),
    values: fatura,
  });

  const parcelas = form.watch("parcelas");
  const numero_parcelas = form.watch("numero_parcelas");
  const first_due_date = form.watch("first_due_date");

  const [openModal, onOpenChangeModal] = useState(false);

  const ordensServicoFieldArray = useFieldArray({
    control: form.control,
    name: "ordens_servico",
  });
  function appendOrdemServico(
    args: FaturaFormValues["ordens_servico"][number],
  ) {
    ordensServicoFieldArray.append(args);
  }
  function removeOrdemServico(index: number) {
    ordensServicoFieldArray.remove(index);
  }

  const total_value_os = ordensServicoFieldArray.fields.reduce((acc, curr) => {
    const value = FloatValue.fromCurrencyString(curr?.valor_servico).value;
    return (acc += value);
  }, 0);
  function setTotalValueOs() {
    form.setValue(
      "total_value_os",
      new FloatValue(total_value_os).formatDecimalBr(),
    );
  }
  useEffect(setTotalValueOs, [total_value_os]);

  const total_value_fatura = parcelas.reduce((acc, curr) => {
    const value = FloatValue.fromCurrencyString(curr?.valor).value;
    return (acc += value);
  }, 0);
  function setTotalValueFatura() {
    form.setValue(
      "total_value_fatura",
      new FloatValue(total_value_fatura).formatDecimalBr(),
    );
  }
  useEffect(setTotalValueFatura, [total_value_fatura]);

  function createParcelas() {
    if (!first_due_date) return;
    const parcelas = createParcelasFromFatura({
      numberInstallments: +numero_parcelas,
      totalValue: total_value_os,
      initialDate: first_due_date,
    });
    form.setValue("parcelas", mapCreateParcelas(parcelas));
  }
  useEffect(createParcelas, [
    numero_parcelas,
    first_due_date,
    ordensServicoFieldArray.fields,
  ]);

  function showAlertMessageInFieldTotalFatura() {
    if (total_value_fatura > total_value_os) {
      return "Atenção: O valor total da é fatura maior que o valor total das OS's";
    } else if (total_value_fatura < total_value_os) {
      return "Atenção: O valor total da é fatura menor que o valor total das OS's";
    } else {
      return undefined;
    }
  }

  const [update, { loading }] = useMutation(MUTATION_UPDATE_FATURA);

  const { ListErrorsComponent, clearErrors, setErrorsMessages } =
    useListErrors();

  async function onSubmit(data: FaturaFormValues) {
    const variables = mapUpdateFaturaToApi({
      fatura_uuid,
      ...data,
    });

    const result = await update({
      variables,
    });

    if (result.errors) {
      const formatedErrors = formatGraphQLFormattedError(result.errors);
      setErrorsMessages(formatedErrors);
      toast.error("Não foi possível atualizar a fatura.");
    } else if (result.data?.updateFatura) {
      clearErrors();
      toast.success("Fatura atualizada com sucesso!");
    }
  }

  return (
    <DashboardPageContainer>
      <div>
        <DashBoardPageTitle>
          Fatura {selectLabelStatusFatura(find.data.findFatura.status_fatura)}
        </DashBoardPageTitle>
        <DashboardPageSubtitle>Fatura</DashboardPageSubtitle>
      </div>

      <Separator className="my-4" />

      <SelectOrdemServicoModal
        control={{
          open: openModal,
          onOpenChange: onOpenChangeModal,
        }}
        appendOrdemServico={appendOrdemServico}
      />

      <Card className="max-w-96">
        <CardContent>
          <CustomForm
            methods={form}
            onSubmit={onSubmit}
            className="flex flex-col gap-2 bg-white pt-4"
          >
            <ListErrorsComponent />

            <ControlledInputDate name="data_emissao" label="Data de emissão" />

            <div className="flex flex-col gap-2">
              <Label>Ordens de serviço</Label>
              <CustomButton
                variant="outline"
                className="w-fit gap-2"
                type="button"
                onClick={() => onOpenChangeModal(true)}
                disabled={ordensServicoFieldArray.fields.length >= 5}
                label="Adicionar ordem de serviço"
                icon={IconBaselineAddCircleOutline}
              />
              {ordensServicoFieldArray.fields.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>OS nº</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead className="text-center">Excluir</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ordensServicoFieldArray.fields.map(
                      ({ numero, valor_servico, uuid }, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>
                              <CustomButton
                                variant="link"
                                label={numero}
                                to={navAdvogado.dashboard.advogado.toOrdemServico(
                                  {
                                    ordem_servico_uuid: uuid,
                                  },
                                )}
                              />
                            </TableCell>
                            <TableCell>{valor_servico}</TableCell>
                            <TableCell className="grid">
                              <CustomButton
                                icon={IconBaselineDeleteOutline}
                                onClick={() => removeOrdemServico(index)}
                                variant="ghost"
                                iconSize={25}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      },
                    )}
                  </TableBody>
                </Table>
              )}
            </div>

            {ordensServicoFieldArray.fields.length !== 0 && (
              <>
                <ControlledInputFloat
                  name="total_value_os"
                  label="Valor total das OS's"
                  readOnly
                />

                <ControlledInputInt
                  name="numero_parcelas"
                  label="Número de parcelas"
                  disabled={total_value_os === 0}
                />
                <ControlledInputDate
                  name="first_due_date"
                  label="Data do primeiro vencimento"
                />

                {first_due_date && (
                  <div className="flex flex-col gap-2">
                    <Label>Parcelas</Label>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nº</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead>Vencimento / Pagamento</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {parcelas.map(({ numero }, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell>{numero}</TableCell>
                              <TableCell>
                                <ControlledInputFloat
                                  name={`parcelas.${index}.valor`}
                                />
                              </TableCell>
                              <TableCell>
                                <ControlledInputDate
                                  name={`parcelas.${index}.data_vencimento`}
                                />
                                <ControlledInputDate
                                  name={`parcelas.${index}.data_pagamento`}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}

                <ControlledInputFloat
                  name="total_value_fatura"
                  label="Valor total da fatura"
                  description={showAlertMessageInFieldTotalFatura()}
                  readOnly
                />
              </>
            )}

            <ControlledTextArea name="observacoes" label="Observações" />

            <div className="flex items-center gap-2">
              <CustomButton
                type="submit"
                label="Atualizar"
                loadingLabel="Atualizando..."
                loading={loading}
                className="m-auto mt-2"
                disabled={ordensServicoFieldArray.fields.length === 0}
              />
            </div>
          </CustomForm>
        </CardContent>
      </Card>
    </DashboardPageContainer>
  );
}
