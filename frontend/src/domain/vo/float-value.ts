export class FloatValue<T extends number | undefined | null> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  /**
   * @input "1.234,56" or 1234.56
   */
  static fromString(value: string | undefined | null) {
    const regexBr = /^[0-9]{1,3}(?:\.[0-9]{3})*,[0-9]{2,20}$/;
    const regexDecimal = /^\d{1,9}\.\d{2}$/;

    if (value && regexBr.test(value)) {
      const whitOutDot = value.replace(/\./g, "");
      const whitDotDec = whitOutDot.replace(",", ".");
      const result = +parseFloat(whitDotDec);
      return new FloatValue(result);
    } else if (value && regexDecimal.test(value)) {
      return new FloatValue(+value);
    }

    throw new Error("Valor inválido.");
  }

  /**
   * @input "R$ 1.234,56"
   */
  static fromCurrencyString(value: string | undefined | null) {
    if (value) {
      const cleanValue = value.replace("R$", "").trim();
      return this.fromString(cleanValue);
    }
    throw new Error("Valor inválido.");
  }

  /**
   * @description Recebe um valor em string e retorna
   * um objeto Money com o valor convertido para float.
   * Se o valor for nulo ou indefinido, retorna um objeto Money com valor 0.
   */
  static parseFloatOrZero(value: string | undefined | null) {
    if (value) {
      return this.fromString(value);
    }
    return new FloatValue(0);
  }

  /**
   * @output "1.234,56"
   */
  formatDecimalBr() {
    if (typeof this.value !== "number") return this.value as Exclude<T, number>;
    return new Intl.NumberFormat("pt-BR", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(this.value);
  }

  /**
   * Formata o valor para moeda brasileira (BRL).
   * @returns this para permitir o encadeamento.
   * @example "R$ 9.000,01"
   */
  get currency() {
    if (typeof this.value !== "number") return this.value as Exclude<T, number>;
    const formatValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(this.value);
    return formatValue;
  }
}
