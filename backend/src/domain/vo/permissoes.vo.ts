// import { z } from "zod";

// export class Permissoes<T extends string[] | undefined | null> {
//   value: T;

//   constructor(value: T) {
//     this.value = value;
//     this.validate();
//   }

//   private validate() {
//     if (!this.value) return;
//     z.array(
//       z
//         .string({
//           message: "Pesmissões deve ser um array de string.",
//         })
//         .trim(),
//       {
//         message: "Pesmissões deve ser um array de string.",
//       },
//     ).parse(this.value);
//   }

//   get toString() {
//     if (!this.value) return this.value as Exclude<T, string[]>;
//     return JSON.stringify(this.value);
//   }

//   static fromString(value: string) {
//     return new Permissoes<string[]>(JSON.parse(value));
//   }

//   static createFromStringOrUndefined(value?: string | undefined) {
//     return value === undefined ? undefined : new Permissoes(JSON.parse(value));
//   }

//   static createFromStringOrUndefinedOrNull(value?: string | null) {
//     return value === null
//       ? new Permissoes(null)
//       : value === undefined
//         ? undefined
//         : new Permissoes(JSON.parse(value));
//   }
// }
