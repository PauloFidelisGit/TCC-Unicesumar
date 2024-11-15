import { navAdvogado } from "@/advogado/routes/nav";
import { CustomButton } from "@/components/custom-buttons";
import { ControlledInputDate } from "@/components/custom-date";
import { CustomDialog, useDialog } from "@/components/custom-dialog";
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
import { ESTADO_CIVIL, SELECT_ESTADO_CIVIL } from "@/domain/enums";
import { useListErrors } from "@/hooks/use-list-error";
import {
	formatCellPhoneFromInputValue,
  formatCpfFromInputValue,
  formatGraphQLFormattedError,
} from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { mapCreatePessoaFisicaToApi } from "./register-pessoa.dto";
import { MUTATION_CREATE_PESSOA } from "./register-pessoa.queries";
import {
  CreatePessoaFisicaFormValues,
  createPessoaFisicaSchema,
} from "./register-pessoa.schema";

// const values = {
//   nome: fakerPT_BR.person.fullName(),
//   data_nascimento: fakerPT_BR.date.birthdate().toISOString().slice(0, 10),
//   nacionalidade: fakerPT_BR.helpers.arrayElement(["Brasileiro", "Estrangeiro"]),
//   profissao: fakerPT_BR.helpers.arrayElement(["Advogado", "Estudante"]),
//   telefones: Array.from({ length: 0 }, () => ({
//     value: fakerPT_BR.string.numeric(11),
//   })),
//   estado_civil: fakerPT_BR.helpers.enumValue(ESTADO_CIVIL),
//   cpf: formatCPF(fakerPT_BR.string.numeric(11)),
//   emails: Array.from({ length: 0 }, () => ({
//     value: fakerPT_BR.internet.email(),
//   })),
// };

export function PessoaFisicaForm() {
  const form = useForm<CreatePessoaFisicaFormValues>({
    resolver: zodResolver(createPessoaFisicaSchema),
    defaultValues: {
      nome: "",
      data_nascimento: "",
      nacionalidade: "",
      profissao: "",
      estado_civil: ESTADO_CIVIL.SOLTEIRO,
      cpf: "",
      emails: [],
      telefones: [],
    },
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

  const [create, { loading, data }] = useMutation(MUTATION_CREATE_PESSOA);

  const pessoa = data?.createPessoa;

  const { ListErrorsComponent, clearErrors, setErrorsMessages } =
    useListErrors();

  const { openDialog, control } = useDialog();

  async function onSubmit(data: CreatePessoaFisicaFormValues) {
    const result = await create({
      variables: mapCreatePessoaFisicaToApi(data),
    });

    if (result.errors) {
      const formatedErrors = formatGraphQLFormattedError(result.errors);
      setErrorsMessages(formatedErrors);
    } else if (result.data?.createPessoa.uuid) {
      form.reset();
      clearErrors();
      openDialog();
    }
  }

  return (
    <div>
      <Card className="max-w-96">
        <CardContent>
          <ListErrorsComponent />
          <CustomForm
            methods={form}
            onSubmit={onSubmit}
            className="flex flex-col gap-2 bg-white pt-4"
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
                label="Adicionar e-mail"
                type="button"
                variant="outline"
                className="w-fit gap-2"
                onClick={appendEmail}
                disabled={emailsFieldArray.fields.length >= 5}
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
                label="Adicionar telefones"
                type="button"
                variant="outline"
                className="w-fit gap-2"
                onClick={appendTelefone}
                disabled={telefonesFieldArray.fields.length >= 5}
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
															onChange={formatCellPhoneFromInputValue}
                            />
                          </TableCell>
                          <TableCell className="grid">
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
        to={navAdvogado.dashboard.advogado.toPessoa({
          pessoa_uuid: pessoa?.uuid || "",
        })}
        labelAction="Ir para registro"
      />
    </div>
  );
}
