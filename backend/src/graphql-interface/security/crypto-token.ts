import { ENV } from "../../env.js";
import { CryptoManager } from "./crypto-manager.js";

interface Props {
  secret: string;
}
class CryptoToken {
  crypto: CryptoManager;

  constructor({ secret }: Props) {
    this.crypto = new CryptoManager({ secret, tag: "1111" });
  }

  encrypt(object: Record<string, any>): string {
    return this.crypto.encrypt(JSON.stringify(object));
  }

  decrypt<T extends Token<Record<string, any>>>(encrypted: string): T {
    return JSON.parse(this.crypto.decrypt(encrypted));
  }

  createToken(
    object: Record<string, any>,
    options?: {
      minutes?: number;
    },
  ): string {
    return this.encrypt({
      exp: Date.now() * (options?.minutes || 60),
      createAt: Date.now(),
      ...object,
    });
  }

  renewToken(token: string, minutes?: number): string {
    const object = this.decrypt(token);
    return this.createToken(object, { minutes });
  }

  isExpired(token: string): boolean {
    const { exp } = this.decrypt(token);
    return Date.now() > exp;
  }
}

export type Token<T = Record<string, any>> = {
  exp: number;
  createAt: number;
} & T;

export const cryptoToken = new CryptoToken({
  secret: ENV.CRYPTO_TOKEN_SECRET,
});
