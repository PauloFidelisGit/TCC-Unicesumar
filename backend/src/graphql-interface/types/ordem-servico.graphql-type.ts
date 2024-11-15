import { GraphQLFieldConfigMap, GraphQLObjectType } from "graphql";
import { advogadoOrdemServicoFieldResolver } from "../field-config/ordem-servico/advogado-ordem-servico.field-resolver.js";
import { casoOrdemServicoFieldResolver } from "../field-config/ordem-servico/caso-ordem-servico.field-resolver.js";
import { faturaOrdemServicoFieldResolver } from "../field-config/ordem-servico/fatura-ordem-servico.field-resolver.js";
import { processoOrdemServicoFieldResolver } from "../field-config/ordem-servico/processo-ordem-servico.field-resolver.js";
import { servicoOrdemServicoFieldResolver } from "../field-config/ordem-servico/servico-ordem-servico.field-resolver.js";
import { AdvogadoType } from "./advogado.graphql-type.js";
import { NonNullFloat, NonNullInt, NonNullString, String } from "./aliases.js";
import { CasoType } from "./caso.graphql-type.js";
import { FaturaType } from "./fatura.graphql-type.js";
import { ProcessoType } from "./processo.graphql-type.js";
import { ServicoType } from "./servico.graphql-type.js";

export const OrdemServicoType = new GraphQLObjectType({
  name: "OrdemServico",
  fields: (): GraphQLFieldConfigMap<any, any> => ({
    id: NonNullInt,
    uuid: NonNullString,
    criado_em: NonNullString,
    atualizado_em: String,
    numero: NonNullInt,
    titulo: String,
    descricao: String,
    data_abertura: NonNullString,
    data_conclusao: String,
    data_cancelamento: String,
    prazo_conclusao: String,
    status: String,
    prioridade: String,
    valor_servico: NonNullFloat,
    criado_por_advogado_uuid: NonNullString,
    advogado: {
      type: AdvogadoType,
      resolve: advogadoOrdemServicoFieldResolver,
    },
    servico_uuid: NonNullString,
    servico: {
      type: ServicoType,
      resolve: servicoOrdemServicoFieldResolver,
    },
    fatura_uuid: String,
    fatura: {
      type: FaturaType,
      resolve: faturaOrdemServicoFieldResolver,
    },
    processo_uuid: String,
    processo: {
      type: ProcessoType,
      resolve: processoOrdemServicoFieldResolver,
    },
    caso_uuid: String,
    caso: {
      type: CasoType,
      resolve: casoOrdemServicoFieldResolver,
    },
  }),
});
