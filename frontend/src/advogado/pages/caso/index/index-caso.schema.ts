import { casoBaseSchema } from "@/domain/entities/caso/caso.schema";
import { zodSharedRefine } from "@/lib/zod-shared-refine";
import { z } from "zod";

export const formSchema = z
  .object({
    titulo: casoBaseSchema.titulo.min(1),
    descricao: casoBaseSchema.descricao,
    data_abertura: casoBaseSchema.data_abertura
      .min(1)
      .refine(zodSharedRefine.dateNoOlderThan1790, {
        message: "Data de abertura não pode ser anterior a 1970",
      }),
    data_encerramento: casoBaseSchema.data_encerramento
      .or(z.literal(""))
      .refine(zodSharedRefine.dateNoOlderThan1790, {
        message: "Data de encerramento não pode ser anterior a 1970",
      }),
  })
  .refine(
    (data) => {
      if (data.data_encerramento) {
        const abertura = new Date(data.data_abertura);
        const encerramento = new Date(data.data_encerramento);
        return encerramento >= abertura;
      }
      return true;
    },
    {
      message:
        "Data de encerramento deve ser igual ou posterior a data de abertura",
      path: ["data_encerramento"],
    },
  );
export type FormValues = z.input<typeof formSchema>;
