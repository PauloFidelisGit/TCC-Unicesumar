import { AuthContext } from "@/advogado/context/auth-context/auth.context";
import {
  DashboardPageContainer,
  DashBoardPageTitle,
} from "@/advogado/dashboard/dashboard-page";
import { navAdvogado } from "@/advogado/routes/nav";
import { CustomButton } from "@/components/custom-buttons";
import { ControlledInputDate } from "@/components/custom-date";
import { CustomDialog, useDialog } from "@/components/custom-dialog";
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
import { Datetime } from "@/domain/vo/datetime.vo";
import { FloatValue } from "@/domain/vo/float-value";
import { useListErrors } from "@/hooks/use-list-error";
import { formatGraphQLFormattedError } from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { mapCreateFaturaToApi, mapCreateParcelas } from "./create-fatura.dto";
import { MUTATION_CREATE_FATURA } from "./create-fatura.queries";
import { FormValues } from "./create-fatura.schema";
import { createParcelasFromFatura } from "./create-fatura.utils";
import { SelectOrdemServicoModal } from "./select-ordem-servico/select-ordem-servico.modal";

export default function CreateFaturaPage() {
  const authContext = useContext(AuthContext);

  const { openDialog, control } = useDialog();

  const form = useForm<FormValues>({
    defaultValues: {
      total_value_os: "",
      total_value_fatura: "",
      data_emissao: Datetime.create().toDate,
      observacoes: "",
      ordens_servico: [],
      parcelas: [],
      numero_parcelas: "1",
      first_due_date: Datetime.create().toDate,
    },
  });

  const parcelas = form.watch("parcelas");
  const numero_parcelas = form.watch("numero_parcelas");
  const first_due_date = form.watch("first_due_date");

  const [openModal, onOpenChangeModal] = useState(false);

  const ordensServicoFieldArray = useFieldArray({
    control: form.control,
    name: "ordens_servico",
  });
  function appendOrdemServico(args: FormValues["ordens_servico"][number]) {
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

  const [create, { loading, data }] = useMutation(MUTATION_CREATE_FATURA);

  const { ListErrorsComponent, clearErrors, setErrorsMessages } =
    useListErrors();

  async function onSubmit(data: FormValues) {
    const variables = mapCreateFaturaToApi({
      fatura: {
        criado_por_advogado_uuid: authContext.state.advogado.uuid,
        data_emissao: data.data_emissao,
        observacoes: data.observacoes,
        valor_total: data.total_value_fatura,
      },
      parcelas: data.parcelas.map((v) => ({
        data_vencimento: v.data_vencimento,
        numero: v.numero,
        valor: v.valor,
      })),
      ordens_servico: data.ordens_servico.map((v) => ({
        uuid: v.uuid,
      })),
    });

    const result = await create({
      variables,
    });

    console.dir(result, { depth: null });

    if (result.errors) {
      const formatedErrors = formatGraphQLFormattedError(result.errors);
      setErrorsMessages(formatedErrors);
    } else if (result.data?.createFatura.fatura_uuid) {
      form.reset();
      clearErrors();
      openDialog();
    }
  }

  return (
    <DashboardPageContainer>
      <DashBoardPageTitle className="pb-4">Nova fatura</DashBoardPageTitle>

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
                          <TableHead>Vencimento</TableHead>
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
                label="Salvar"
                loading={loading}
                loadingLabel="Salvando..."
                className="mt-4"
              />
            </div>
          </CustomForm>
        </CardContent>
      </Card>

      <CustomDialog
        control={control}
        to={navAdvogado.dashboard.advogado.toFatura({
          fatura_uuid: data?.createFatura.fatura_uuid || "",
        })}
        labelAction="Ir para registro"
      />
    </DashboardPageContainer>
  );
}
