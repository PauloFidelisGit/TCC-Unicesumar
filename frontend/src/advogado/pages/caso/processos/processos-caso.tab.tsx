import { CustomButton } from "@/components/custom-buttons";
import { useDialog } from "@/components/custom-dialog";
import {
  IconBaselineAddCircleOutline,
  IconBaselineDeleteOutline,
} from "@/components/icons";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { Text } from "@/components/typography";
import { formatGraphQLFormattedError } from "@/lib/utils";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { NavLink, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { CasoPageOutletContext } from "../caso.page";
import { ProcessosCasoLinkProcessoModal } from "./processos-caso-link-processo.modal";
import { mapQueryFindProcessoRelatedCasoToView } from "./processos-caso.dto";
import {
  MUTATION_DELETE_RELACIONAMENTO_CASO_PROCESSO,
  QUERY_FIND_PROCESSOS_RELATED_CASO,
} from "./processos-caso.queries";
import { navAdvogado } from "@/advogado/routes/nav";

export default function ProcessosCasoTab() {
  const { caso_uuid } = useOutletContext<CasoPageOutletContext>();

  const firstStepModal = useDialog();

  const search = useSuspenseQuery(QUERY_FIND_PROCESSOS_RELATED_CASO, {
    variables: {
      caso_uuid,
    },
  });

  const dataView = mapQueryFindProcessoRelatedCasoToView(
    search.data?.findProcessosRelatedCaso || [],
  );

  function refetchProcessos() {
    search.refetch();
    console.log("Refetching anotacoes processo");
  }

  const [deleteFn] = useMutation(MUTATION_DELETE_RELACIONAMENTO_CASO_PROCESSO);

  async function deleteRelacionamentoCasoProcesso(uuid: string) {
    const result = await deleteFn({
      variables: {
        uuid,
      },
    });
    if (result.errors) {
      const formatedErrors = formatGraphQLFormattedError(result.errors);
      formatedErrors.forEach((error) => {
        toast.error(error.message);
      });
    } else {
      refetchProcessos();
      toast.success("Processo desvinculado com sucesso");
    }
  }

  return (
    <div className="max-w-96 flex-1">
      <CustomButton
        label="Vincular processo"
        icon={IconBaselineAddCircleOutline}
        className="my-4"
        type="button"
        onClick={firstStepModal.openDialog}
      />

      <ProcessosCasoLinkProcessoModal
        firstStepModal={firstStepModal}
        refetchProcessos={refetchProcessos}
      />

      <Card className="mx-auto mt-8 max-w-[calc(100vw-40px)] overflow-x-auto">
        <CardHeader>
          <CardTitle>Processos relacionados</CardTitle>
        </CardHeader>
        <CardContent className="">
          {dataView.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataView.map(({ uuid, processo }, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center">
                        <NavLink
                          to={navAdvogado.dashboard.advogado.toProcesso({
                            processo_uuid: uuid,
                          })}
                        >
                          {processo.numero}
                        </NavLink>
                        <CustomButton
                          icon={IconBaselineDeleteOutline}
                          variant="ghost"
                          onClick={() => deleteRelacionamentoCasoProcesso(uuid)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div>
              <Text variant="muted">Nenhum processo vinculado</Text>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
