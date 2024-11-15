import chalk from "chalk";
import * as dotenv from "dotenv";

dotenv.config({
  override: true,
});

function parseNumber(value: any): number | undefined {
  return isNaN(Number(value)) ? undefined : Number(value);
}

type Env = {
  BACKEND_HOST: string;
  BACKEND_PORT: number;
  DATABASE_HOST: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  NODE_ENV: "development" | "production";
  CRYPTO_TOKEN_SECRET: string;
  ALLOW_RESET_DATABASE: boolean;
};

const ENV_DEVELOPMENT: Env = {
  BACKEND_HOST: "127.0.0.1",
  BACKEND_PORT: 4000,
  DATABASE_HOST: "172.18.0.2",
  DATABASE_USER: "root",
  DATABASE_PASSWORD: "12345678",
  DATABASE_NAME: "aeonadv",
  NODE_ENV: "development",
  CRYPTO_TOKEN_SECRET: "secret",
  ALLOW_RESET_DATABASE: true,
};

const ENV_PRODUCTION: Env = {
  BACKEND_HOST: process.env["BACKEND_HOST"]!,
  BACKEND_PORT: parseNumber(process.env["BACKEND_PORT"])!,
  DATABASE_HOST: process.env["DATABASE_HOST"]!,
  DATABASE_USER: process.env["DATABASE_USER"]!,
  DATABASE_PASSWORD: process.env["DATABASE_PASSWORD"]!,
  DATABASE_NAME: process.env["DATABASE_NAME"]!,
  NODE_ENV: process.env["NODE_ENV"]! as "development" | "production",
  CRYPTO_TOKEN_SECRET: process.env["CRYPTO_TOKEN_SECRET"]!,
  ALLOW_RESET_DATABASE: !!process.env["MIGRATE"]!,
};

export const ENV =
  ENV_PRODUCTION.NODE_ENV === "production" ? ENV_PRODUCTION : ENV_DEVELOPMENT;

const isUndefinedEnv = Object.keys(ENV).filter(
  (key) => ENV[key as keyof typeof ENV] === undefined,
);

if (isUndefinedEnv.length > 0) {
  throw new Error(
    chalk.bold.redBright(
      `${isUndefinedEnv.length === 1 ? "Variável" : "Variáveis"} de ambiente não ${
        isUndefinedEnv.length === 1 ? "definida" : "definidas"
      }: [${isUndefinedEnv.join(", ")}]`,
    ),
  );
}
