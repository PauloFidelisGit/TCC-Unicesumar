interface Props {
  message: string;
  code?: string;
}

export function enderecoSanitizeError({ message, code }: Props): Props {
  switch (code) {
    case "ER_NO_REFERENCED_ROW_2": {
      const regex = /FOREIGN KEY \(`([^`]+)`\) REFERENCES/;
      const match = message.match(regex);
      const values = [
        {
          field: "advogado_uuid",
          message: "Advogado não encontrado.",
        },
        {
          field: "pessoa_uuid",
          message: "Pessoa não encontrada.",
        },
      ];
      for (const { field, message } of values) {
        if (match && match[1] === field) {
          return {
            message,
            code,
          };
        }
      }
      return {
        message: "Não foi possível encontrar o registro de referência.",
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
