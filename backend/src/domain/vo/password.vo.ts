import { z } from "zod";
import { PasswordError } from "../errors/password.error.js";
import { passwordCryptoManager } from "../security/password.manager.js";

export class Password<T extends string | undefined | null> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  isEncrypted(value: string) {
    return passwordCryptoManager.isEncryptedString(value);
  }

  async encrypted() {
    if (typeof this.value === "string") {
      if (this.isEncrypted(this.value)) {
        throw new PasswordError("A senha já está criptografada.");
      }
      this.validate();
      return await passwordCryptoManager.hash(this.value);
    }
    return this.value;
  }

  async compare(storedPassword: string) {
    if (!this.value) {
      throw new PasswordError("A senha criptografada não foi informada.");
    }
    return await passwordCryptoManager.compare(storedPassword, this.value);
  }

  private validate() {
    if (!this.value) return;
    z.string()
      .min(8, {
        message: "Senha deve ter no mínimo 8 caracteres.",
      })
      .max(255, {
        message: "Senha deve ter no máximo 255 caracteres.",
      })
      .parse(this.value);
  }
}
