import { orgaoBaseSchema } from "@/domain/entities/orgao/orgao.schema";
import { z } from "zod";

export const formSchema = z.object({
  nome: orgaoBaseSchema.nome.min(3),
  tribunal: z.object({
    label: z.string(),
    value: z.string().uuid({
      message: "Campo obrigatório",
    }),
  }),
  municipio: z.object({
    label: z.string(),
    value: z.string().uuid({
      message: "Campo obrigatório",
    }),
  }),
});

export type CreateOrgaoFormValues = z.input<typeof formSchema>;
