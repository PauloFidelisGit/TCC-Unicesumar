import { formatCNPJ, formatCPF, formatProcessNumber } from "@/lib/utils";
import {
  QueryFindProcessosRelatedCasoDTO,
  QuerySearchProcessoDTO,
} from "./processos-caso.queries";

export function mapQuerySearchProcessosProcessoToView(
  data: QuerySearchProcessoDTO[],
) {
  const mappedData = data.map((processo) => {
    type Pessoa = {
      uuid: string;
      nome: string | null;
      cpf: string | null;
      cnpj: string | null;
    }[];
    const polo_ativo: Pessoa = [];
    const polo_passivo: Pessoa = [];

    processo.polos.forEach((polo) => {
      const pessoa: Pessoa[number] = {
        uuid: polo.pessoa.uuid,
        nome: polo.pessoa.nome || polo.pessoa.nome_fantasia,
        cpf: polo.pessoa.cpf && formatCPF(polo.pessoa.cpf),
        cnpj: polo.pessoa.cnpj && formatCNPJ(polo.pessoa.cnpj),
      };
      if (polo.tipo_relacionamento === "POLO_ATIVO") {
        polo_ativo.push(pessoa);
      } else {
        polo_passivo.push(pessoa);
      }
    });

    return {
      uuid: processo.uuid,
      numero: processo.numero,
      polo: {
        polo_ativo,
        polo_passivo,
      },
    };
  });

  return mappedData;
}
export type MapQuerySearchProcessoToViewDTO = ReturnType<
  typeof mapQuerySearchProcessosProcessoToView
>;

export function mapQueryFindProcessoRelatedCasoToView(
  data: QueryFindProcessosRelatedCasoDTO[],
) {
  const mappedData = data.map((data) => {
    return {
      uuid: data.uuid,
      processo: {
        uuid: data.processo.uuid,
        numero: formatProcessNumber(data.processo.numero),
      },
    };
  });
  return mappedData;
}
