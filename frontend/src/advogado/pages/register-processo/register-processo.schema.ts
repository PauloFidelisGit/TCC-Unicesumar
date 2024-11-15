import { processoBaseSchema } from "@/domain/entities/processo/processo.schema";
import { z } from "zod";

const selectNav = z.object({
  value: z
    .string()
    .uuid({
      message: "O campo é obrigatório",
    })
    .or(z.literal("")),
  label: z.string(),
});

export const formSchema = z.object({
  numero: processoBaseSchema.numero,
  data_autuacao: processoBaseSchema.data_autuacao.or(z.literal("")),
  valor_causa: processoBaseSchema.valor_causa,
  segredo_justica: processoBaseSchema.segredo_justica,
  tutela_urgencia: processoBaseSchema.tutela_urgencia,
  orgao: selectNav,
  classe_judicial: selectNav,
});
export type FormSchema = z.input<typeof formSchema>;
