import { Datetime } from "../../../../domain/vo/datetime.vo.js";
import { Password } from "../../../../domain/vo/password.vo.js";
import { SeedError } from "../../../errors/seed.error.js";
import {
  adminRepository,
  advogadoRepository,
  classeJudicialRepository,
  municipioRepository,
  orgaoRepository,
  permissaoAdvogadoRepository,
  servicoRepository,
  tribunalRepository,
} from "../repository-injection.js";
import ADVOGADOS from "./data/ADVOGADOS.js";
import CLASSES_JUDICIAIS from "./data/CLASSES_JUDICIAIS.js";
import MUNICIPIOS from "./data/MUNICIPIOS.js";
import ORGAOS_JUDICIAIS from "./data/ORGAOS_JUDICIAIS.js";
import PERMISSOES from "./data/PERMISSOES.js";
import SERVICOS from "./data/SERVICOS.js";
import TRIBUNAIS from "./data/TRIBUNAL.js";

export async function adminSeed() {
  const result = await adminRepository.save({
    uuid: "e9f31096-fd9c-4f58-9830-f8437709c16d",
    criado_em: Datetime.create().toDatabaseTimeStamp,
    nome: "Administrador",
    login: "admin",
    senha: await new Password("12345678").encrypted(),
  });
  if (!result.success) {
    throw new SeedError(result.message);
  }
}

export async function advogadoSeed() {
  const resultAdvogado = await advogadoRepository.save(ADVOGADOS[0]!);
  if (!resultAdvogado.success) {
    throw new SeedError(resultAdvogado.message);
  }
}

export async function municipiosSeed() {
  const result = await municipioRepository.bulkSave(MUNICIPIOS);
  if (!result.success) {
    throw new SeedError(result.message);
  }
}

export async function classesJudiciaisSeed() {
  const result = await classeJudicialRepository.bulkSave(CLASSES_JUDICIAIS);
  if (!result.success) {
    throw new SeedError(result.message);
  }
}

export async function tribunaisSeed() {
  const result = await tribunalRepository.bulkSave(TRIBUNAIS);
  if (!result.success) {
    throw new SeedError(result.message);
  }
}

export async function orgaosSeed() {
  const result = await orgaoRepository.bulkSave(ORGAOS_JUDICIAIS);
  if (!result.success) {
    throw new SeedError(result.message);
  }
}

export async function servicosSeed() {
  const result = await servicoRepository.bulkSave(SERVICOS);
  if (!result.success) {
    throw new SeedError(result.message);
  }
}

export async function permissoesAdvogadoSeed() {
  const result = await permissaoAdvogadoRepository.bulkSave(PERMISSOES);
  if (!result.success) {
    throw new SeedError(result.message);
  }
}
