import { PermissaoRepositoryAbstract } from "../../../../../domain/repositories/permissao-advogado.repository-abstract.js";
import { Datetime } from "../../../../../domain/vo/datetime.vo.js";
import { allPermissions } from "../../../../../graphql-interface/security/all-permissions.js";
import { GetFirstParam } from "../../types/index.js";

const data = allPermissions;

const PERMISSOES: GetFirstParam<PermissaoRepositoryAbstract["bulkSave"]> = [];

for (const servico of data) {
  const values: (typeof PERMISSOES)[number] = {
    uuid: servico.uuid,
    criado_em: Datetime.create().toDatabaseTimeStamp,
    nome: servico.nome,
  };
  PERMISSOES.push(values);
}

export default PERMISSOES;
