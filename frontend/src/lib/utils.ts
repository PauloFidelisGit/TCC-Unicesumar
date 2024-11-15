import { ERRORS } from "@/domain/enums";
import { CustomErrorAbstract } from "@/domain/errors";
import { ExtensionsType } from "@/domain/errors/extensions.type";
import { ENV } from "@/env";
import { ApolloError } from "@apollo/client";
import { clsx, type ClassValue } from "clsx";
import { GraphQLFormattedError } from "graphql";
import { twMerge } from "tailwind-merge";

/**
 * Combina classes CSS usando clsx e resolve conflitos de classes do Tailwind CSS com twMerge.
 * @param inputs - Classes a serem combinadas.
 * @returns A string de classes combinadas e otimizadas.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Remove chaves vazias de um objeto.
 *
 * Esta função percorre um objeto e remove todas as chaves que possuem valores
 * vazios (string vazia). Se um valor for um objeto, a função será chamada
 * recursivamente para remover chaves vazias desse objeto também.
 *
 * @param obj - O objeto do qual as chaves vazias devem ser removidas.
 * @returns Um novo objeto sem chaves vazias.
 *
 * @template T - O tipo do objeto de entrada.
 */

export function removeEmptyKeysInObject<T extends Record<string, any>>(
  obj: T,
): T {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([, v]) => v !== "")
      .map(([k, v]) => [
        k,
        v && typeof v === "object" && !Array.isArray(v)
          ? removeEmptyKeysInObject(v)
          : v,
      ]),
  ) as T;
}

/**
 * Remove chaves vazias e nulas de um objeto.
 *
 * Esta função percorre um objeto e remove todas as chaves que possuem valores
 * vazios (string vazia) ou nulos. Se um valor for um objeto, a função será chamada
 * recursivamente para remover chaves vazias e nulas desse objeto também.
 *
 * @param obj - O objeto do qual as chaves vazias e nulas devem ser removidas.
 * @returns Um novo objeto sem chaves vazias e nulas.
 *
 * @template T - O tipo do objeto de entrada.
 */
export function removeEmptyAndNullKeysInObject<T extends Record<string, any>>(
  obj: T,
): T {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([, v]) => v !== "" && v !== null)
      .map(([k, v]) => [
        k,
        v && typeof v === "object" && !Array.isArray(v)
          ? removeEmptyAndNullKeysInObject(v)
          : v,
      ]),
  ) as T;
}

/**
 * Recursivamente substitui valores de strings vazias por null em um objeto, incluindo objetos aninhados, mas excluindo arrays.
 * @param obj - O objeto a ser processado.
 * @returns Um novo objeto com strings vazias substituídas por null.
 */
export function nullableEmptyKeysInObject<T extends Record<string, any>>(
  obj: T,
): T {
  // console.log("nullableEmptyKeysInObject: ", obj);

  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      k,
      v === ""
        ? null
        : v && typeof v === "object" && !Array.isArray(v)
          ? nullableEmptyKeysInObject(v)
          : v,
    ]),
  ) as T;
}

type ReplaceNullUndefined<T> = [T] extends [null | undefined]
  ? string
  : T extends (infer U)[]
    ? ReplaceNullUndefined<U>[]
    : T extends object
      ? ReplaceNullAndUndefined<T>
      : Exclude<T, null | undefined>;

type ReplaceNullAndUndefined<T> = {
  [K in keyof T]: ReplaceNullUndefined<T[K]>;
};
export function setBlankStringIfUndefinedOrNull<T extends Record<string, any>>(
  obj: T,
): ReplaceNullAndUndefined<T> {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      k,
      v === undefined || v === null
        ? ""
        : v && typeof v === "object" && !Array.isArray(v)
          ? setBlankStringIfUndefinedOrNull(v)
          : v,
    ]),
  ) as ReplaceNullAndUndefined<T>;
}

/**
 * Valida um número de celular brasileiro.
 * @param numero - Número de telefone a ser validado.
 * @returns True se o número for válido.
 */
export function validatePhoneNumber(numero: string): boolean {
  const clearValue = numero.replace(/[\s()-]/g, "");
  const regex = /^[1-9][0-9]9[0-9]{8}$/;
  return regex.test(clearValue);
}

/**
 * Formata um número de celular no formato (XX) X XXXX-XXXX.
 * @param value - Número de celular sem formatação.
 * @returns Número de celular formatado.
 */
export function formatCellPhoneNumber(value: string) {
  return value.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
}

/**
 * Formata e atualiza o valor do campo de entrada para um número de celular.
 * @param e - Objeto contendo a função onChange e o valor atual do input.
 */
export function formatCellPhoneFromInputValue(e: {
  onChange: (...event: any[]) => void;
  value: string;
}) {
  const value = e.value.replace(/\D/g, "");
  if (value.length > 11) return;
  e.onChange(formatCellPhoneNumber(value));
}

