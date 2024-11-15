import { z } from "zod";

export type OabType = { numero: string; uf: string; letra: string };

export class Oab<T extends OabType[] | undefined | null> {
  value: T;

  constructor(value: T) {
    this.value = value;
    this.validate();
  }

  private validate() {
    if (!this.value) return;
    z.array(
      z.object({
        numero: z.string(),
        uf: z.string().length(2, {
          message: "UF deve ter 2 caracteres",
        }),
        letra: z.string().length(1, {
          message: "Letra deve ter 1 caracter",
        }),
      }),
    ).parse(this.value);
  }

  /**
   * @returns Retorna um array de OabType como string "[{ numero: XXXX, uf: 'XX', letra: 'X' }]"
   */
  get toString() {
    if (!this.value) return this.value as Exclude<T, OabType[]>;
    return JSON.stringify(this.value);
  }

  static createFromStringOrUndefinedOrNull(value?: string | null) {
    return value === null
      ? new Oab(null)
      : value === undefined
        ? undefined
        : new Oab(JSON.parse(value));
  }
}
