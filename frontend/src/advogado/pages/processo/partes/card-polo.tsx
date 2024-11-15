import { CopyButton, CustomButton } from "@/components/custom-buttons";
import { IconBaselineClose } from "@/components/icons";
import { Avatar, AvatarFallback } from "@/components/shadcn/avatar";
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
  TableRow,
} from "@/components/shadcn/table";
import { copyToClipboard } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { Polo } from "../processo.dto";
import { navAdvogado } from "@/advogado/routes/nav";

interface Props {
  name: string;
  pessoas: Polo[];
  handleDelete: (uuid: string) => void;
}
export function CardPolo({ name, pessoas, handleDelete }: Props) {
  return (
    <Card className="max-w-96 flex-1 text-sm md:text-base">
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {pessoas?.length > 0 ? (
              pessoas?.map(
                (
                  { nome, doc, pessoa_uuid, relacionamento_processo_uuid },
                  index,
                ) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="flex items-center">
                        <div className="flex gap-2">
                          <Avatar className="">
                            <AvatarFallback>
                              {nome?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col justify-center">
                            <NavLink
                              to={navAdvogado.dashboard.advogado.toPessoa({
                                pessoa_uuid: pessoa_uuid,
                              })}
                              className="flex items-center gap-2 font-semibold"
                            >
                              {nome}
                            </NavLink>
                            {doc && (
                              <div>
                                {doc}{" "}
                                <CopyButton
                                  onClick={() => copyToClipboard(doc)}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        <CustomButton
                          className="ml-auto px-2"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleDelete(relacionamento_processo_uuid)
                          }
                          type="button"
                          icon={IconBaselineClose}
                        />
                      </TableCell>
                    </TableRow>
                  );
                },
              )
            ) : (
              <TableRow>
                <TableCell>
                  <div className="flex justify-center">
                    <span>Nenhuma parte vinculada</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
