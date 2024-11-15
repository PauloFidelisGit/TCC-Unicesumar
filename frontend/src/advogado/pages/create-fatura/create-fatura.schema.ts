import { x } from "@/lib/custom-zod";
import { z } from "zod";

export const formSchema = z.object({
  total_value_os: x.string(),
  total_value_fatura: x.string(),
  data_emissao: x.string(),
  observacoes: x.string(),
  ordens_servico: z.array(
    z.object({
      uuid: x.uuid(),
      numero: x.string(),
      valor_servico: x.string(),
    }),
  ),
  parcelas: z.array(
    z.object({
      numero: x.string(),
      valor: x.string(),
      data_vencimento: x.string(),
    }),
  ),
  numero_parcelas: x.string(),
  first_due_date: x.string(),
});
export type FormValues = z.input<typeof formSchema>;
