import { CustomButton } from "@/components/custom-buttons";
import { CustomForm } from "@/components/custom-form";
import { ControlledInputText } from "@/components/custom-input";
import {
  IconBaselineAddCircleOutline,
  IconBaselineDeleteOutline,
} from "@/components/icons";
import { Label } from "@/components/shadcn/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { useListErrors } from "@/hooks/use-list-error";
import {
  formatCellPhoneFromInputValue,
  formatCnpjFromInputValue,
  formatGraphQLFormattedError,
} from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import {
  mapQueryFindPessoaJuridicaToForm,
  mapUpdatePessoaJuridicaToApi,
} from "../pessoa.dto";
import { PessoaPageOutletContext } from "../pessoa.page";
import { MUTATION_UPDATE_PESSOA, QueryFindPessoaPJ } from "../pessoa.queries";
import {
  EditPessoaJuridicaFormValues,
  editPessoaJuridicaSchema,
} from "../pessoa.schema";

export function IndexPessoaJuridicaPage() {
  const { pessoa_uuid, pessoaRaw } =
    useOutletContext<PessoaPageOutletContext<QueryFindPessoaPJ>>();

  const [pessoa, setPessoa] = useState(
    mapQueryFindPessoaJuridicaToForm(pessoaRaw as QueryFindPessoaPJ),
  );

  const form = useForm<EditPessoaJuridicaFormValues>({
    resolver: zodResolver(editPessoaJuridicaSchema),
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

  async function onSubmit(data: EditPessoaJuridicaFormValues) {
    const result = await update({
      variables: mapUpdatePessoaJuridicaToApi(pessoa_uuid, data),
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
    <div>
      <ListErrorsComponent />
      <CustomForm
        methods={form}
        onSubmit={onSubmit}
        className="flex max-w-96 flex-col gap-2 pt-4"
      >
        <ControlledInputText
          name="nome_fantasia"
          label="Nome fantasia"
          required
        />
        <ControlledInputText
          name="razao_social"
          label="Razão social"
          required
        />
        <div className="grid grid-cols-2 gap-2">
          <ControlledInputText
            name="cnpj"
            label="CNPJ"
            onChange={formatCnpjFromInputValue}
          />
        </div>
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
                      <CustomButton
                        icon={IconBaselineDeleteOutline}
                        onClick={() => removeTelefone(index)}
                        variant="ghost"
                        iconSize={25}
                      />
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
    </div>
  );
}
