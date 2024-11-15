import { CustomButton } from "@/components/custom-buttons";
import { ControlledInputDate } from "@/components/custom-date";
import { CustomForm } from "@/components/custom-form";
import { ControlledInputText, InputText } from "@/components/custom-input";
import { ControlledInputSelect } from "@/components/custom-select";
import {
  IconBaselineAddCircleOutline,
  IconBaselineDeleteOutline,
} from "@/components/icons";
import { Button } from "@/components/shadcn/button";
import { Card, CardContent } from "@/components/shadcn/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { SELECT_ESTADO_CIVIL, SELECT_UF } from "@/domain/enums";
import { useListErrors } from "@/hooks/use-list-error";
import {
  formatCellPhoneFromInputValue,
  formatCpfFromInputValue,
  formatGraphQLFormattedError,
} from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useFieldArray, useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { mapEditAdvogadoToApi } from "../advogado.dto";
import { AdvogadoPageOutletContext } from "../advogado.page";
import { MUTATION_UPDATE_ADVOGADO } from "../advogado.queries";
import {
  UpdateAdvogadoFormValues,
  updateAdvogadoSchema,
} from "../advogado.schema";

export default function AdvogadoIndexPage() {
  const { advogado_uuid, advogado, setAdvogado, advogado_raw } =
    useOutletContext<AdvogadoPageOutletContext>();

  const form = useForm<UpdateAdvogadoFormValues>({
    resolver: zodResolver(updateAdvogadoSchema),
    values: advogado,
  });

  const emailsFieldArray = useFieldArray({
    control: form.control,
    name: "emails",
  });
  function appendEmail() {
    emailsFieldArray.append({ value: "" });
  }
  function removeEmail(index: number) {
    emailsFieldArray.remove(index);
  }

  const telefonesFieldArray = useFieldArray({
    control: form.control,
    name: "telefones",
  });
  function appendTelefone() {
    telefonesFieldArray.append({ value: "" });
  }
  function removeTelefone(index: number) {
    telefonesFieldArray.remove(index);
  }

  const oabFieldArray = useFieldArray({
    control: form.control,
    name: "oab",
  });
  function appendOab() {
    oabFieldArray.append({ letra: "", numero: "", uf: "" });
  }
  function removeOab(index: number) {
    oabFieldArray.remove(index);
  }

  const [update, updateRequest] = useMutation(MUTATION_UPDATE_ADVOGADO);

  const { ListErrorsComponent, clearErrors, setErrorsMessages } =
    useListErrors();

  async function onSubmit(data: UpdateAdvogadoFormValues) {
    const result = await update({
      variables: mapEditAdvogadoToApi(advogado_uuid!, data),
    });
    if (result.errors) {
      const formatedErrors = formatGraphQLFormattedError(result.errors);
      setErrorsMessages(formatedErrors);
    } else if (result.data?.updateAdvogado) {
      clearErrors();
      setAdvogado(form.getValues());
      toast.success("Advogado atualizado com sucesso!");
    }
  }

  return (
    <Card className="max-w-96 flex-1">
      <CardContent>
        <ListErrorsComponent />
        <div className="flex flex-col gap-4">
          <CustomForm
            methods={form}
            onSubmit={onSubmit}
            className="flex max-w-96 flex-col gap-2 pt-4"
          >
            <InputText value={advogado_raw.login} label="Login" readOnly />
            <ControlledInputText name="nome" label="Nome" required />
            <div className="grid grid-cols-2 gap-2">
              <ControlledInputText
                name="cpf"
                label="CPF"
                onChange={formatCpfFromInputValue}
              />
              <ControlledInputDate
                name="data_nascimento"
                label="Data de nascimento"
              />
            </div>
            <ControlledInputSelect
              name="estado_civil"
              placeholder="Selecione um valor"
              label="Estado civil"
              options={SELECT_ESTADO_CIVIL}
            />
            <ControlledInputText name="nacionalidade" label="Nacionalidade" />
            <div className="flex flex-col gap-2">
              <Label>E-mails</Label>
              <CustomButton
                variant="outline"
                className="w-fit gap-2"
                type="button"
                onClick={appendEmail}
                disabled={emailsFieldArray.fields.length >= 5}
                label="Adicionar e-mail"
                icon={IconBaselineAddCircleOutline}
              />
              {emailsFieldArray.fields.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>E-mail</TableHead>
                      <TableHead className="text-center">Excluir</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {emailsFieldArray.fields.map((_, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>
                            <ControlledInputText
                              name={`emails.${index}.value`}
                            />
                          </TableCell>
                          <TableCell className="grid">
                            <CustomButton
                              icon={IconBaselineDeleteOutline}
                              onClick={() => removeEmail(index)}
                              variant="ghost"
                              iconSize={25}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Telefones</Label>
              <CustomButton
                variant="outline"
                className="w-fit gap-2"
                type="button"
                onClick={appendTelefone}
                disabled={telefonesFieldArray.fields.length >= 5}
                label="Adicionar telefones"
                icon={IconBaselineAddCircleOutline}
              />
              {telefonesFieldArray.fields.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Telefones</TableHead>
                      <TableHead className="text-center">Excluir</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {telefonesFieldArray.fields.map((_, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>
                            <ControlledInputText
                              name={`telefones.${index}.value`}
                              type="tel"
                              onChange={formatCellPhoneFromInputValue}
                            />
                          </TableCell>
                          <TableCell>
                            <CustomButton
                              icon={IconBaselineDeleteOutline}
                              onClick={() => removeTelefone(index)}
                              variant="ghost"
                              iconSize={25}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>OAB</Label>
              <CustomButton
                variant="outline"
                className="w-fit gap-2"
                type="button"
                onClick={appendOab}
                disabled={oabFieldArray.fields.length >= 5}
                label="Adicionar oab"
                icon={IconBaselineAddCircleOutline}
              />
              {oabFieldArray.fields.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>OAB</TableHead>
                      <TableHead className="text-center">Excluir</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {oabFieldArray.fields.map((_, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="grid grid-cols-1 items-center gap-2">
                              <div className="w-50">
                                <ControlledInputSelect
                                  label="UF"
                                  name={`oab.${index}.uf`}
                                  options={SELECT_UF}
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-[2fr_1fr] items-center gap-2">
                                <ControlledInputText
                                  name={`oab.${index}.numero`}
                                  label="Número"
                                />
                                <ControlledInputText
                                  name={`oab.${index}.letra`}
                                  label="Letra"
                                  onChange={(e) => {
                                    e.onChange(e.value.toUpperCase());
                                  }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="link">
                              <IconBaselineDeleteOutline
                                onClick={() => removeOab(index)}
                              />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </div>
            <CustomButton
              type="submit"
              label="Atualizar"
              loadingLabel="Atualizando..."
              loading={updateRequest.loading}
              className="m-auto mt-2"
            />
          </CustomForm>
        </div>
      </CardContent>
    </Card>
  );
}
