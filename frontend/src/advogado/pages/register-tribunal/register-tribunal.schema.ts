import { classeJudicialBaseSchema } from "@/domain/entities/classe-judicial/classe-judicial.schema";
import { z } from "zod";

export const formSchema = z.object({
  nome: classeJudicialBaseSchema.nome.min(3),
});
export type FormValues = z.input<typeof formSchema>;
