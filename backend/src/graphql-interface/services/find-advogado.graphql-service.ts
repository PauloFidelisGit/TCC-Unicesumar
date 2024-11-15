import { advogadoRepository } from "../../infra/persistence/mariadb/repository-injection.js";
import { ResolverContext } from "../context/resolver.context.js";
import { UnauthorizedError } from "../errors/unauthorized.error.js";

export async function findAdvogadoGraphqlService(advogado_uuid: string) {
  const result = await advogadoRepository.findAllPermissionsByUuid({
    uuid: advogado_uuid,
  });

  function advogadoDTO(props: {
    uuid: string;
    permissoes: string[];
  }): Extract<ResolverContext["user"], { kind: "advogado" }> {
    return {
      kind: "advogado",
      uuid: props.uuid,
      permissoes: props.permissoes,
    };
  }

  if (result.success) {
    const advogado = advogadoDTO({
      permissoes: result.value,
      uuid: advogado_uuid,
    });

    return advogado;
  }

  throw new UnauthorizedError("Advogado não encontrado.");
}
