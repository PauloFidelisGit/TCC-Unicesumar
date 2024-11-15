interface Props {
  message: string;
  code?: string;
}

export function sanitizeErrorRelacionamentoCasoProcesso({
  message,
  code,
}: Props): Props {
  switch (code) {
    case "ER_DUP_ENTRY": {
      switch (true) {
        case message.includes("uq_relacionamento_caso_processo"):
          return {
            message: "Relacionamento já cadastrado.",
            code,
          };
        default:
          return {
            message,
            code,
          };
      }
    }
    default: {
      return {
        message,
        code,
      };
    }
  }
}
