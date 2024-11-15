import { GraphQLObjectType } from "graphql";
import { AdvogadoType } from "./advogado.graphql-type.js";
import { NonNullInt, NonNullString, String } from "./aliases.js";
import { advogadoAnotacoesProcessoFieldResolver } from "../field-config/processo/advogado-anotacoes-processo.field-resolver.js";

export const AnotacoesProcessoType = new GraphQLObjectType({
  name: "AnotacoesProcesso",
  fields: {
    id: NonNullInt,
    uuid: NonNullString,
    criado_em: NonNullString,
    atualizado_em: String,
    titulo: NonNullString,
    descricao: String,
    processo_uuid: NonNullString,
    criado_por_advogado_uuid: NonNullString,
    advogado: {
      type: AdvogadoType,
      resolve: advogadoAnotacoesProcessoFieldResolver,
    },
  },
});
