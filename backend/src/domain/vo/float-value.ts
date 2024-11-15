export class FloatValue<T extends number | undefined | null> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }
}
