import {
  DashboardPageContainer,
  DashBoardPageTitle,
} from "@/admin/dashboard/dashboard-page";
import { nav } from "@/admin/routes/nav";
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
import { Button } from "@/components/shadcn/button";
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
import { ESTADO_CIVIL, SELECT_ESTADO_CIVIL, SELECT_UF } from "@/domain/enums";
import { useListErrors } from "@/hooks/use-list-error";
import {
  formatCellPhoneFromInputValue,
  formatCPF,
  formatCpfFromInputValue,
  formatGraphQLFormattedError,
} from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { fakerPT_BR } from "@faker-js/faker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { mapCreateFormToApi } from "./register-advogado.dto";
import { MUTATION_CREATE_ADVOGADO } from "./register-advogado.queries";
import {
  CreateAdvogadoFormValues,
  createAdvogadoSchema,
} from "./register-advogado.schema";

const values = {
  senha: "12345678",
  telefones: Array.from({ length: 0 }, () => ({
    value: fakerPT_BR.string.numeric(11),
  })),
  nome: fakerPT_BR.person.fullName(),
  data_nascimento: fakerPT_BR.date.birthdate().toISOString().slice(0, 10),
  nacionalidade: fakerPT_BR.helpers.arrayElement(["Brasileiro", "Estrangeiro"]),
  estado_civil: fakerPT_BR.helpers.enumValue(ESTADO_CIVIL),
  cpf: formatCPF(fakerPT_BR.string.numeric(11)),
  oab: Array.from({ length: 1 }, () => ({
    numero: fakerPT_BR.string.numeric(6),
    uf: fakerPT_BR.helpers.arrayElement(SELECT_UF.map((uf) => uf.value)),
    letra: fakerPT_BR.string.alpha(1).toUpperCase(),
  })),
  emails: Array.from({ length: 1 }, () => ({
    value: fakerPT_BR.internet.email(),
  })),
  login: fakerPT_BR.internet.userName(),
};

// const defaultValues: CreateAdvogadoFormValues = {
//   cpf: "",
//   data_nascimento: "",
//   emails: [],
//   estado_civil: "",
//   nacionalidade: "",
//   nome: "",
//   oab: [],
//   senha: "",
//   telefones: [],
// };

export default function RegisterAdvogadoPage() {
  const form = useForm<CreateAdvogadoFormValues>({
    resolver: zodResolver(createAdvogadoSchema),
    //defaultValues,
    values: values,
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

  const [create, { loading, data }] = useMutation(MUTATION_CREATE_ADVOGADO);

  const advogado = data?.createAdvogado;

  const { ListErrorsComponent, clearErrors, setErrorsMessages } =
    useListErrors();

  const { openDialog, control } = useDialog();

  async function onSubmit(data: CreateAdvogadoFormValues) {
    const result = await create({
      variables: mapCreateFormToApi(data),
    });

    if (result.errors) {
      const formatedErrors = formatGraphQLFormattedError(result.errors);
      setErrorsMessages(formatedErrors);
    } else if (result.data?.createAdvogado.uuid) {
      form.reset();
      clearErrors();
      openDialog();
    }
  }

  return (
    <DashboardPageContainer>
      <DashBoardPageTitle className="pb-4">Novo advogado</DashBoardPageTitle>

      <Card className="max-w-96">
        <CardContent>
          <CustomForm
            methods={form}
            onSubmit={onSubmit}
            className="flex flex-col gap-2 bg-white pt-4"
          >
            <ListErrorsComponent />
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
            <ControlledInputText
              name="senha"
              label="Senha"
              type="password"
              required
              description="A senha deve conter no mínimo 8 caracteres"
            />
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
                label="Adicionar OAB"
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
            <div className="flex items-center gap-2">
              <CustomButton
                type="submit"
                label="Salvar"
                loading={loading}
                loadingLabel="Salvando..."
                className="m-auto mt-4"
              />
            </div>
          </CustomForm>
        </CardContent>
      </Card>

      <CustomDialog
        control={control}
        to={nav.dashboard.admin.toAdvogado({
          advogado_uuid: advogado?.uuid || "",
        })}
        labelAction="Ir para registro"
      />
    </DashboardPageContainer>
  );
}
