import { useParams } from "react-router-dom";
import { z } from "zod";

export function useRequiredParams<
  const T extends { param: string; message?: string; isUuid?: boolean }[],
>(props: T) {
  const params = useParams();

  const result = {} as { [key in T[number]["param"]]: string };

  for (const { param, message: _message, isUuid } of props) {
    const value = params[param];
    const message = _message || `É necessário informar o parâmetro ${param}`;
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
