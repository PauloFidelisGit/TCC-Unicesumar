interface Env {
  VITE_API_URL: string;
  VITE_FRONT_VERSION: string;
  VITE_APP_BASE_URL: string;
  VITE_LOCAL_STORAGE_CRYPTO_KEY: string;
}

const errors: string[] = [];

export const ENV = [
  "VITE_API_URL",
  "VITE_FRONT_VERSION",
  "VITE_APP_BASE_URL",
  "VITE_LOCAL_STORAGE_CRYPTO_KEY",
].reduce((acc, key) => {
  const envKey = `${key}`;
  if (!import.meta.env[envKey]) errors.push(envKey);
  let value = import.meta.env[envKey] as string | boolean;
  if (value === "false" || value === "true")
    value = value === "true" ? true : false;
  return {
    ...acc,
    [key]: value,
  };
}, {} as Env);

if (errors.length) {
  throw new Error(
    `${
      errors.length === 1
        ? "Variável de ambiente não definida"
        : "Variáveis de ambiente não definidas"
    }: ${errors.join(", ")}`,
  );
}
