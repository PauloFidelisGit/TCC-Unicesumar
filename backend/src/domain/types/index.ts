export type Result<Success> =
  | {
      success: true;
      value: Success;
    }
  | {
      success: false;
      message: string;
      code?: string;
    };

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type CreateTuple<T extends Record<string, any>> = [
  (keyof T)[][number],
  ...(keyof T)[],
];
