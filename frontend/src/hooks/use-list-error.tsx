import { cn } from "@/lib/utils";
import { useState } from "react";

export function useListErrors(props?: {
  transformErrorMessages?: (props: { message: string; code?: string }[]) => {
    message: string;
    code?: string;
  }[];
}) {
  const [messages, _setErrorsMessages] = useState<
    { message: string; code?: string }[]
  >([]);

  function clearErrors() {
    _setErrorsMessages([]);
  }

  function setErrorMessage({
    message,
    code,
  }: {
    message: string;
    code?: string;
  }) {
    _setErrorsMessages((prev) => [
      ...prev,
      {
        message,
        code,
      },
    ]);
  }

  function setErrorsMessages(messages: { message: string; code?: string }[]) {
    if (props?.transformErrorMessages) {
      const formatMessage = props.transformErrorMessages(messages);
      _setErrorsMessages(formatMessage);
    } else {
      _setErrorsMessages(messages);
    }
  }

  interface ListErrorsComponentProps {
    className?: string;
  }
  function ListErrorsComponent({ className }: ListErrorsComponentProps) {
    return (
      <>
        {messages.length > 0 && (
          <div
            className={cn(
              "text-danger my-4 max-w-96 rounded border border-red-600 p-2",
              className,
            )}
          >
            <div className="font-medium">Erros</div>
            <li className="ml-5">
              <ul>
                {messages.map(({ message }, index) => {
                  return (
                    <li className="list-disc" key={index}>
                      {message}
                    </li>
                  );
                })}
              </ul>
            </li>
          </div>
        )}
      </>
    );
  }

  return {
    ListErrorsComponent,
    setErrorsMessages,
    clearErrors,
    setErrorMessage,
  };
}

// export function useTransformErrorMessages(
//   props: {
//     field: string;
//     message: string;
//     code: "ER_DUP_ENTRY";
//   }[],
// ) {
//   return (
//     errors: {
//       message: string;
//       code?: string;
//     }[],
//   ) => {
//     return errors
//       .map((error) =>
//         props.map(({ field, message, code }) => {
//           if (error.code === code && code === "ER_DUP_ENTRY") {
//             const match = error.message.match(/for key '([^']*)'/);
//             if (match && match[1] === field) {
//               return { message };
//             }
//           }
//           return error;
//         }),
//       )
//       .flat();
//   };
// }
