import { useSearchParams } from "react-router-dom";
import { z } from "zod";

export function useRequiredSearchParams<
  const T extends { param: string; message: string; isUuid?: boolean }[],
>(props: T) {
  const [searchParams] = useSearchParams();
  const result = {} as { [key in T[number]["param"]]: string };
  for (const { param, message, isUuid } of props) {
    const value = searchParams.get(param);
    if (!value) {
      throw new Error(message);
    }
    if (isUuid) {
      const { error } = z
        .string()
        .uuid()
        .safeParse(value || "");
      if (error) {
        throw new Error(message);
      }
    }
    result[param as keyof typeof result] = value;
  }
  return result;
}
