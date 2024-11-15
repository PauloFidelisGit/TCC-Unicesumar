import { x } from "../../utils/custom-zod.js";

export const relacionamentoCasoProcessoSchema = {
  id: x.number({ label: "id" }).int().positive(),
  uuid: x.uuid({ label: "uuid" }),
  criado_em: x.dateISOString({ label: "criado_em" }),
  atualizado_em: x.dateISOString({ label: "atualizado_em" }),
  caso_uuid: x.uuid({ label: "caso_uuid" }),
  processo_uuid: x.uuid({ label: "processo_uuid" }),
};
