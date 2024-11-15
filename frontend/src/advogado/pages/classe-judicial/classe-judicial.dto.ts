import { QueryFindClasseJudicialDTO } from "./classe-judicial.queries";

export function mapQueryFindToForm(values?: QueryFindClasseJudicialDTO) {
  return {
    nome: values?.nome || "",
    codigo: values?.codigo || "",
  };
}
