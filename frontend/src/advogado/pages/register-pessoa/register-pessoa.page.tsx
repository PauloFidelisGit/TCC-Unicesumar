import {
  DashboardPageContainer,
  DashBoardPageTitle,
} from "@/advogado/dashboard/dashboard-page";
import { CustomUncontrolledSelect } from "@/components/custom-select";
import { Card, CardContent } from "@/components/shadcn/card";
import { SELECT_TIPO_PESSOA, TIPO_PESSOA } from "@/domain/enums/TIPO_PESSOA";
import { useState } from "react";
import { PessoaFisicaForm } from "./pessoa-fisica.form";
import { PessoaJuridicaForm } from "./pessoa-juridica.form";

export default function RegisterPessoaPage() {
  const [tipoPessoa, setTipoPessoa] = useState<string>(TIPO_PESSOA.PF);

  return (
    <DashboardPageContainer>
      <DashBoardPageTitle className="pb-4">Nova pessoa</DashBoardPageTitle>
      <div className="space-y-4">
        <Card className="max-w-96">
          <CardContent>
            <CustomUncontrolledSelect
              options={SELECT_TIPO_PESSOA}
              placeholder="Selecione o tipo de pessoa"
              label="Tipo de pessoa"
              value={tipoPessoa}
              onValueChange={setTipoPessoa}
              className="pt-4"
            />
          </CardContent>
        </Card>

        {tipoPessoa === TIPO_PESSOA.PF ? (
          <PessoaFisicaForm />
        ) : (
          <PessoaJuridicaForm />
        )}
      </div>
    </DashboardPageContainer>
  );
}
