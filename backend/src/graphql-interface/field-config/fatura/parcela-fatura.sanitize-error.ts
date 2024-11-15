interface Props {
  message: string;
  code?: string;
}

export function sanitizeErrorParcelaFatura({ message, code }: Props): Props {
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
    case "ER_NO_REFERENCED_ROW_2": {
      switch (true) {
        case message.includes("fk_parcela_fatura_fatura_uuid"): {
          return {
            message: "Fatura não encontrada.",
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
    default: {
      return {
        message,
        code,
      };
    }
  }
}
