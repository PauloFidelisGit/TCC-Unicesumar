import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/alert";
import { CustomErrorAbstract } from "@/domain/errors";
import { formatFrontEndErrors } from "@/lib/utils";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Heading } from "./typography";

interface Props {
  error: CustomErrorAbstract | null;
}
export function DefaultErrorComponent(props: Props) {
  const [errors, setErrors] = useState<
    | {
        message: string;
      }[]
    | null
  >(null);

  useEffect(() => {
    switch (true) {
      case props.error instanceof CustomErrorAbstract: {
        setErrors(formatFrontEndErrors(props.error));
        break;
      }
      case props.error instanceof TypeError: {
        setErrors([
          {
            message: "Erro na aplicação web. Por favor, comunique o suporte.",
          },
        ]);
        break;
      }
      default: {
        setErrors([
          {
            message: "Erro na aplicação web. Por favor, comunique o suporte.",
          },
        ]);
      }
    }
  }, [props]);

  return (
    <Alert variant="destructive" className="container m-auto my-4 max-w-lg">
      <AlertTitle className="flex items-center gap-2">
        <ExclamationTriangleIcon className="size-6" />
        <Heading as="h2">Ops! Houve um erro!</Heading>
      </AlertTitle>
      <AlertDescription>
        <p>
          <strong>Date:</strong> {new Date().toLocaleString()}
        </p>
        <p>
          <strong>URL:</strong> {window.location.href}
        </p>
        {errors?.map((error, index) => {
          return (
            <p key={index}>
              <strong>Erro:</strong> {error?.message}
            </p>
          );
        })}
      </AlertDescription>
    </Alert>
  );
}
