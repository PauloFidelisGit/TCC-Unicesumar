import { z } from "zod";

export class Emails<T extends string[] | undefined | null> {
  value: T;

  constructor(value: T) {
    this.value = value;
    this.validate();
  }

  private validate() {
    if (!this.value) return;
    z.array(
      z.string().trim().email({
        message: "Emails deve ser um array de emails válidos.",
      }),
      {
        message: "Emails deve ser um array de emails válidos.",
      },
    ).parse(this.value);
  }

  /**
   * @returns Retorna um array de e-mails como string "[email1@email.com, email2@email.com]"
   */
  get toString() {
    if (!this.value) return this.value as Exclude<T, string[]>;
    return JSON.stringify(this.value);
  }

  static createFromStringOrUndefinedOrNull(value?: string | null) {
    return value === null
      ? new Emails(null)
      : value === undefined
        ? undefined
        : new Emails(JSON.parse(value));
  }
}
