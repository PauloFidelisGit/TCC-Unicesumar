export class CPF<T extends string | undefined | null> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
  }
}
