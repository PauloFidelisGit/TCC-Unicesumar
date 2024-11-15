interface Props {
  message: string;
  code?: string;
  error?: any;
}

export function advogadoSanitizeError({ message, code }: Props): Props {
  switch (code) {
    case "ER_DUP_ENTRY": {
      if (message.includes("uq_relacionamento_processo_pessoa")) {
        return {
          message: "Relacionamento entre processo e pessoa já existe.",
          code,
        };
      }
      return {
        message: "Registro duplicado.",
        code,
      };
    }
    default: {
      return {
        message,
        code,
      };
    }
  }
}
