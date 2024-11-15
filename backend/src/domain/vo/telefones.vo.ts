import { z } from "zod";

export class Telefones<T extends string[] | undefined | null> {
  value: T;

  constructor(value: T) {
    this.value = value;
    this.validate();
  }

  private validate() {
    if (!this.value) return;
    z.array(z.string().trim(), {
      message: "Telefones deve ser um array de telefones válidos.",
    }).parse(this.value);
  }

  get toString() {
    if (!this.value) return this.value as Exclude<T, string[]>;
    return JSON.stringify(this.value);
  }

  static createFromStringOrUndefinedOrNull(value?: string | null) {
    return value === null
      ? new Telefones(null)
      : value === undefined
        ? undefined
        : new Telefones(JSON.parse(value));
  }
}
