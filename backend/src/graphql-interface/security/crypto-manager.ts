import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { SecurityError } from "../../domain/errors/security.error.js";

interface Props {
  tag: string;
  secret: string;
}
export class CryptoManager {
  private readonly algorithm = "aes-256-ctr";
  private readonly key: Buffer;
  private readonly tag: string;

  constructor({ secret, tag }: Props) {
    // Gera uma chave a partir da string secreta, cortando ou preenchendo para 32 bytes
    this.key = Buffer.alloc(32);
    this.key.write(secret.slice(0, 32));
    this.tag = tag;
  }

  encrypt(text: string): string {
    const iv = randomBytes(16); // Vetor de inicialização único para cada criptografia
    const cipher = createCipheriv(this.algorithm, this.key, iv);
    const encrypted = Buffer.concat([
      cipher.update(text, "utf8"),
      cipher.final(),
    ]);
    return `${this.tag}.${iv.toString("hex")}.${encrypted.toString("hex")}`;
  }

  decrypt(encryptedText: string): string {
    const [tag, iv, content] =
      (encryptedText?.split(".") as [string, string, string]) ?? [];

    if (tag !== this.tag) {
      throw new SecurityError("Criptografia inválida.");
    }

    const decipher = createDecipheriv(
      this.algorithm,
      this.key,
      Buffer.from(iv, "hex"),
    );

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(content, "hex")),
      decipher.final(),
    ]);

    return decrypted.toString("utf8");
  }
}
