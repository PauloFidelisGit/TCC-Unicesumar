/**
 * Cria um cursor para paginação com base nos resultados.
 *
 * @param result - O array de resultados a ser paginado.
 * @param limit - O limite de resultados por página.
 * @returns O ID do próximo cursor ou null se não houver mais resultados.
 */
export function makeListCursor(result: any[], limit: number): number | null {
  const dataLength = result.length;
  const lastRegister = result[dataLength - 1];
  const nextCursor =
    lastRegister?.id && dataLength >= limit ? lastRegister?.id : null;
  return nextCursor;
}
