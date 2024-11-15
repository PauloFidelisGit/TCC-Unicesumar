import { randomUUID } from "node:crypto";
import { z } from "zod";

export class Uuid<T extends string | undefined | null> {
  /**
   * @type `${string}-${string}-${string}-${string}-${string}`
   */
  readonly value: T;

  constructor(uuid: T) {
    this.value = uuid;
    this.validate();
  }

  private validate() {
    if (!this.value) return;
    z.string().uuid().parse(this.value);
  }

  static create() {
    return new Uuid(randomUUID());
  }
}
