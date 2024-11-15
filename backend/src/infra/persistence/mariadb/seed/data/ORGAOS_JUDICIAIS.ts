import { Datetime } from "../../../../../domain/vo/datetime.vo.js";

const data = [
  {
    uuid: "aa288bc7-c45f-414d-a2f4-0ec5b1ab1f37",
    nome: "1ª Vara Cível da Comarca de Sinop/MT",
    municipio_uuid: "6e6aca2d-c412-4e80-ae0c-a0190797ab37",
    tribunal_uuid: "dbf93be0-a3dd-4f1d-b821-28f349023757",
  },
  {
    uuid: "6c43d026-7713-48c8-b902-586b553db799",
    nome: "2ª Vara Cível da Comarca de Sinop/MT",
    municipio_uuid: "6e6aca2d-c412-4e80-ae0c-a0190797ab37",
    tribunal_uuid: "dbf93be0-a3dd-4f1d-b821-28f349023757",
  },
  {
    uuid: "7c3c231a-1259-4f89-b002-4cc3a9a36cef",
    nome: "3ª Vara Cível da Comarca de Sinop/MT",
    municipio_uuid: "6e6aca2d-c412-4e80-ae0c-a0190797ab37",
    tribunal_uuid: "dbf93be0-a3dd-4f1d-b821-28f349023757",
  },
  {
    uuid: "144a3822-a11c-4d7b-933c-e31eadbddf50",
    nome: "4ª Vara Cível da Comarca de Sinop/MT",
    municipio_uuid: "6e6aca2d-c412-4e80-ae0c-a0190797ab37",
    tribunal_uuid: "dbf93be0-a3dd-4f1d-b821-28f349023757",
  },
  {
    uuid: "90a911ff-a89e-4f4e-9b49-4b64d3507b88",
    nome: "Vara Especializada de Família e Sucessões da Comarca de Sinop/MT",
    municipio_uuid: "6e6aca2d-c412-4e80-ae0c-a0190797ab37",
    tribunal_uuid: "dbf93be0-a3dd-4f1d-b821-28f349023757",
  },
  {
    uuid: "05bbf2cf-2cb3-4199-9c6c-cd34d32fbb4f",
    nome: "Vara Especializada da Infância e Juventude da Comarca de Sinop/MT",
    municipio_uuid: "6e6aca2d-c412-4e80-ae0c-a0190797ab37",
    tribunal_uuid: "dbf93be0-a3dd-4f1d-b821-28f349023757",
  },
  {
    uuid: "61ec12e2-3632-4a34-9de4-d8f84e79d09f",
    nome: "Vara Especializada da Fazenda Pública da Comarca de Sinop/MT",
    municipio_uuid: "6e6aca2d-c412-4e80-ae0c-a0190797ab37",
    tribunal_uuid: "dbf93be0-a3dd-4f1d-b821-28f349023757",
  },
  {
    uuid: "84ba4812-9217-4e65-8139-fc7520a01151",
    nome: "Juizado Especial Cível e Criminal da Comarca de Sinop/MT",
    municipio_uuid: "6e6aca2d-c412-4e80-ae0c-a0190797ab37",
    tribunal_uuid: "dbf93be0-a3dd-4f1d-b821-28f349023757",
  },
  {
    uuid: "92e64fbe-e955-47f4-b3c4-cd034261c19d",
    nome: "1ª Vara do Trabalho de Sinop/MT",
    municipio_uuid: "6e6aca2d-c412-4e80-ae0c-a0190797ab37",
    tribunal_uuid: "dbf93be0-a3dd-4f1d-b821-28f349023757",
  },
  {
    uuid: "918bb6de-2beb-40fb-b3b2-8a0f774003cd",
    nome: "2ª Vara do Trabalho de Sinop/MT",
    municipio_uuid: "6e6aca2d-c412-4e80-ae0c-a0190797ab37",
    tribunal_uuid: "dbf93be0-a3dd-4f1d-b821-28f349023757",
  },
  {
    uuid: "9b418a88-b6b5-4b32-985a-1c593183c595",
    nome: "1ª Vara Federal de Sinop/MT",
    municipio_uuid: "6e6aca2d-c412-4e80-ae0c-a0190797ab37",
    tribunal_uuid: "dbf93be0-a3dd-4f1d-b821-28f349023757",
  },
  {
    uuid: "bd942d62-4d8f-423d-ad68-8c5ba9c22486",
    nome: "2ª Vara Federal de Sinop/MT",
    municipio_uuid: "6e6aca2d-c412-4e80-ae0c-a0190797ab37",
    tribunal_uuid: "dbf93be0-a3dd-4f1d-b821-28f349023757",
  },
] as const;

const ORGAOS_JUDICIAIS: {
  uuid: string;
  criado_em: Datetime<string>["toDatabaseTimeStamp"];
  nome: string;
  tribunal_uuid: string;
  municipio_uuid: string;
}[] = [];

let i = 1;

for (const orgao of data) {
  const values: (typeof ORGAOS_JUDICIAIS)[number] = {
    uuid: orgao.uuid,
    criado_em: Datetime.create().toDatabaseTimeStamp,
    nome: orgao.nome,
    municipio_uuid: orgao.municipio_uuid,
    tribunal_uuid: orgao.tribunal_uuid,
  };
  ORGAOS_JUDICIAIS.push(values);
  i++;
}

export default ORGAOS_JUDICIAIS;
