import { useSearchParams } from "react-router-dom";

export function useUrlSearchParams<const T extends string[]>(
  params: T,
): Record<T[number], string | null> {
  const [searchParams] = useSearchParams();
  return params.reduce(
    (acc, param) => {
      acc[param as keyof typeof acc] = searchParams.get(param);
      return acc;
    },
    {} as Record<T[number], string | null>,
  );
}
