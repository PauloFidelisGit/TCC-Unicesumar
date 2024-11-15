export type GetFirstParam<T extends (...args: any) => any> = Parameters<T>[0];
