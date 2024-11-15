import { PoolConfig } from "mariadb";
import { ENV } from "../../env.js";

export const mariaDbConfig: PoolConfig = {
  host: ENV.DATABASE_HOST,
  user: ENV.DATABASE_USER,
  password: ENV.DATABASE_PASSWORD,
  database: ENV.DATABASE_NAME,
  connectionLimit: 5,
  autoJsonMap: false, // Campos JSON são retornados como string
  timezone: "Z",
  /**
   * Configuração necessária para que as datas sejam retornadas como string
   * e não sejam atualizadas com o timezone do servidor
   */
  dateStrings: true,
};
