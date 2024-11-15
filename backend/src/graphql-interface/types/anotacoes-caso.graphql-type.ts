import { GraphQLObjectType } from "graphql";
import { AdvogadoType } from "./advogado.graphql-type.js";
import { NonNullInt, NonNullString, String } from "./aliases.js";
import { advogadoCasoFieldResolver } from "../field-config/caso/advogado-caso.field-resolve.js";

export const AnotacoesCasoType = new GraphQLObjectType({
  name: "AnotacoesCaso",
  fields: {
    id: NonNullInt,
    uuid: NonNullString,
    criado_em: NonNullString,
    atualizado_em: String,
    titulo: NonNullString,
    descricao: String,
    caso_uuid: NonNullString,
    criado_por_advogado_uuid: NonNullString,
    advogado: {
      type: AdvogadoType,
      resolve: advogadoCasoFieldResolver,
    },
  },
});