/**
 * Formata um CEP no formato XX.XXX-XXX.
 * @param value - CEP sem formatação.
 * @returns CEP formatado.
 */
export function formatCEP(value: string) {
  return value.replace(/^(\d{2})(\d{3})(\d{3})/, "$1.$2-$3");
}

/**
 * Formata e atualiza o valor do campo de entrada para um CEP.
 * @param e - Objeto contendo a função onChange e o valor atual do input.
 */

export function formatCepFromInputValue(e: {
  onChange: (...event: any[]) => void;
  value: string;
}) {
  const value = e.value.replace(/\D/g, "");
  if (value.length > 8) return;
  e.onChange(formatCEP(value));
}

/**
 * Remove todos os caracteres não numéricos de uma string.
 * @param value - String contendo caracteres que podem não ser numéricos.
 * @returns String contendo apenas números.
 */

export function onlyNumbers(value: string) {
  return value.replace(/\D/g, "");
}

/**
 * Formata um CPF no formato XXX.XXX.XXX-XX.
 * @param value - CPF sem formatação.
 * @returns CPF formatado.
 */

export function formatCPF(value: string) {
  return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function formatCNPJ(value: string) {
  return value.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5",
  );
}

/**
 * Formata e atualiza o valor do campo de entrada para um CPF.
 * @param e - Objeto contendo a função onChange e o valor atual do input.
 */

export function formatCpfFromInputValue(e: {
  onChange: (...event: any[]) => void;
  value: string;
}) {
  const value = e.value.replace(/\D/g, "");
  if (value.length > 11) return;
  e.onChange(formatCPF(value));
}

export function formatCnpjFromInputValue(e: {
  onChange: (...event: any[]) => void;
  value: string;
}) {
  const value = e.value.replace(/\D/g, "");
  if (value.length > 14) return;
  e.onChange(formatCNPJ(value));
}

/**
 * Formata um número de processo no formato 1007573-10.2024.8.11.0015.
 * @param value - Número de processo sem formatação.
 * @returns Número de processo formatado.
 */

export function formatProcessNumber(value: string) {
  // 1007573-10.2024.8.11.0015
  return value.replace(
    /^(\d{7})(\d{2})(\d{4})(\d{1})(\d{1})(\d{4})/,
    "$1-$2.$3.$4.$5.$6",
  );
}

/**
 * Formata e atualiza o valor do campo de entrada para um número de processo.
 * @param e - Objeto contendo a função onChange e o valor atual do input.
 */

export function formatProcessNumberFromInputValue(e: {
  onChange: (...event: any[]) => void;
  value: string;
}) {
  const value = e.value.replace(/\D/g, "");
  if (value.length > 20) return;
  e.onChange(formatProcessNumber(value));
}

/**
 * Formata uma string numérica para o formato de moeda brasileira (BRL) sem estilo adicional.
 * @param number - Número em formato de string a ser formatado.
 * @returns String formatada no padrão de moeda brasileira.
 */

export function currencyNoStyle(number: string) {
  const currencyOptions = {
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  };
  const formatNumber = new Intl.NumberFormat("pt-BR", currencyOptions);
  const value = onlyNumbers(number).padStart(50, "0");
  const dec = value.slice(value.length - 2, value.length);
  const int = value.slice(0, value.length - 2);
  const newValue = +`${int}.${dec}`;
  return formatNumber.format(newValue);
}

/**
 * Formata e atualiza o valor do campo de entrada para o formato de moeda brasileira.
 * @param e - Objeto contendo a função onChange e o valor atual do input.
 */

export function formatCurrencyFromInputValue(e: {
  onChange: (...event: any[]) => void;
  value: string;
}) {
  e.onChange(currencyNoStyle(e.value));
}

/**
 * Constrói uma URL completa baseada em uma URL base, permitindo a adição e remoção de parâmetros de consulta.
 * @param url - Caminho relativo da URL a ser construída.
 * @param options - Opções para manipulação dos parâmetros de consulta.
 * @returns Um objeto contendo o pathname, search e fullPathname da URL completa.
 */

export function getCompleteUrl(
  url: string,
  options?: {
    params?: {
      delete?: string[];
      set?: { key: string; value: string }[];
    };
  },
) {
  const completeUrl = new URL(url, ENV.VITE_APP_BASE_URL);
  if (options?.params?.delete) {
    options.params.delete.forEach((key) => {
      completeUrl.searchParams.delete(key);
    });
  }
  if (options?.params?.set) {
    options.params.set.forEach(({ key, value }) => {
      completeUrl.searchParams.set(key, value);
    });
  }
  return {
    /**
     * @example /dashboard/admin/municipio
     */
    pathname: completeUrl.pathname,
    /**
     * @example ?municipio_uuid=uuid
     */
    search: completeUrl.search,
    /**
     * @example /dashboard/admin/municipio?municipio_uuid=uuid
     */
    fullPathname: completeUrl.pathname + completeUrl.search,
  };
}

