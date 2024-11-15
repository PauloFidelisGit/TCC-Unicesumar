import * as fs from "fs";

export class Logger {
  static error(message: string, error?: any): void {
    const now = new Date().toLocaleString();

    message = `[ERROR - ${now}] ${message}`;

    console.log(message, { error });

    fs.appendFileSync(
      "log.txt",
      `${message}: ${JSON.stringify(error, null, 2)}\n`,
    );
  }

  static info(message: string): void {
    const now = new Date().toLocaleString();

    message = `[INFO - ${now}] ${message}`;

    console.log(message);

    fs.appendFileSync("log.txt", `${message}\n`);
  }

  static warn(message: string, warn?: any): void {
    const now = new Date().toLocaleString();

    message = `[WARN - ${now}] ${message}`;

    console.log(message, { warn });

    fs.appendFileSync(
      "log.txt",
      `${message}: ${JSON.stringify(warn, null, 2)}\n`,
    );
  }
}
