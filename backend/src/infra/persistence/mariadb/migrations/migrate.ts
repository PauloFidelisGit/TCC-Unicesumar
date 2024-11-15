import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DatabaseError } from "../../../../domain/errors/database.error.js";
import { ENV } from "../../../../env.js";
import { Logger } from "../../../../utils/logger.js";
import { MariaDb } from "../repositories/mariaDb.js";
import {
  adminSeed,
  advogadoSeed,
  classesJudiciaisSeed,
  municipiosSeed,
  orgaosSeed,
  permissoesAdvogadoSeed,
  servicosSeed,
  tribunaisSeed,
} from "../seed/seed.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrate() {
  if (!ENV.ALLOW_RESET_DATABASE) {
    throw new DatabaseError(
      "Esta função reseta o banco de dados e por isso a variável de ambiente ALLOW_RESET_DATABASE deve ser true.",
    );
  }

  const databaseConfig = {
    host: ENV.DATABASE_HOST,
    user: ENV.DATABASE_USER,
    password: ENV.DATABASE_PASSWORD,
    database: ENV.DATABASE_NAME,
  };

  const withoutDatabase = new MariaDb({
    host: databaseConfig.host,
    user: databaseConfig.user,
    password: databaseConfig.password,
    timezone: "Z",
  });
  await withoutDatabase.dropDatabase({ database: databaseConfig.database });
  await withoutDatabase.createDatabase({ database: databaseConfig.database });

  const mysql = new MariaDb({
    host: databaseConfig.host,
    user: databaseConfig.user,
    password: databaseConfig.password,
    database: databaseConfig.database,
    timezone: "Z",
    multipleStatements: true,
  });

  const filePath = path.join(__dirname, "create_tables.sql");
  const queries = fs.readFileSync(filePath, "utf8");

  try {
    (await mysql.connection.query(queries)) as any;
    Logger.info(
      `Todas as tabelas da base "${databaseConfig.database}" foram criadas com sucesso!`,
    );
  } catch (error) {
    Logger.error("Erro ao criar tabelas:", error);
  }

  await Promise.all([
    permissoesAdvogadoSeed(),
    adminSeed(),
    advogadoSeed(),
    municipiosSeed(),
    classesJudiciaisSeed(),
    tribunaisSeed(),
    servicosSeed(),
  ]);

  await orgaosSeed();

  process.exit(0);
}

migrate();
