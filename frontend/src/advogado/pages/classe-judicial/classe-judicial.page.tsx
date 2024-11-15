import {
  DashboardPageContainer,
  DashboardPageSubtitle,
  DashBoardPageTitle,
} from "@/advogado/dashboard/dashboard-page";
import { useRequiredParams } from "@/hooks/use-required-params";

import { ERRORS } from "@/domain/enums";
import { InternalServerError, NotFoundError } from "@/domain/errors";
import { ExtensionsType } from "@/domain/errors/extensions.type";
import { useSuspenseQuery } from "@apollo/client";
import { QUERY_FIND_CLASSE_JUDICIAL } from "./classe-judicial.queries";

export default function ClasseJudicialPage() {
  const { classe_judicial_uuid } = useRequiredParams([
    {
      param: "classe_judicial_uuid",
      message: "Classe Judicial não encontrada.",
      isUuid: true,
    },
  ]);

  const find = useSuspenseQuery(QUERY_FIND_CLASSE_JUDICIAL, {
    variables: {
      where: "uuid",
      value: classe_judicial_uuid,
    },
  });

  if (find.error) {
    const extensions = find.error.cause?.extensions as ExtensionsType;

    if (extensions?.code === ERRORS.INTERNAL_SERVER_ERROR) {
      throw new InternalServerError(find.error.cause?.message);
    }

    throw new NotFoundError("Classe Judicial não encontrada.");
  }

  const municipio = find.data.findClasseJudicial;

  return (
    <DashboardPageContainer>
      <div className="pb-4">
        <DashBoardPageTitle>{municipio.nome}</DashBoardPageTitle>
        <DashboardPageSubtitle>Classe Judicial</DashboardPageSubtitle>
      </div>
    </DashboardPageContainer>
  );
}
