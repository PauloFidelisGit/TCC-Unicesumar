export class Crypto {
  constructor(public password: string) {
    if (!this.password) {
      throw new Error("password is required");
    }
  }

  async encrypt(plainText: string): Promise<string> {
    if (!plainText) {
      throw new Error("plainText is required");
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(plainText);

    // Derivar chave da senha
    const passwordKey = await crypto.subtle.importKey(
      "raw",
      encoder.encode(this.password),
      { name: "PBKDF2" },
      false,
      ["deriveKey"],
    );

    const salt = crypto.getRandomValues(new Uint8Array(16));

    const derivedKey = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      passwordKey,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt"],
    );

    const iv = crypto.getRandomValues(new Uint8Array(12)); // Vetor de inicialização para AES-GCM

    // Criptografar o texto
    const encryptedData = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
      },
      derivedKey,
      data,
    );

    // Converter para base64 para facilitar o armazenamento
    const encryptedArray = new Uint8Array(encryptedData);
    const encryptedString = btoa(String.fromCharCode(...encryptedArray));
    const ivString = btoa(String.fromCharCode(...iv));
    const saltString = btoa(String.fromCharCode(...salt));

    // Retornar o texto criptografado junto com IV e salt em base64
    return `${saltString}:${ivString}:${encryptedString}`;
  }

  async decrypt(encryptedString: string): Promise<string> {
    const [saltString, ivString, dataString] = encryptedString.split(":");

    // Converter base64 de volta para Uint8Array
    const salt = Uint8Array.from(atob(saltString), (c) => c.charCodeAt(0));
    const iv = Uint8Array.from(atob(ivString), (c) => c.charCodeAt(0));
    const encryptedData = Uint8Array.from(atob(dataString), (c) =>
      c.charCodeAt(0),
    );

    const encoder = new TextEncoder();

    // Derivar chave da senha
    const passwordKey = await crypto.subtle.importKey(
      "raw",
      encoder.encode(this.password),
      { name: "PBKDF2" },
      false,
      ["deriveKey"],
    );

    const derivedKey = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      passwordKey,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"],
    );

    // Descriptografar os dados
    const decryptedData = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv,
      },
      derivedKey,
      encryptedData,
    );

    // Converter Uint8Array de volta para string
    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
  }
}
