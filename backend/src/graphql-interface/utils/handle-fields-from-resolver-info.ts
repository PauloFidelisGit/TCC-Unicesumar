import { GraphQLResolveInfo } from "graphql";

type Selections = Extract<
  GraphQLResolveInfo["fieldNodes"][0]["selectionSet"],
  { kind: "SelectionSet" }
>["selections"];

function handleSelections(selections: Selections) {
  const result: Record<string, any> = {};

  selections?.forEach((selection) => {
    if (selection.kind === "Field") {
      const fieldName = selection.name.value;

      if (fieldName === "__typename") return;

      if (
        selection.selectionSet &&
        selection.selectionSet.selections.length > 0
      ) {
        const subObject = handleSelections(selection.selectionSet.selections);

        if (result[fieldName]) {
          // Se já existe, converte em array ou adiciona ao array existente
          if (Array.isArray(result[fieldName])) {
            result[fieldName].push(subObject);
          } else {
            result[fieldName] = [result[fieldName], subObject];
          }
        } else {
          result[fieldName] = subObject;
        }
      } else {
        if (result[fieldName]) {
          // Se já existe, converte em array ou adiciona ao array existente
          if (Array.isArray(result[fieldName])) {
            result[fieldName].push(true);
          } else {
            result[fieldName] = [result[fieldName], true];
          }
        } else {
          result[fieldName] = true;
        }
      }
    }
  });

  return result;
}

export class HandleFields {
  constructor(private info: GraphQLResolveInfo) {}

  extract() {
    let object: Record<string, any> = {};
    this.info.operation.selectionSet.selections?.map((variable) => {
      if (variable.kind === "Field") {
        if (variable.name.kind === "Name") {
          object[variable.name.value] = handleSelections(
            variable.selectionSet?.selections!,
          );
        }
      }
    });
    return object;
  }

  toStringArray<T>(
    object: Record<string, any> = {},
    {
      allowedFields,
    }: {
      allowedFields: string[];
    },
  ) {
    const fields = Object.keys(object || {});
    return allowedFields.filter((item) => fields.includes(item)) as T;
  }

  findValueByKey(obj: any, key: string): any | undefined {
    if (typeof obj !== "object" || obj === null) {
      return undefined;
    }

    if (obj.hasOwnProperty(key)) {
      return obj[key];
    }

    for (const k in obj) {
      if (obj.hasOwnProperty(k)) {
        const result = this.findValueByKey(obj[k], key);
        if (result !== undefined) {
          return result;
        }
      }
    }

    return undefined;
  }
}
