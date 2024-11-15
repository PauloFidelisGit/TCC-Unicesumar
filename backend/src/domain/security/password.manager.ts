import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { SecurityError } from "../errors/security.error.js";

class PasswordCryptoManager {
  constructor(
    public readonly props: {
      tag: string;
      SCRYPT_N: number; // custo de CPU/memória (2^14)
      SCRYPT_r: number; // custo de bloco
      SCRYPT_p: number; // custo paralelo
    },
  ) {}

  async hash(password: string): Promise<string> {
    const salt = randomBytes(16).toString("hex");
    return await new Promise((resolve, reject) => {
      scrypt(
        password,
        salt,
        64,
        {
          N: this.props.SCRYPT_N,
          r: this.props.SCRYPT_r,
          p: this.props.SCRYPT_p,
        },
        async (err, buf) => {
          if (err) reject(err);
          resolve(
            `${this.props.tag}.${this.props.SCRYPT_N}.${this.props.SCRYPT_r}.${this.props.SCRYPT_p}.${buf.toString("hex")}.${salt}`,
          );
        },
      );
    });
  }

  async compare(
    storedPassword: string,
    suppliedPassword: string,
  ): Promise<boolean> {
    const isEncrypted = this.isEncryptedString(storedPassword);
    if (!isEncrypted) return false;
    const [tag, NString, r, p, encryptedText, salt] = storedPassword.split(
      ".",
    ) as [string, string, string, string, string, string];

    const N = parseInt(NString, 10);

    const isPowerOfTwo = (n: number) => (n & (n - 1)) === 0;
    if (!isPowerOfTwo(N) || N < this.props.SCRYPT_N) {
      throw new SecurityError("Valor de N inválido.");
    }

    // Validando o tag
    if (tag !== this.props.tag) {
      throw new SecurityError("Tag inválido");
    }

    const hashedPasswordBuf = Buffer.from(encryptedText, "hex");

    return await new Promise((resolve, reject) => {
      scrypt(
        suppliedPassword,
        salt,
        64,
        {
          N,
          r: parseInt(r, 10),
          p: parseInt(p, 10),
        },
        (err, suppliedPasswordBuf) => {
          if (err) reject(err);
          resolve(timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf));
        },
      );
    });
  }

  async reHash(
    storedPassword: string,
    password: string,
  ): Promise<string | null> {
    const isPasswordMatch = await this.compare(storedPassword, password);
    if (!isPasswordMatch) {
      return null;
    }
    return this.hash(password);
  }

  isEncryptedString(value: string): boolean {
    const parts = value.split(".");
    if (parts.length !== 6) return false;

    const [tag, N, r, p, hash, salt] = parts;

    // Verificar se o tag é válido
    const tagIsValid = tag === this.props.tag;

    // Verificar se N, r e p são números inteiros positivos
    const NIsValid = /^\d+$/.test(N || "") && Number(N) > 0;
    const rIsValid = /^\d+$/.test(r || "") && Number(r) > 0;
    const pIsValid = /^\d+$/.test(p || "") && Number(p) > 0;

    // Verificar se o hash tem 64 bytes representados em hexadecimal (128 caracteres hexadecimais)
    const hashIsValid = /^[a-f0-9]{128}$/.test(hash || "");

    // Verificar se o salt tem 16 bytes representados em hexadecimal (32 caracteres hexadecimais)
    const saltIsValid = /^[a-f0-9]{32}$/.test(salt || "");

    return (
      tagIsValid &&
      NIsValid &&
      rIsValid &&
      pIsValid &&
      hashIsValid &&
      saltIsValid
    );
  }
}

export const passwordCryptoManager = new PasswordCryptoManager({
  tag: "0000",
  SCRYPT_N: 16384,
  SCRYPT_r: 8,
  SCRYPT_p: 1,
});
