import { municipioBaseSchema } from "@/domain/entities/municipio/municipio.schema";
import { z } from "zod";

export const editMunicipioSchema = z.object({
  nome: municipioBaseSchema.nome.min(1),
});
export type EditMunicipioFormValues = z.input<typeof editMunicipioSchema>;