/**
 * Valida um CPF brasileiro verificando sua formatação e dígitos verificadores.
 * @param cpf - CPF a ser validado.
 * @returns True se o CPF for válido, caso contrário, false.
 */

export function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]/g, "");

  if (cpf.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  // Validação do primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  let digitoVerificador = resto === 10 || resto === 11 ? 0 : resto;
  if (digitoVerificador !== parseInt(cpf.charAt(9))) {
    return false;
  }

  // Validação do segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  digitoVerificador = resto === 10 || resto === 11 ? 0 : resto;
  if (digitoVerificador !== parseInt(cpf.charAt(10))) {
    return false;
  }

  return true;
}

/**
 * Valida um CNPJ brasileiro verificando sua formatação e dígitos verificadores.
 * @param cnpj - CNPJ a ser validado.
 * @returns True se o CNPJ for válido, caso contrário, false.
 */

export function validateCNPJ(cnpj: string): boolean {
  // Remover caracteres especiais
  cnpj = cnpj.replace(/[^\d]+/g, "");

  // Verificar se possui 14 dígitos
  if (cnpj.length !== 14) {
    return false;
  }

  // Verificar se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  // Validar os dígitos verificadores
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (resultado !== parseInt(digitos.charAt(0))) {
    return false;
  }

  tamanho += 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (resultado !== parseInt(digitos.charAt(1))) {
    return false;
  }

  return true;
}

/**
 * Refine para validação de CPF em esquemas Zod.
 * @example [validateCPF, { message: "CPF inválido." }]
 * @example .refine(...validateCPFToZodRefine)
 */

export const validateCPFToZodRefine = [
  (cpf: string) => {
    return validateCPF(onlyNumbers(cpf));
  },
  {
    message: "CPF inválido.",
  },
] as const;

/**
 * Refine para validação de CNPJ em esquemas Zod.
 * @example [validateCNPJ, { message: "CNPJ inválido." }]
 * @example .refine(...validateCNPJToZodRefine)
 */

export const validateCNPJToZodRefine = [
  (cnpj: string) => {
    return validateCNPJ(onlyNumbers(cnpj));
  },
  {
    message: "CNPJ inválido.",
  },
] as const;

export function nullableFieldArrayIfEmpty(
  value: { value: string }[] | undefined,
  transformValue?: (value: any) => any,
) {
  return (value?.length || 0) > 0
    ? value?.map((v) => (transformValue ? transformValue(v.value) : v.value))
    : null;
}

export function copyToClipboard(data: string) {
  navigator.clipboard.writeText(data);
}

export function formatApolloError(error: ApolloError | undefined) {
  let formatedErrors: { message: string }[] = [];

  if (error instanceof ApolloError) {
    const extensions = error?.cause?.extensions as ExtensionsType;

    switch (extensions?.code) {
      case ERRORS.VALIDATION_ERROR: {
        extensions?.errors?.map(({ message }) => {
          formatedErrors.push({ message });
        });
        break;
      }
      case ERRORS.UNAUTHORIZED_ERROR: {
        formatedErrors.push({ message: error.message });
        break;
      }
      case ERRORS.USE_CASE_ERROR: {
        formatedErrors.push({ message: error.message });
        break;
      }
      default:
        break;
    }

    // Remove duplicatas
    formatedErrors = Array.from(new Set(formatedErrors));
  }

  return formatedErrors;
}

export function formatFrontEndErrors(error: CustomErrorAbstract) {
  const formatedErrors: { message: string }[] = [
    {
      message: error.message,
    },
  ];
  return formatedErrors;
}

/*
@input
	{
		"errors":[
				{
					"message":"Erro de validação",
					"extensions":{
							"code":"VALIDATION_ERROR",
							"errors":[
								{
										"message":"O campo 'data_abertura' deve ser uma data válida."
								}
							]
					}
				}
		],
		"data":{
				"updateCaso":null
		}
	}

@output
	{ message: string }[]
*/
export function formatGraphQLFormattedError(
  errors: readonly GraphQLFormattedError[] | undefined,
) {
  let formatedErrors: { message: string }[] = [];

  errors?.map((error) => {
    const extensions = error?.extensions as ExtensionsType;

    switch (extensions.code) {
      case ERRORS.USE_CASE_ERROR:
        extensions?.errors?.map(({ message }) => {
          formatedErrors.push({ message });
        });
        break;
      case "BAD_USER_INPUT":
        formatedErrors.push({ message: error.message });
        break;
      default:
        extensions.errors?.map(({ message }) => {
          formatedErrors.push({ message });
        });
        break;
    }
  });

  // Remove duplicatas
  formatedErrors = Array.from(new Set(formatedErrors));

  return formatedErrors;
}
