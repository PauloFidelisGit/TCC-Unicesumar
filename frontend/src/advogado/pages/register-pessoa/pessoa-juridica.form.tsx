import { navAdvogado } from "@/advogado/routes/nav";
import { CustomButton } from "@/components/custom-buttons";
import { CustomDialog, useDialog } from "@/components/custom-dialog";
import { CustomForm } from "@/components/custom-form";
import { ControlledInputText } from "@/components/custom-input";
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
import { useListErrors } from "@/hooks/use-list-error";
import {
  formatCellPhoneFromInputValue,
  formatCnpjFromInputValue,
  formatGraphQLFormattedError,
} from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { mapCreatePessoaJuridicaToApi } from "./register-pessoa.dto";
import { MUTATION_CREATE_PESSOA } from "./register-pessoa.queries";
import {
  CreatePessoaJuridicaFormValues,
  createPessoaJuridicaSchema,
} from "./register-pessoa.schema";

// const fakeValues = {
//   telefones: Array.from({ length: 0 }, () => ({
//     value: fakerPT_BR.string.numeric(11),
//   })),
//   estado_civil: fakerPT_BR.helpers.enumValue(ESTADO_CIVIL),
//   cnpj: formatCNPJ(fakerPT_BR.string.numeric(14)),
//   emails: Array.from({ length: 0 }, () => ({
//     value: fakerPT_BR.internet.email(),
//   })),
//   nome_fantasia: fakerPT_BR.company.name(),
//   razao_social: fakerPT_BR.company.name(),
// };

export function PessoaJuridicaForm() {
  const form = useForm<CreatePessoaJuridicaFormValues>({
    resolver: zodResolver(createPessoaJuridicaSchema),
    defaultValues: {
      cnpj: "",
      emails: [],
      telefones: [],
      nome_fantasia: "",
      razao_social: "",
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

  async function onSubmit(data: CreatePessoaJuridicaFormValues) {
    const result = await create({
      variables: mapCreatePessoaJuridicaToApi(data),
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
