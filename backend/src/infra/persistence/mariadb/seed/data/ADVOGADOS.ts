import { randomUUID } from "node:crypto";
import { AdvogadoRepositoryAbstract } from "../../../../../domain/repositories/advogado.repository-abstract.js";
import { Datetime } from "../../../../../domain/vo/datetime.vo.js";
import { Password } from "../../../../../domain/vo/password.vo.js";
import { allPermissions } from "../../../../../graphql-interface/security/all-permissions.js";
import { GetFirstParam } from "../../types/index.js";

const data = [
  {
    uuid: "3f5e44df-7f29-494d-a42e-5f266f6fb97b",
    nome: "Advogado",
    login: "advogado",
    senha: await new Password("12345678").encrypted(),
  },
];

const ADVOGADOS: GetFirstParam<AdvogadoRepositoryAbstract["save"]>[] = [];

for (const advogado of data) {
  const values: (typeof ADVOGADOS)[number] = {
    advogado: { criado_em: Datetime.create().toDatabaseTimeStamp, ...advogado },
    permissoes: allPermissions.map((permissao) => {
      return {
        uuid: randomUUID(),
        advogado_uuid: advogado.uuid,
        criado_em: Datetime.create().toDatabaseTimeStamp,
        permissao_advogado_uuid: permissao.uuid,
      };
    }),
  };
  ADVOGADOS.push(values);
}

export default ADVOGADOS;
