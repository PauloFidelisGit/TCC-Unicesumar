import { addMonths, parseISO } from "date-fns";

export function createParcelasFromFatura(args: {
  numberInstallments: number;
  totalValue: number;
  initialDate: string;
}): {
  numero: number;
  valor: number;
  data_vencimento: string;
}[] {
  const valueParcela = +(args.totalValue / args.numberInstallments).toFixed(2);
  return Array.from({ length: args.numberInstallments }, (_, index) => ({
    numero: index + 1,
    valor: valueParcela,
    data_vencimento: addMonths(parseISO(args.initialDate + "Z"), index)
      .toISOString()
      .slice(0, 10),
  }));
}
export type CreateParcelasFromFatura = ReturnType<
  typeof createParcelasFromFatura
>;
