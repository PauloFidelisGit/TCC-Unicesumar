export class CNPJ<T extends string | undefined | null> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
  }
}
