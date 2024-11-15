import { navAdmin } from "@/admin/routes/nav";
import { AuthProviderAdvogadoLocationTypes } from "@/advogado/context/auth-context/auth.provider";
import { navAdvogado } from "@/advogado/routes/nav";
import { CustomButton } from "@/components/custom-buttons";
import { CustomForm } from "@/components/custom-form";
import { ControlledInputText } from "@/components/custom-input";
import { CustomUncontrolledSelect } from "@/components/custom-select";
import { Card, CardContent, CardHeader } from "@/components/shadcn/card";
import { Heading } from "@/components/typography";
import { LOCAL_STORAGE_TOKENS } from "@/domain/enums/TOKENS";
import { handleLocalStorage } from "@/lib/handle-local-storage";
import { formatApolloError } from "@/lib/utils";
import { useLazyQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/logo.svg";
import { QUERY_LOGIN_ADMIN, QUERY_LOGIN_ADVOGADO } from "./login.queries";
import { LoginFormValues, formSchema } from "./login.schemas";

export default function LoginPage() {
  handleLocalStorage.removeAllItems([
    LOCAL_STORAGE_TOKENS.ADVOGADO_UUID,
    LOCAL_STORAGE_TOKENS.ADMIN_UUID,
    LOCAL_STORAGE_TOKENS.AUTH,
  ]);

  const [userType, setUserType] = useState<"advogado" | "admin">("advogado");
  const navigate = useNavigate();

  const admin = {
    login: "admin",
    senha: "12345678",
  };
  const advogado = {
    login: "advogado",
    senha: "12345678",
  };

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    values: userType === "advogado" ? advogado : admin,
  });

  const [loginAdvogado, requestOptionsAdvogado] = useLazyQuery(
    QUERY_LOGIN_ADVOGADO,
    {
      errorPolicy: "none", // BUG Solução temporária em razão de <https://github.com/apollographql/apollo-client/issues/12097>
    },
  );

  const [loginAdmin, requestOptionsAdmin] = useLazyQuery(QUERY_LOGIN_ADMIN);

  const loading = requestOptionsAdvogado.loading || requestOptionsAdmin.loading;

  async function onSubmit(values: LoginFormValues) {
    const login = userType === "advogado" ? loginAdvogado : loginAdmin;

    const result = await login({
      variables: {
        login: values.login,
        senha: values.senha,
      },
    });

    if (result.error) {
      const formatedErrors = formatApolloError(result.error);
      formatedErrors.forEach((error) => {
        toast.error(error.message);
      });
    } else if (
      result.data &&
      "loginAdvogado" in result.data &&
      result.data.loginAdvogado?.token
    ) {
      await handleLocalStorage.setAllItems([
        [LOCAL_STORAGE_TOKENS.ADVOGADO_UUID, result.data.loginAdvogado.uuid],
        [
          LOCAL_STORAGE_TOKENS.AUTH,
          result.data.loginAdvogado.token,
          { encrypt: false },
        ],
      ]);
      form.reset();
      toast.success("Login efetuado com sucesso!");
      const state: AuthProviderAdvogadoLocationTypes = {
        kind: "advogado",
        advogado_uuid: result.data.loginAdvogado.uuid,
      };
      navigate(navAdvogado.dashboard.advogado.index, { state });
    } else if (
      result.data &&
      "loginAdmin" in result.data &&
      result.data.loginAdmin?.token
    ) {
      await handleLocalStorage.setAllItems([
        [LOCAL_STORAGE_TOKENS.ADMIN_UUID, result.data.loginAdmin.uuid],
        [
          LOCAL_STORAGE_TOKENS.AUTH,
          result.data.loginAdmin.token,
          { encrypt: false },
        ],
      ]);
      form.reset();
      toast.success("Login efetuado com sucesso!");
      const state = {
        kind: "admin",
        advogado_uuid: result.data.loginAdmin.uuid,
      };
      navigate(navAdmin.dashboard.admin.index, { state });
    }
  }

  return (
    <div className="grid place-content-center">
      <img src={logo} className="m-auto px-2 py-8" />
      <Card className="mx-4 max-w-96 md:m-auto md:min-w-96">
        <CardHeader>
          <Heading as="h1" className="text-center">
            Entrar
          </Heading>
        </CardHeader>
        <CardContent>
          <CustomForm
            methods={form}
            onSubmit={onSubmit}
            className="flex flex-col gap-2 bg-white"
          >
            <CustomUncontrolledSelect
              onValueChange={(value) => setUserType(value as any)}
              value={userType}
              name="tipo"
              label="Tipo"
              options={[
                { label: "Advogado", value: "advogado" },
                { label: "Admin", value: "admin" },
              ]}
              required
            />
            <ControlledInputText name="login" label="Login" required />
            <ControlledInputText
              type="password"
              name="senha"
              label="Senha"
              required
            />
            <CustomButton
              type="submit"
              label="Entrar"
              loading={loading}
              loadingLabel="Entrando..."
              className="m-auto mt-4"
            />
          </CustomForm>
        </CardContent>
      </Card>
    </div>
  );
}
