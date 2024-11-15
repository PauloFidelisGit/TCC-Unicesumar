export class DefaultQueryBuilder {
  static insertInto(table: string, args: Record<string, any>) {
    const { fields, values, questionMarks } = prepareInsertData(args);
    const query = /*sql*/ `
		INSERT INTO ${table} (${fields})
		VALUES (${questionMarks})
		RETURNING uuid;`;
    return { query, values };
  }

  static insertBulkInto(table: string, args: Record<string, any>[]) {
    const { fields, values, questionMarks } = prepareBulkInsertData(args);
    const query = /*sql*/ `
		INSERT INTO ${table} (${fields})
		VALUES (${questionMarks})
		RETURNING uuid;
		`;
    return { query, values };
  }

  static update(
    table: string,
    args: {
      uuid: string;
      data: Record<string, any>;
    },
  ) {
    const { placeHolders, values } = prepareUpdateData(args.data);
    values.push(args.uuid);
    const query = /*sql*/ `
		UPDATE ${table}
		SET ${placeHolders}
		WHERE uuid = ?;`;
    return { query, values };
  }

  static bulkUpdate(
    table: string,
    args: {
      uuid: string;
      data: Record<string, any>;
    }[],
  ) {
    return args.map((args) => this.update(table, args));
  }

  static find(
    table: string,
    args: { fields: any[]; value: string | number; where: string },
  ) {
    const fields = formatSelectFields(parseSetFields([...args.fields, "uuid"]));
    const query = /*sql*/ `
		SELECT ${fields}
		FROM ${table}
		WHERE ${args.where} = ?;`;
    const values = [args.value];
    return { query, values };
  }

  static list(
    table: string,
    args: {
      fields: any[];
      limit: number;
      cursor: number;
    },
  ) {
    const fields = formatSelectFields(
      parseSetFields([...args.fields, "uuid", "id"]),
    );
    const query = /*sql*/ `
		SELECT ${fields}
		FROM ${table}
		WHERE id > ?
		ORDER BY id 
		LIMIT ${args.limit};`;
    const values = [args.cursor];
    return { query, values };
  }

  static search(
    table: string,
    args: {
      fields: any[];
      limit: number;
      value: string | number;
      where: string;
    },
  ) {
    const fields = formatSelectFields(parseSetFields([...args.fields, "uuid"]));
    const query = /*sql*/ `
		SELECT ${fields}
		FROM ${table}
		WHERE ${args.where} LIKE ?
		ORDER BY id DESC
		LIMIT ${args.limit};`;
    const values = [`%${args.value}%`];
    return { query, values };
  }

  static count(table: string) {
    const query = /*sql*/ `
		SELECT COUNT(*) AS count
		FROM ${table};`;
    return { query };
  }

  static delete(table: string, args: { uuid: string }) {
    const query = /*sql*/ `
		DELETE FROM ${table}
		WHERE uuid = ?;`;
    const values = [args.uuid];
    return { query, values };
  }
}

function isObjectOrArray(value: any) {
  return ["[object Object]", "[object Array]"].includes(
    Object.prototype.toString.call(value),
  );
}

/**
 * @output string
 * */
export function formatSelectFields(
  fields: string[] | readonly string[],
  options?: {
    prefix?: string;
    toJsonObject?: boolean;
  },
): string {
  if (options?.toJsonObject) {
    return (
      fields
        .map((field) => [`'${field}'`, `${options.prefix}.${field}`].join(", "))
        .join(", ") || ""
    );
  } else {
    return (
      fields
        .map((field) =>
          options?.prefix ? `${options.prefix}.${field}` : field,
        )
        .join(", ") || ""
    );
  }
}

export const prepareBulkInsertData = (data: Record<string, any>[]) => {
  let fields = "";

  const values: any[][] = [];

  data.forEach((item, index) => {
    if (index === 0) {
      fields = Object.keys(item).join(", ");
    }
    const itemValues = Object.values(item);
    values.push(itemValues);
  });

  const questionMarks = Array(values[0]?.length).fill("?").join(",");

  return {
    fields,
    values,
    questionMarks,
  };
};

/** @output [fields, values, questionMarks]  */
export function prepareInsertData(args: Record<string, any>) {
  const fields: string[] = [];
  const values: string[] = [];
  Object.entries(args).forEach(([key, value]) => {
    if (value === undefined) return;
    if (isObjectOrArray(value)) {
      value = JSON.stringify(value);
    }
    fields.push(key);
    values.push(value);
  });
  const questionMarks = Array(values.length).fill("?").join(",");
  return { fields: fields.join(", "), values, questionMarks };
}

/** @output [placeHolder, values]  */
export function prepareUpdateData(args: Record<string, any>) {
  const fields: string[] = [];
  const values: string[] = [];
  Object.entries(args).forEach(([key, value]) => {
    if (value === undefined) return;
    if (isObjectOrArray(value)) {
      value = JSON.stringify(value);
    }
    fields.push(key);
    values.push(value);
  });
  const placeHolders = fields.map((key) => `${key} = ?`).join(", ");
  return { placeHolders, values };
}

/**
 * Parses an array of fields and returns a new array with duplicate values removed.
 *
 * @template T - The type of the array elements.
 * @param {T} fields - The array of fields to be parsed.
 * @returns {T} A new array with duplicate values removed.
 */
export function parseSetFields<const T extends any[]>(fields: T): T {
  return Array.from(new Set(fields)) as T;
}
