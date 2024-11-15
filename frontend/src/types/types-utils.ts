export type RecursiveNonNullable<T> = T extends (...args: any[]) => any
  ? T
  : T extends Array<infer U>
    ? Array<RecursiveNonNullable<NonNullable<U>>>
    : T extends object
      ? { [K in keyof T]-?: RecursiveNonNullable<NonNullable<T[K]>> }
      : NonNullable<T>;
