import {
  DashboardPageContainer,
  DashboardPageSubtitle,
  DashBoardPageTitle,
} from "@/advogado/dashboard/dashboard-page";
import { ERRORS } from "@/domain/enums";
import { InternalServerError, NotFoundError } from "@/domain/errors";
import { ExtensionsType } from "@/domain/errors/extensions.type";
import { useRequiredParams } from "@/hooks/use-required-params";
import { useSuspenseQuery } from "@apollo/client";
import { FIND_MUNICIPIO } from "./muncipio.queries";

export default function MunicipioPage() {
  const { municipio_uuid } = useRequiredParams([
    {
      param: "municipio_uuid",
      message: "Município não encontrado.",
      isUuid: true,
    },
  ]);

  const find = useSuspenseQuery(FIND_MUNICIPIO, {
    variables: {
      where: "uuid",
      value: municipio_uuid,
    },
  });

  if (find.error) {
    const extensions = find.error.cause?.extensions as ExtensionsType;

    if (extensions?.code === ERRORS.INTERNAL_SERVER_ERROR) {
      throw new InternalServerError(find.error.cause?.message);
    }

    throw new NotFoundError("Município não encontrado.");
  }

  const municipio = find.data.findMunicipio;

  return (
    <DashboardPageContainer>
      <div className="pb-4">
        <DashBoardPageTitle>{municipio.nome}</DashBoardPageTitle>
        <DashboardPageSubtitle>Município</DashboardPageSubtitle>
      </div>
    </DashboardPageContainer>
  );
}
