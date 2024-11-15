import { enderecoBaseSchema } from "@/domain/entities/endereco/endereco.schema";
import { z } from "zod";

export const createEnderecoSchema = z
  .object({
    logradouro: enderecoBaseSchema.logradouro.or(z.literal("")),
    numero: enderecoBaseSchema.numero.or(z.literal("")),
    complemento: enderecoBaseSchema.complemento.or(z.literal("")),
    bairro: enderecoBaseSchema.bairro.or(z.literal("")),
    cidade: enderecoBaseSchema.cidade.or(z.literal("")),
    estado: enderecoBaseSchema.estado.or(z.literal("")),
    cep: enderecoBaseSchema.cep.or(z.literal("")),
  })
  .refine(
    (data) => {
      if (
        data.logradouro === "" &&
        data.numero === "" &&
        data.complemento === "" &&
        data.bairro === "" &&
        data.cidade === "" &&
        data.estado === "" &&
        data.cep === ""
      ) {
        return false;
      }
			return true
    },
    {
			message: "Preencha ao menos um campo",
      path: [""],
    },
  );
export type CreateEnderecoFormValues = z.input<typeof createEnderecoSchema>;

export const updateEnderecoSchema = z.object({
  logradouro: enderecoBaseSchema.logradouro.or(z.literal("")),
  numero: enderecoBaseSchema.numero.or(z.literal("")),
  complemento: enderecoBaseSchema.complemento.or(z.literal("")),
  bairro: enderecoBaseSchema.bairro.or(z.literal("")),
  cidade: enderecoBaseSchema.cidade.or(z.literal("")),
  estado: enderecoBaseSchema.estado.or(z.literal("")),
  cep: enderecoBaseSchema.cep.or(z.literal("")),
});
export type UpdateEnderecoFormValues = z.input<typeof updateEnderecoSchema>;
