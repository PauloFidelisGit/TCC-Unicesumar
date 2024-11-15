function removeTimezoneOffset(date: Date): Date {
  const timezoneOffset = date.getTimezoneOffset() * 60 * 1000; // Converte minutos para milissegundos
  return new Date(date.getTime() - timezoneOffset);
}

export class Datetime<T extends string | undefined | null> {
  private value: Date | Exclude<T, string>;

  constructor(value: T) {
    if (!value) {
      this.value = value as Exclude<typeof this.value, Date>;
    } else if (value === "") {
      this.value = undefined as Exclude<
        typeof this.value,
        string | null | Date
      >;
    } else {
      /**
       * Adiciona o UTC ao final da string para nunca incluir o timezone
       */
      const newValue = !value.includes("Z") ? value + "Z" : value;
      this.value = new Date(newValue);
    }
  }

  static createOrNew(value?: string) {
    return new Datetime(value || new Date().toISOString());
  }

  /**
   * @returns 2024-08-19T18:51:57.025Z
   */
  get ISOString() {
    if (!this.value)
      return this.value as Exclude<typeof this.value, Date | string>;
    return this.value.toISOString();
  }

  /**
   * @description ISO8601
   * @returns 2024-08-19
   */
  get toDate() {
    if (!this.value)
      return this.value as Exclude<typeof this.value, Date | string>;
    return this.value
      .toISOString()
      .split("T")[0] as `${string}-${string}-${string}`;
  }

  /**
   * @description ISO8601
   * @returns 2024-08-19T18:51:57Z
   */
  get toDateTime() {
    if (!this.value)
      return this.value as Exclude<typeof this.value, Date | string>;
    return (this.value.toISOString().slice(0, 19) +
      "Z") as `${string}-${string}-${string}T${string}:${string}:${string}Z`;
  }

  /**
   * @description ISO8601
   * @returns 2024-08-19T18:51
   */
  get toDateTimeLocal() {
    if (!this.value)
      return this.value as Exclude<typeof this.value, Date | string>;
    return this.value.toISOString().slice(0, 16);
  }

  get DDMMYYYY() {
    if (!this.value)
      return this.value as Exclude<typeof this.value, Date | string>;
    const [year, month, day] = this.value
      .toISOString()
      .split("T")[0]!
      .split("-");
    return `${day}/${month}/${year}`;
  }

  static create() {
    return new Datetime<string>(removeTimezoneOffset(new Date()).toISOString());
  }
}
