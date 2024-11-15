import {
  GraphQLFieldConfig,
  GraphQLFieldConfigMap,
  GraphQLList,
  GraphQLObjectType,
  ThunkObjMap,
} from "graphql";
import { ordemServicoFieldResolver } from "../field-config/fatura/ordem-servico.field-resolver.js";
import { parcelasFaturaFieldResolver } from "../field-config/fatura/parcelas-fatura.field-resolver.js";
import { NonNullFloat, NonNullInt, NonNullString, String } from "./aliases.js";
import { OrdemServicoType } from "./ordem-servico.graphql-type.js";
import { ParcelaFaturaType } from "./parcela-fatura.graphql-type.js";

export const FieldsRawFatura: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
  id: NonNullInt,
  uuid: NonNullString,
  criado_em: NonNullString,
  atualizado_em: String,
  valor_total: NonNullFloat,
  data_emissao: NonNullString,
  status_fatura: NonNullString,
  observacoes: String,
  criado_por_advogado_uuid: NonNullString,
  parcelas: {
    type: new GraphQLList(ParcelaFaturaType),
    resolve: parcelasFaturaFieldResolver,
  },
  ordens_servico: {
    type: new GraphQLList(OrdemServicoType),
    resolve: ordemServicoFieldResolver,
  },
};

export const FaturaType = new GraphQLObjectType({
  name: "Fatura",
  fields: (): GraphQLFieldConfigMap<any, any> => ({
    id: NonNullInt,
    uuid: NonNullString,
    criado_em: NonNullString,
    atualizado_em: String,
    valor_total: NonNullFloat,
    data_emissao: NonNullString,
    status_fatura: NonNullString,
    observacoes: String,
    criado_por_advogado_uuid: NonNullString,
    parcelas: {
      type: new GraphQLList(ParcelaFaturaType),
      resolve: parcelasFaturaFieldResolver,
    },
    ordens_servico: {
      type: new GraphQLList(OrdemServicoType),
      resolve: ordemServicoFieldResolver,
    },
  }),
});
