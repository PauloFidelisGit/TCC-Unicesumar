import { GraphQLObjectType } from "graphql";
import { NonNullFloat, NonNullInt, NonNullString, String } from "./aliases.js";

export const FieldsRawParcelaFatura = {
  id: NonNullInt,
  uuid: NonNullString,
  criado_em: NonNullString,
  atualizado_em: String,
  fatura_uuid: NonNullString,
  numero: NonNullInt,
  valor: NonNullFloat,
  data_vencimento: NonNullString,
  data_pagamento: String,
};

export const ParcelaFaturaType = new GraphQLObjectType({
  name: "ParcelaFatura",
  fields: FieldsRawParcelaFatura,
});
