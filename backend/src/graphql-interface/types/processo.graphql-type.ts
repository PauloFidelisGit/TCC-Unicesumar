import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
} from "graphql";
import { advogadoProcessoFieldResolver } from "../field-config/processo/advogado-processo.field-resolver.js";
import { classeJudicialProcessoFieldResolver } from "../field-config/processo/classe-judicial-processo.field-resolver.js";
import { orgaoProcessoFieldResolver } from "../field-config/processo/orgao-processo.field-resolver.js";
import { polosProcessoFieldResolver } from "../field-config/processo/polos-processo.field-resolver.js";
import { AdvogadoType } from "./advogado.graphql-type.js";
import { NonNullInt, NonNullString, String } from "./aliases.js";
import { ClasseJudicialType } from "./classe-judicial.graphql-type.js";
import { OrgaoType } from "./orgao.graphql-type.js";
import { PessoaType } from "./pessoa.graphql-type.js";
import { RawFieldsRelacionamentoProcessoPessoaType } from "./relacionamento-processo-pessoa.graphql-type.js";

export const ProcessoType = new GraphQLObjectType({
  name: "Processo",
  fields: {
    id: NonNullInt,
    uuid: NonNullString,
    criado_em: NonNullString,
    atualizado_em: String,
    numero: NonNullString,
    data_autuacao: String,
    valor_causa: { type: GraphQLFloat },
    segredo_justica: { type: GraphQLBoolean },
    tutela_urgencia: { type: GraphQLBoolean },
    criado_por_advogado_uuid: NonNullString,
    advogado: {
      type: AdvogadoType,
      resolve: advogadoProcessoFieldResolver,
    },
    orgao_uuid: String,
    orgao: {
      type: OrgaoType,
      resolve: orgaoProcessoFieldResolver,
    },
    classe_judicial_uuid: String,
    classe_judicial: {
      type: ClasseJudicialType,
      resolve: classeJudicialProcessoFieldResolver,
    },
    polos: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: `PessoasRelatedProcesso`,
          fields: {
            uuid: RawFieldsRelacionamentoProcessoPessoaType.uuid,
            tipo_relacionamento:
              RawFieldsRelacionamentoProcessoPessoaType.tipo_relacionamento,
            pessoa: { type: PessoaType },
          },
        }),
      ),
      resolve: polosProcessoFieldResolver,
    },
  },
});
