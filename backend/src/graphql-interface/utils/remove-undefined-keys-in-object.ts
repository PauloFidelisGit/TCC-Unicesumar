// /**
//  * Remove chaves com valores indefinidos de um objeto, incluindo objetos aninhados.
//  *
//  * @param args - O objeto do qual as chaves indefinidas devem ser removidas.
//  * @returns Um novo objeto com as chaves indefinidas removidas.
//  */
// export function removeUndefinedKeysInObject<T extends Record<string, any>>(
//   args: T,
// ): T {
//   return Object.fromEntries(
//     Object.entries(args)
//       .map(([key, value]) => [
//         key,
//         value && typeof value === "object" && !Array.isArray(value)
//           ? removeUndefinedKeysInObject(value)
//           : value,
//       ])
//       .filter(([_, value]) => value !== undefined),
//   ) as T;
// }
