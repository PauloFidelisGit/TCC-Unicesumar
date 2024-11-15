import { LOCAL_STORAGE_TOKENS } from "@/domain/enums/TOKENS";
import { ENV } from "@/env";
import { Crypto } from "./crypto";

class HandleLocalStorage {
  private crypto = new Crypto(ENV.VITE_LOCAL_STORAGE_CRYPTO_KEY);

  async setItem(key: LOCAL_STORAGE_TOKENS, value: string) {
    localStorage.setItem(key, await this.crypto.encrypt(value));
  }

  async setAllItems(
    items: [
      LOCAL_STORAGE_TOKENS,
      string,
      options?: {
        encrypt?: boolean;
      },
    ][],
  ) {
    await Promise.all(
      items.map(async ([key, value, options]) => {
        localStorage.setItem(
          key,
          options?.encrypt === undefined
            ? await this.crypto.encrypt(value)
            : value,
        );
      }),
    );
  }

  async getItem(key: LOCAL_STORAGE_TOKENS): Promise<string | null> {
    const encryptedValue = localStorage.getItem(key);
    return encryptedValue
      ? this.crypto.decrypt(encryptedValue).then((decryptedValue) => {
          return decryptedValue;
        })
      : null;
  }

  removeItem(key: LOCAL_STORAGE_TOKENS) {
    localStorage.removeItem(key);
  }

  removeAllItems(keys: LOCAL_STORAGE_TOKENS[]) {
    keys.forEach((key) => localStorage.removeItem(key));
  }
}

export const handleLocalStorage = new HandleLocalStorage();
