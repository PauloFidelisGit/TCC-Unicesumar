interface Props {
  message: string;
  code?: string;
}

export function sanitizeErrorRelacionamentoProcessoPessoa({
  message,
  code,
}: Props): Props {
  switch (code) {
    case "ER_DUP_ENTRY": {
      switch (true) {
        case message.includes("uq_pessoa_relacionamento_rocesso"):
          return {
            message: "Parte já vinculada.",
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