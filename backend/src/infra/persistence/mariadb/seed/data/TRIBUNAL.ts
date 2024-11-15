import { Datetime } from "../../../../../domain/vo/datetime.vo.js";

const data = [
  {
    uuid: "5d397147-9482-4e18-8848-42f3f5c41c67",
    nome: "Supremo Tribunal Federal (STF)",
  },
  {
    uuid: "9cbb5ddb-50de-4574-b4fc-fd38bafcb462",
    nome: "Superior Tribunal de Justiça (STJ)",
  },
  {
    uuid: "f915efaf-3837-457b-a599-e51db3bfac4b",
    nome: "Tribunal Superior do Trabalho (TST)",
  },
  {
    uuid: "c579624e-250f-4547-8a19-9e9e3402d7eb",
    nome: "Tribunal Superior Eleitoral (TSE)",
  },
  {
    uuid: "965a7139-3879-4c3e-a81d-a4fc197c92e9",
    nome: "Superior Tribunal Militar (STM)",
  },
  {
    uuid: "ca527172-0351-4e56-94ed-90be3a705ab4",
    nome: "Tribunal Regional Federal da 1ª Região (TRF1)",
  },
  {
    uuid: "f21de6cd-8732-41f0-af36-6baf95b70404",
    nome: "Tribunal Regional Federal da 2ª Região (TRF2)",
  },
  {
    uuid: "212b3e6e-3d51-4d93-b2ea-95e46cd96fce",
    nome: "Tribunal Regional Federal da 3ª Região (TRF3)",
  },
  {
    uuid: "94ae6482-405e-4529-b174-fbecd393367f",
    nome: "Tribunal Regional Federal da 4ª Região (TRF4)",
  },
  {
    uuid: "a99c38ed-b3fa-4751-8222-6a301b7c7b5b",
    nome: "Tribunal Regional Federal da 5ª Região (TRF5)",
  },
  {
    uuid: "c1400a03-d6eb-432f-9eb1-648dd154895f",
    nome: "Tribunal Regional Federal da 6ª Região (TRF6)",
  },
  {
    uuid: "1096384d-657c-4a8b-87ce-867cb43027dd",
    nome: "Tribunal Regional do Trabalho da 1ª Região (TRT1)",
  },
  {
    uuid: "25d71d6b-e8b8-44bf-8c38-f98ccf8f5ccc",
    nome: "Tribunal Regional do Trabalho da 2ª Região (TRT2)",
  },
  {
    uuid: "6cde82e2-b932-4b34-809b-b71740856ed9",
    nome: "Tribunal Regional do Trabalho da 3ª Região (TRT3)",
  },
  {
    uuid: "2d5c8e2d-63fe-4fa2-b738-0db87cafb4f3",
    nome: "Tribunal Regional do Trabalho da 4ª Região (TRT4)",
  },
  {
    uuid: "97f0a338-8f0b-4654-9bd7-f5e92c88c1b2",
    nome: "Tribunal Regional do Trabalho da 5ª Região (TRT5)",
  },
  {
    uuid: "2aaf997a-7f5b-44c5-ac07-02a01ad678ed",
    nome: "Tribunal Regional do Trabalho da 6ª Região (TRT6)",
  },
  {
    uuid: "aedbb004-6100-4558-b887-a0d3fde1445a",
    nome: "Tribunal Regional do Trabalho da 7ª Região (TRT7)",
  },
  {
    uuid: "8c6e1c60-d0b1-48be-8962-26d8bd48a59d",
    nome: "Tribunal Regional do Trabalho da 8ª Região (TRT8)",
  },
  {
    uuid: "4d64dfa3-c319-4920-a6a4-179e547926e6",
    nome: "Tribunal Regional do Trabalho da 9ª Região (TRT9)",
  },
  {
    uuid: "60211371-c653-45fa-ac7c-e38f3cbeb16e",
    nome: "Tribunal Regional do Trabalho da 10ª Região (TRT10)",
  },
  {
    uuid: "82ea5e3a-5bdd-4468-a3d1-f2161d4d999b",
    nome: "Tribunal Regional do Trabalho da 11ª Região (TRT11)",
  },
  {
    uuid: "f137a25c-6457-431c-b216-8521c297cf7e",
    nome: "Tribunal Regional do Trabalho da 12ª Região (TRT12)",
  },
  {
    uuid: "b5e51b10-ce70-4f9a-ba68-9e34a8b5a79f",
    nome: "Tribunal Regional do Trabalho da 13ª Região (TRT13)",
  },
  {
    uuid: "a89fb5c1-acc8-481c-9d4f-dffc07c01274",
    nome: "Tribunal Regional do Trabalho da 14ª Região (TRT14)",
  },
  {
    uuid: "df67d50c-0300-4499-87ae-8c367f0ba904",
    nome: "Tribunal Regional do Trabalho da 15ª Região (TRT15)",
  },
  {
    uuid: "1cffa0b1-66e4-44be-bd47-b946f4962767",
    nome: "Tribunal Regional do Trabalho da 16ª Região (TRT16)",
  },
  {
    uuid: "1808e03b-6e4d-41f3-ade7-26d7500aebcb",
    nome: "Tribunal Regional do Trabalho da 17ª Região (TRT17)",
  },
  {
    uuid: "09b32de4-4256-4822-9397-3cc5e344f972",
    nome: "Tribunal Regional do Trabalho da 18ª Região (TRT18)",
  },
  {
    uuid: "9ff7b9d6-2cee-4a82-9d9e-0b6a8e954903",
    nome: "Tribunal Regional do Trabalho da 19ª Região (TRT19)",
  },
  {
    uuid: "36e7d86f-9884-47ee-9a86-85541d437462",
    nome: "Tribunal Regional do Trabalho da 20ª Região (TRT20)",
  },
  {
    uuid: "3b098d43-de94-412e-9b14-4ff715167a18",
    nome: "Tribunal Regional do Trabalho da 21ª Região (TRT21)",
  },
  {
    uuid: "a68e6da2-ac7f-478f-948d-8ac72b0ae500",
    nome: "Tribunal Regional do Trabalho da 22ª Região (TRT22)",
  },
  {
    uuid: "e243c36f-0da8-47a8-a70c-859e0e57b12e",
    nome: "Tribunal Regional do Trabalho da 23ª Região (TRT23)",
  },
  {
    uuid: "78a935a6-2cee-4884-9a6f-a977820aab1b",
    nome: "Tribunal Regional do Trabalho da 24ª Região (TRT24)",
  },
  {
    uuid: "1e037b5e-5932-4949-8740-9f94d63c8efc",
    nome: "Tribunal Regional Eleitoral do Acre (TRE-AC)",
  },
  {
    uuid: "aed8ab4a-f7ce-4ab1-8cb9-344250539e85",
    nome: "Tribunal Regional Eleitoral de Alagoas (TRE-AL)",
  },
  {
    uuid: "37e0c23e-7710-4b46-9553-8df60965efb0",
    nome: "Tribunal Regional Eleitoral do Amapá (TRE-AP)",
  },
  {
    uuid: "d6ea7372-238b-4fc1-be24-be1bb2f9bfc5",
    nome: "Tribunal Regional Eleitoral do Amazonas (TRE-AM)",
  },
  {
    uuid: "8b540ae3-50ea-4347-99b2-2fec1861e9ef",
    nome: "Tribunal Regional Eleitoral da Bahia (TRE-BA)",
  },
  {
    uuid: "6d17f3bb-97bb-40bf-ad45-56a3f2f67307",
    nome: "Tribunal Regional Eleitoral do Ceará (TRE-CE)",
  },
  {
    uuid: "66796b1c-6dbb-4e63-99ec-406c24566e97",
    nome: "Tribunal Regional Eleitoral do Distrito Federal (TRE-DF)",
  },
  {
    uuid: "d5ac7154-01ce-483d-8890-5fc50d860c44",
    nome: "Tribunal Regional Eleitoral do Espírito Santo (TRE-ES)",
  },
  {
    uuid: "2e3ac254-6f35-49b4-9427-20cc44632a8d",
    nome: "Tribunal Regional Eleitoral de Goiás (TRE-GO)",
  },
  {
    uuid: "72a137b7-ac4c-4f5c-8ef7-39ffe1c0847d",
    nome: "Tribunal Regional Eleitoral do Maranhão (TRE-MA)",
  },
  {
    uuid: "708ad2ba-f40f-4ec0-b8bf-4f4bded53b5f",
    nome: "Tribunal Regional Eleitoral de Minas Gerais (TRE-MG)",
  },
  {
    uuid: "e53cea5e-cf8e-4c6c-bd3f-3285ccf5da15",
    nome: "Tribunal Regional Eleitoral do Mato Grosso do Sul (TRE-MS)",
  },
  {
    uuid: "5bc6caed-6f91-4ff7-b295-428d49457207",
    nome: "Tribunal Regional Eleitoral do Mato Grosso (TRE-MT)",
  },
  {
    uuid: "84463075-c612-496e-a691-0f9fce664305",
    nome: "Tribunal Regional Eleitoral do Pará (TRE-PA)",
  },
  {
    uuid: "f0c4b223-f0ed-4a9c-87fc-b27078ba0837",
    nome: "Tribunal Regional Eleitoral da Paraíba (TRE-PB)",
  },
  {
    uuid: "de023b9a-a79f-4101-a01e-d5dafd2ad8bf",
    nome: "Tribunal Regional Eleitoral de Pernambuco (TRE-PE)",
  },
  {
    uuid: "e0adbc55-a473-49df-95d3-08b2debd6f67",
    nome: "Tribunal Regional Eleitoral do Piauí (TRE-PI)",
  },
  {
    uuid: "3efc04fa-42e8-4caa-8865-8cf24bffe2f8",
    nome: "Tribunal Regional Eleitoral do Paraná (TRE-PR)",
  },
  {
    uuid: "b3583984-30e1-460c-94ad-7a11834de021",
    nome: "Tribunal Regional Eleitoral do Rio de Janeiro (TRE-RJ)",
  },
  {
    uuid: "2cfc55e9-abd9-4d73-85b5-2de7f0e9c097",
    nome: "Tribunal Regional Eleitoral do Rio Grande do Norte (TRE-RN)",
  },
  {
    uuid: "d338fcc3-2344-4143-a580-6e4779bf413c",
    nome: "Tribunal Regional Eleitoral de Rondônia (TRE-RO)",
  },
  {
    uuid: "257e226a-c02f-4af7-b88b-bd5efafb3f2c",
    nome: "Tribunal Regional Eleitoral de Roraima (TRE-RR)",
  },
  {
    uuid: "e40d4223-930a-4b36-9f8e-3c5e69a0a46b",
    nome: "Tribunal Regional Eleitoral do Rio Grande do Sul (TRE-RS)",
  },
  {
    uuid: "9184b331-3184-40be-b3a8-00785b0d41a6",
    nome: "Tribunal Regional Eleitoral de Santa Catarina (TRE-SC)",
  },
  {
    uuid: "3bf0dde2-d38a-4518-ba14-57b5d0fd25fe",
    nome: "Tribunal Regional Eleitoral de Sergipe (TRE-SE)",
  },
  {
    uuid: "255dcc07-71a3-44c6-afdb-1c15f8d05b3e",
    nome: "Tribunal Regional Eleitoral de São Paulo (TRE-SP)",
  },
  {
    uuid: "56a918ed-b4e2-4415-9c5a-2f7830dd9e10",
    nome: "Tribunal Regional Eleitoral de Tocantins (TRE-TO)",
  },
  {
    uuid: "93c08121-c85d-4dc3-bdad-c7327cc55335",
    nome: "Tribunal de Justiça do Acre (TJ-AC)",
  },
  {
    uuid: "6edbbbb0-682a-4a7c-a4c4-3fa5738e61f4",
    nome: "Tribunal de Justiça de Alagoas (TJ-AL)",
  },
  {
    uuid: "56b6890e-fc89-408f-ae74-f28f5c4898be",
    nome: "Tribunal de Justiça do Amapá (TJ-AP)",
  },
  {
    uuid: "eca76b3d-c03c-4f61-8d1c-6ecb516767f3",
    nome: "Tribunal de Justiça do Amazonas (TJ-AM)",
  },
  {
    uuid: "6efb924d-d7da-493c-b359-2f8e8b364b3f",
    nome: "Tribunal de Justiça da Bahia (TJ-BA)",
  },
  {
    uuid: "d9f3afa0-55c9-4abe-ab90-4e8f959a0f34",
    nome: "Tribunal de Justiça do Ceará (TJ-CE)",
  },
  {
    uuid: "58275d6b-1e9e-41d2-abcb-727d39f92fbb",
    nome: "Tribunal de Justiça do Distrito Federal e dos Territórios (TJDFT)",
  },
  {
    uuid: "1b0fb083-516f-49e2-8a70-01330282a8ec",
    nome: "Tribunal de Justiça do Espírito Santo (TJ-ES)",
  },
  {
    uuid: "7049b44c-4e35-4765-b57d-62bee76faca3",
    nome: "Tribunal de Justiça de Goiás (TJ-GO)",
  },
  {
    uuid: "ea71af04-7382-4f06-9009-09eee4595693",
    nome: "Tribunal de Justiça do Maranhão (TJ-MA)",
  },
  {
    uuid: "b28d3bae-c78c-4553-82dd-0827caaac483",
    nome: "Tribunal de Justiça de Minas Gerais (TJ-MG)",
  },
  {
    uuid: "5896af89-eb9b-4607-8cec-24940803a0f2",
    nome: "Tribunal de Justiça do Mato Grosso do Sul (TJ-MS)",
  },
  {
    uuid: "dbf93be0-a3dd-4f1d-b821-28f349023757",
    nome: "Tribunal de Justiça do Mato Grosso (TJ-MT)",
  },
  {
    uuid: "5989f80b-116e-48eb-9421-5c9a44a05524",
    nome: "Tribunal de Justiça do Pará (TJ-PA)",
  },
  {
    uuid: "fa1302ab-bd36-4016-a1a9-4e46eabcbb84",
    nome: "Tribunal de Justiça da Paraíba (TJ-PB)",
  },
  {
    uuid: "5e4fb679-b2f0-4f76-8283-f5c9d8e38f69",
    nome: "Tribunal de Justiça de Pernambuco (TJ-PE)",
  },
  {
    uuid: "8efb6c69-865c-4275-89fb-e8e5029dee2f",
    nome: "Tribunal de Justiça do Piauí (TJ-PI)",
  },
  {
    uuid: "39aaafab-accc-4dd8-bebb-e0fa06d94770",
    nome: "Tribunal de Justiça do Paraná (TJ-PR)",
  },
  {
    uuid: "e6c73829-9b35-4a44-bcb1-328b27e8b86b",
    nome: "Tribunal de Justiça do Rio de Janeiro (TJ-RJ)",
  },
  {
    uuid: "0e9cd4c4-060e-40fe-8de7-c8f932e378b9",
    nome: "Tribunal de Justiça do Rio Grande do Norte (TJ-RN)",
  },
  {
    uuid: "d383c811-c5ab-4784-8f78-ad737239a6bc",
    nome: "Tribunal de Justiça de Rondônia (TJ-RO)",
  },
  {
    uuid: "9477253f-6eeb-4582-bd6e-4a9218450dce",
    nome: "Tribunal de Justiça de Roraima (TJ-RR)",
  },
  {
    uuid: "cb049e0e-f30a-487c-a1ba-1cebe36ebe04",
    nome: "Tribunal de Justiça do Rio Grande do Sul (TJ-RS)",
  },
  {
    uuid: "5fec3ac0-5ed6-413a-8632-0ef9fb7fa6be",
    nome: "Tribunal de Justiça de Santa Catarina (TJ-SC)",
  },
  {
    uuid: "bc93e596-d62f-4f10-b0cd-63eb61c3481d",
    nome: "Tribunal de Justiça de Sergipe (TJ-SE)",
  },
  {
    uuid: "68db3e29-c0b7-46b0-8a27-07d245d3451d",
    nome: "Tribunal de Justiça de São Paulo (TJ-SP)",
  },
  {
    uuid: "7f7602af-8cd3-425c-a8bb-4de072b26bca",
    nome: "Tribunal de Justiça de Tocantins (TJ-TO)",
  },
  {
    uuid: "343fb3ab-15d3-48f2-b791-4a9bdc8747a6",
    nome: "Tribunal de Justiça Militar do Estado de São Paulo (TJMSP)",
  },
  {
    uuid: "94acd1fc-407b-495d-b536-68a20912222c",
    nome: "Tribunal de Justiça Militar de Minas Gerais (TJMMG)",
  },
  {
    uuid: "3159b323-86e8-405b-88d7-1c23e6e30a4c",
    nome: "Tribunal de Justiça Militar do Rio Grande do Sul (TJMRS)",
  },
];

const TRIBUNAIS: {
  uuid: string;
  criado_em: Datetime<string>["toDatabaseTimeStamp"];
  nome: string;
}[] = [];

let i = 1;

for (const orgao of data) {
  const values: (typeof TRIBUNAIS)[number] = {
    uuid: orgao.uuid,
    criado_em: Datetime.create().toDatabaseTimeStamp,
    nome: orgao.nome,
  };
  TRIBUNAIS.push(values);
  i++;
}

export default TRIBUNAIS;
