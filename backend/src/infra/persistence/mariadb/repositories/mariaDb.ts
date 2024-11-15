import { GraphQLError } from "graphql";
import {
  createPool,
  Pool,
  PoolConfig,
  PoolConnection,
  UpsertResult,
} from "mariadb";
import { Result } from "../../../../domain/types/index.js";
import { Logger } from "../../../../utils/logger.js";

export class MariaDb {
  private declare conn: Pool;

  constructor(private credentials: PoolConfig) {
    Logger.info("Inicializando MariaDb");
    this.conn = createPool(this.credentials);
    this.testConnection();
  }

  async testConnection() {
    try {
      Logger.info(
        `Testando conexão ${this.credentials.host}${this.credentials.database ? `/${this.credentials.database}` : ""} `,
      );
      const connection = await this.conn.getConnection();
      connection.release();
    } catch (error) {
      Logger.error("Falha ao conectar ao banco de dados.", error);
      process.exit(1);
    }
  }

  /** For `SELECT` and `SHOW` */
  async getFirst<T extends any>(
    query: string,
    value?: unknown,
  ): Promise<Result<T>> {
    try {
      const result = await this.conn.execute.bind(this.conn)<[T]>(query, value);
      if (!result[0]) {
        Logger.error("Registro não encontrado.", { query, value, result });
        return { success: false as const, message: "Registro não encontrado." };
      }
      return { success: true as const, value: result[0] };
    } catch (error: any) {
      Logger.error("Erro no banco de dados", error);
      return {
        success: false as const,
        message: error.message,
        code: error.code,
      };
    }
  }

  async batchInsert<T extends any>(
    query: string,
    value: any[],
  ): Promise<Result<T>> {
    try {
      const result = await this.conn.batch.bind(this.conn)(query, value);
      return { success: true as const, value: result as T };
    } catch (error: any) {
      Logger.error("Erro no banco de dados", error);
      return {
        success: false as const,
        message: error.message,
        code: error.code,
      };
    }
  }

  /** For `SELECT` and `SHOW` with `rowAsArray` as `true` */
  async executeAsArray<T extends any[]>(
    query: string,
    value?: unknown,
  ): Promise<Result<T>> {
    try {
      const result = await this.conn.execute.bind(this.conn)<T>(query, value);
      return { success: true as const, value: result };
    } catch (error: any) {
      Logger.error("Erro no banco de dados", error);
      return {
        success: false as const,
        message: error.message,
        code: error.code,
      };
    }
  }

  /** For `INSERT`, `UPDATE`, etc. */
  async executeResult<T extends any>(
    query: string,
    value: unknown,
  ): Promise<Result<T>> {
    try {
      const result = await this.conn.execute.bind(this.conn)<UpsertResult>(
        query,
        value ?? [],
      );

      if (result.affectedRows === 0) {
        Logger.error("Não foi possível executar a operação.", {
          query,
          value,
          result,
        });
        return {
          success: false as const,
          message: "Não foi possível executar a operação.",
        };
      }

      return { success: true as const, value: result as T };
    } catch (error: any) {
      Logger.error("Erro no banco de dados", error);
      return {
        success: false as const,
        message: error.message,
        code: error.code,
      };
    }
  }

  async executeTransaction<
    T extends Record<string, (conn: PoolConnection) => any>,
    V extends {
      [K in keyof T]: Awaited<ReturnType<T[K]>>;
    },
  >(actions: T): Promise<Result<V>> {
    let conn: PoolConnection | undefined;
    try {
      conn = await this.conn.getConnection();

      await conn.beginTransaction();

      let result: Record<string, any> = {};

      for await (const [key, action] of Object.entries(actions)) {
        const actionResult = await action(conn);
        result[key] = actionResult;
      }

      await conn.commit();

      return { success: true as const, value: result as V };
    } catch (error: any) {
      Logger.error("Erro no banco de dados", error);

      await conn?.rollback();

      if (error instanceof GraphQLError) {
        return {
          success: false as const,
          message: error.message,
          code: error.extensions["code"] as string,
        };
      }

      return {
        success: false as const,
        message: error.message,
        code: error.code,
      };
    } finally {
      await conn?.release();
    }
  }

  async createDatabase({ database }: { database: string }) {
    const query = /*sql*/ `CREATE DATABASE IF NOT EXISTS ${database};`;
    const result = await this.conn.execute<UpsertResult>(query);
    if (result.affectedRows === 1) {
      Logger.info(`Banco de dados "${database}" criado com sucesso!`);
    }
  }

  async dropDatabase({ database }: { database: string }) {
    const query = /*sql*/ `DROP DATABASE IF EXISTS ${database};`;
    const result = await this.conn.execute<UpsertResult>(query);
    if (result.affectedRows > 1) {
      Logger.info(`Banco de dados "${database}" excluído com sucesso!`);
    }
  }

  async end() {
    if (this.conn) {
      await this.conn.end();
      Logger.info("Pool de conexões fechado.");
    }
  }

  get connection() {
    return this.conn;
  }
}
