import { casoBaseSchema } from "@/domain/entities/caso/caso.schema";
import { z } from "zod";

export const formSchema = z.object({
  titulo: casoBaseSchema.titulo,
  descricao: casoBaseSchema.descricao,
  data_abertura: casoBaseSchema.data_abertura.min(1),
  data_encerramento: casoBaseSchema.data_encerramento.or(z.literal("")),
});
export type FormValues = z.input<typeof formSchema>;
