import { z } from "zod";
import { ValidationError } from "../errors";

export class Uuid<T extends string | undefined | null> {
  readonly value: T;

  constructor(uuid: T) {
    this.value = uuid;
    this.validate();
  }

  private validate() {
    if (!this.value) return;
    const isValid = z.string().uuid().safeParse(this.value);
    if (!isValid.success) {
      throw new ValidationError("UUID inválido.");
    }
  }

  // static create() {
  //   return new Uuid(uuidv4());
  // }

  // static createOrNew(value?: string | undefined | null) {
  //   if (!value) return new Uuid(uuidv4());
  //   return new Uuid(value);
  // }
}
