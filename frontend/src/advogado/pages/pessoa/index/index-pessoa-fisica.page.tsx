import { CustomButton } from "@/components/custom-buttons";
import { ControlledInputDate } from "@/components/custom-date";
import { CustomForm } from "@/components/custom-form";
import { ControlledInputText } from "@/components/custom-input";
import { ControlledInputSelect } from "@/components/custom-select";
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
import { SELECT_ESTADO_CIVIL } from "@/domain/enums";
import { useListErrors } from "@/hooks/use-list-error";
import {
  formatCellPhoneFromInputValue,
  formatCpfFromInputValue,
  formatGraphQLFormattedError,
} from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import {
  mapQueryFindPessoaFisicaToForm,
  mapUpdatePessoaFisicaToApi,
} from "../pessoa.dto";
import { PessoaPageOutletContext } from "../pessoa.page";
import { MUTATION_UPDATE_PESSOA, QueryFindPessoaPF } from "../pessoa.queries";
import {
  EditPessoaFisicaFormValues,
  editPessoaFisicaSchema,
} from "../pessoa.schema";

export function IndexPessoaFisicaPage() {
  const { pessoa_uuid, pessoaRaw } =
    useOutletContext<PessoaPageOutletContext<QueryFindPessoaPF>>();

  const [pessoa, setPessoa] = useState(
    mapQueryFindPessoaFisicaToForm(pessoaRaw as QueryFindPessoaPF),
  );

  const form = useForm<EditPessoaFisicaFormValues>({
    resolver: zodResolver(editPessoaFisicaSchema),
    values: pessoa,
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

  const [update, { loading }] = useMutation(MUTATION_UPDATE_PESSOA);

  const { ListErrorsComponent, clearErrors, setErrorsMessages } =
    useListErrors();

  async function onSubmit(data: EditPessoaFisicaFormValues) {
    const result = await update({
      variables: mapUpdatePessoaFisicaToApi(pessoa_uuid, data),
    });

    if (result.errors) {
      const formatedErrors = formatGraphQLFormattedError(result.errors);
      setErrorsMessages(formatedErrors);
    } else if (result.data?.updatePessoa) {
      clearErrors();
      setPessoa(form.getValues());
      toast.success("Pessoa atualizada com sucesso!");
    }
  }

  return (
    <Card className="mt-4 max-w-96">
      <CardContent>
        <ListErrorsComponent />
        <CustomForm
          methods={form}
          onSubmit={onSubmit}
          className="flex max-w-96 flex-col gap-2 pt-4"
        >
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
                          <ControlledInputText name={`emails.${index}.value`} />
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
          <div className="flex items-center gap-2">
            <CustomButton
              type="submit"
              label="Atualizar"
              loadingLabel="Atualizando..."
              loading={loading}
              className="m-auto mt-2"
            />
          </div>
        </CustomForm>
      </CardContent>
    </Card>
  );
}
