import { GraphQLFieldResolver } from "graphql";
import {
  advogadoRepositoryColumns,
  AdvogadoRepositoryDTO,
} from "../../../domain/repositories/advogado.repository-abstract.js";
import { advogadoRepository } from "../../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../../context/resolver.context.js";
import { ResolverError } from "../../errors/resolver.error.js";
import { HandleFields } from "../../utils/handle-fields-from-resolver-info.js";
import {
  AdvogadoOutputResolverDTO,
  advogadoOutputResolverDTO,
} from "../advogado/advogado.resolver-dto.js";
import { AnotacoesCasoInputResolverDTO } from "./anotacoes-caso.resolver-dto.js";

export type AdvogadoCasoFieldResolverType = GraphQLFieldResolver<
  Partial<AnotacoesCasoInputResolverDTO>,
  ResolverContext,
  any,
  Promise<Partial<AdvogadoOutputResolverDTO> | null>
>;

export const advogadoCasoFieldResolver: AdvogadoCasoFieldResolverType = async (
  parent,
  _props,
  _context,
  info,
) => {
  const fields = new HandleFields(info);
  const extractFields = fields.extract();

  const fieldsKeys = fields.toStringArray<(keyof AdvogadoRepositoryDTO)[]>(
    extractFields["findAnotacoesCaso"]?.["advogado"] ||
      extractFields["searchAnotacoesCaso"]?.["advogado"] ||
      extractFields["listAnotacoesCaso"]?.["data"]?.["advogado"],
    {
      allowedFields: advogadoRepositoryColumns,
    },
  );

  const advogado_uuid = parent.criado_por_advogado_uuid;
  if (!advogado_uuid) return null;

  const result = await advogadoRepository.find({
    where: "uuid",
    value: advogado_uuid,
    fields: fieldsKeys,
  });

  if (!result.success) {
    throw new ResolverError("Não foi possível encontrar o advogado.", {
      errors: [{ message: result.message }],
    });
  }

  const { value } = result;

  return advogadoOutputResolverDTO({
    id: value.id,
    uuid: value.uuid,
    criado_em: value.criado_em,
    atualizado_em: value.atualizado_em,
    senha: value.senha,
    telefones: value.telefones,
    emails: value.emails,
    nome: value.nome,
    login: value.login,
    data_nascimento: value.data_nascimento,
    nacionalidade: value.nacionalidade,
    estado_civil: value.estado_civil,
    cpf: value.cpf,
    oab: value.oab,
  });
};
