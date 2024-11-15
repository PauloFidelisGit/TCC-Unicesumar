import { TIPO_PESSOA } from "@/domain/enums";
import { useOutletContext } from "react-router-dom";
import { IndexPessoaFisicaPage } from "./index/index-pessoa-fisica.page";
import { IndexPessoaJuridicaPage } from "./index/index-pessoa-juridica.page";
import { PessoaPageOutletContext } from "./pessoa.page";

export default function SelectIndexPessoaPage() {
  const { pessoaRaw } = useOutletContext<PessoaPageOutletContext<any>>();

  return pessoaRaw.tipo_pessoa === TIPO_PESSOA.PF ? (
    <IndexPessoaFisicaPage />
  ) : (
    <IndexPessoaJuridicaPage />
  );
}
