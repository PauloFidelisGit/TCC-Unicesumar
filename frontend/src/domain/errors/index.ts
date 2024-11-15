import { ERRORS } from "@/domain/enums";

export abstract class CustomErrorAbstract extends Error {
  constructor(
    public message: string,
    public code: ERRORS,
  ) {
    super(JSON.stringify({ message, code }));
  }
}

export class ApplicationError extends CustomErrorAbstract {
  constructor(public message: string) {
    super(message, ERRORS.APLICATION_ERROR);
  }
}

export class NotFoundError extends CustomErrorAbstract {
  constructor(public message: string) {
    super(message, ERRORS.NOT_FOUND_ERROR);
  }
}

export class ValidationError extends CustomErrorAbstract {
  constructor(public message: string) {
    super(message, ERRORS.VALIDATION_ERROR);
  }
}

export class InternalServerError extends CustomErrorAbstract {
  constructor(public message: string = "Erro interno do servidor.") {
    super(message, ERRORS.INTERNAL_SERVER_ERROR);
  }
}
