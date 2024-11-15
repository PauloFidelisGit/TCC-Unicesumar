import { Datetime } from "../../../../../domain/vo/datetime.vo.js";

const data = [
  {
    uuid: "c3152d62-3010-482d-90bf-493b6d5c5c5c",
    codigo: "386",
    label: "Execução da Pena",
  },
  {
    uuid: "6e05799c-4c73-4f98-9d44-8240a45c6ee3",
    codigo: "11399",
    label: "Execução de Medida de Segurança",
  },
  {
    uuid: "b99962f0-05ac-4b8f-a311-0e83f97748f1",
    codigo: "12729",
    label: "Execução de Medidas Alternativas no Juízo Comum",
  },
  {
    uuid: "b71c5a92-0c6f-4ec9-87d4-b33bdf4bc83b",
    codigo: "14696",
    label: "Execução de Medidas Alternativas nos Juizados Especiais",
  },
  {
    uuid: "6d50150c-546c-4fa1-9ffb-4c090c0b7d7f",
    codigo: "12727",
    label: "Execução de Pena de Multa",
  },
  {
    uuid: "062b34ff-1be7-48b8-8f04-4f923693dd82",
    codigo: "1714",
    label: "Execução Provisória",
  },
  {
    uuid: "9b3c1927-44a1-4610-a56c-5c9ba303bb3a",
    codigo: "406",
    label: "Incidentes",
  },
  {
    uuid: "5e36bc27-4fce-46be-9777-fb1b1e4809e3",
    codigo: "409",
    label: "Anistia",
  },
  {
    uuid: "c3984971-44d3-4903-a7f0-daebcea8ba45",
    codigo: "411",
    label: "Comutação de Pena",
  },
  {
    uuid: "3bd89aa9-003e-4941-86a6-eb16f0c71875",
    codigo: "407",
    label: "Conversão de Pena",
  },
  {
    uuid: "cd36e1c8-b9c1-451f-8b1a-4d8fdd4ad313",
    codigo: "408",
    label: "Excesso ou Desvio",
  },
  {
    uuid: "39003a6d-f9cb-412a-bdeb-fbdea93bd56f",
    codigo: "410",
    label: "Indulto",
  },
  {
    uuid: "e70cc6cd-ee61-4f60-a480-577869250778",
    codigo: "12128",
    label: "Livramento Condicional",
  },
  {
    uuid: "b9c25490-dba1-4362-bffe-d68e149d85eb",
    codigo: "12129",
    label: "Outros Incidentes de Execução Iniciados de Ofício",
  },
  {
    uuid: "8cba2efb-885a-4bc1-84f8-d0d2ac829c2d",
    codigo: "12125",
    label: "Progressão de Regime",
  },
  {
    uuid: "bfe98cca-dff6-4ae0-ba31-c2f7c3d3f920",
    codigo: "12126",
    label: "Regressão de Regime",
  },
  {
    uuid: "262fdd48-ebb8-41d0-a6ff-372ac44fda44",
    codigo: "12127",
    label: "Remição",
  },
  {
    uuid: "434b2df7-2139-470c-aa52-a1facd6578b5",
    codigo: "11957",
    label: "Remição de Pena",
  },
  {
    uuid: "3d17489a-cc8e-4397-99b7-63d69a5119a7",
    codigo: "12089",
    label: "Renovação de Permanência em Estabelecimento Penal Federal",
  },
  {
    uuid: "5465e88a-24cf-4970-86f6-da9b4e8ceba0",
    codigo: "12123",
    label: "Roteiro de Pena",
  },
  {
    uuid: "600005e0-720c-4e1d-88a6-9ba8f0642588",
    codigo: "12124",
    label: "Roteiro de Pena",
  },
  {
    uuid: "f832e217-252b-47a6-8e1d-7faf2ed5a463",
    codigo: "1283",
    label: "Superveniência de doença mental",
  },
  {
    uuid: "747a3521-0f10-4e02-9b8e-b104ac25c65d",
    codigo: "1288",
    label: "Transferência entre estabelecimentos penais",
  },
  {
    uuid: "714d1cfb-05f3-4c3c-a0f1-55ba85ac25f4",
    codigo: "1284",
    label: "Unificação de penas",
  },
  {
    uuid: "b5d30745-9f90-44d3-8dcd-30e51b761fa9",
    codigo: "12728",
    label: "Transferência Entre Estabelecimentos Penais",
  },
  {
    uuid: "e7ac66f7-e8ec-493b-a954-6bcfa6fc8cae",
    codigo: "11894",
    label: "Comissão",
  },
  {
    uuid: "826f35f2-8b56-4deb-a55f-43916631cb48",
    codigo: "11887",
    label: "Acompanhamento de Cumprimento de Decisão",
  },
  {
    uuid: "ce063a41-ef6e-4374-918e-2d8d9b2e419e",
    codigo: "11953",
    label: "Arguição de Suspeição e de Impedimento",
  },
  {
    uuid: "286f605e-5ba7-4883-beb5-0879baa9bc40",
    codigo: "11888",
    label: "Ato Normativo",
  },
  {
    uuid: "ed421804-61bb-4ac4-bb30-8f197b670f53",
    codigo: "15240",
    label: "Auditoria",
  },
  {
    uuid: "01acee18-456a-44be-9d9f-df8a7ac6a25e",
    codigo: "15241",
    label: "Avaliação de Obras",
  },
  {
    uuid: "31d99676-d037-48d8-a3f0-b3d36303e94f",
    codigo: "1680",
    label: "Consulta Administrativa",
  },
  {
    uuid: "607ddc7f-7e49-4d09-8cd1-c1a65034eccf",
    codigo: "1303",
    label: "Correição Extraordinária",
  },
  {
    uuid: "adee53a0-d63f-4e11-b1e1-add8d303246d",
    codigo: "1307",
    label: "Correição Ordinária",
  },
  {
    uuid: "0aadcc47-84ca-486c-8340-2523f9ba810f",
    codigo: "88",
    label: "Correição Parcial ou Reclamação Correicional",
  },
  {
    uuid: "38818f5d-79e5-45c1-8e50-280743ce508b",
    codigo: "1304",
    label: "Inspeção",
  },
  {
    uuid: "09e7b430-c533-4d9d-97dc-d981bb91a027",
    codigo: "15243",
    label: "Monitoramento de Auditorias e Obras",
  },
  {
    uuid: "5963979e-7929-4ead-a39e-bd638a6ab333",
    codigo: "11889",
    label: "Nota Técnica",
  },
  {
    uuid: "e7aadcd0-afb1-4345-933b-8cc87e694583",
    codigo: "11890",
    label: "Parecer de Mérito sobre Anteprojeto de Lei",
  },
  {
    uuid: "ec7c7bb7-2589-484e-a120-ad2b59319dd8",
    codigo: "12248",
    label: "Pedido de Cooperação Judiciária",
  },
  {
    uuid: "e82fe48e-4d50-4d81-8b76-b7d3329ff6cc",
    codigo: "15242",
    label: "Pedido de Esclarecimento",
  },
  {
    uuid: "1690e018-806e-42c7-867b-396d44900f67",
    codigo: "1199",
    label: "Pedido de Providências",
  },
  {
    uuid: "a357917c-e4cf-4a28-98fa-cbdec5ad3982",
    codigo: "1265",
    label: "Precatório",
  },
  {
    uuid: "a41c796d-3230-4352-8ee6-ec4942ead39c",
    codigo: "11891",
    label: "Procedimento de Controle Administrativo",
  },
  {
    uuid: "7da538c9-e377-415b-8f3b-d65092e3fa3b",
    codigo: "1298",
    label: "Processo Administrativo",
  },
  {
    uuid: "f39d32d0-ed89-4631-98ca-4a102f150702",
    codigo: "1264",
    label: "Processo Administrativo Disciplinar em face de Magistrado",
  },
  {
    uuid: "2b4eb227-f12b-4495-a530-19fbd6b2e3ed",
    codigo: "1262",
    label: "Processo Administrativo Disciplinar em face de Servidor",
  },
  {
    uuid: "6fc6a105-d4b3-477c-85a1-00c0710a5263",
    codigo: "15239",
    label: "Proposta de Anteprojeto de Lei",
  },
  {
    uuid: "01e9c75d-86f2-459b-8f8d-1d92bf518207",
    codigo: "1301",
    label: "Reclamação Disciplinar",
  },
  {
    uuid: "4d3e3218-a8c0-49ba-94ca-a0e11bae7bfc",
    codigo: "11893",
    label: "Reclamação para Garantia das Decisões",
  },
  {
    uuid: "b3c00a00-2706-4639-ab12-1ab32ef25d95",
    codigo: "1299",
    label: "Recurso Administrativo",
  },
  {
    uuid: "53ce1e93-6d0c-43aa-951e-24ef01a83b5e",
    codigo: "1306",
    label: "Recurso em Processo Administrativo Disciplinar em face de Servidor",
  },
  {
    uuid: "8a3d3c49-515f-414f-8227-391da2470dcc",
    codigo: "256",
    label: "Representação por Excesso de Prazo",
  },
  {
    uuid: "e180f355-e768-4f2b-b916-467a4c991b53",
    codigo: "1266",
    label: "Requisição de Pequeno Valor",
  },
  {
    uuid: "98331841-f486-48f9-81c7-eba1a10bde9f",
    codigo: "11892",
    label: "Revisão Disciplinar",
  },
  {
    uuid: "b3692970-d5d2-4cc1-87c9-2e4dfaaf46a6",
    codigo: "1308",
    label: "Sindicância",
  },
  {
    uuid: "19b4955a-4e7f-4ac0-8f1f-0b829d4b585c",
    codigo: "15195",
    label: "Seção Administrativa",
  },
  {
    uuid: "b8f137db-985e-4ab5-8382-a0db2f201a48",
    codigo: "15196",
    label: "Inspeção",
  },
  {
    uuid: "c79a1bf0-cc5b-48b5-ba2c-f1e8ed68f5a0",
    codigo: "14676",
    label: "Pedido de Inclusão no Cadastro de Programa de Apadrinhamento",
  },
  {
    uuid: "76b8ed71-a589-4cb0-8993-24a757bd06ee",
    codigo: "1385",
    label: "Seção Cível",
  },
  {
    uuid: "01fb2966-e8f9-45fe-a8c8-99d92a51a856",
    codigo: "1450",
    label: "Cartas",
  },
  {
    uuid: "08fc01ff-a3fd-4f15-9b28-5b9b4c5a2b4d",
    codigo: "1451",
    label: "Carta de Ordem Infância e Juventude",
  },
  {
    uuid: "977b44e9-e2b5-4c24-8e9f-1a54b557f79e",
    codigo: "1455",
    label: "Carta Precatória Infância e Juventude",
  },
  {
    uuid: "36280879-c568-46f3-8513-da7a8b392815",
    codigo: "10969",
    label: "Incidentes",
  },
  {
    uuid: "bb52a3a3-2d99-4f39-9dcd-dc7bb9c3ffba",
    codigo: "10970",
    label: "Conflito de Competência Infância e Juventude",
  },
  {
    uuid: "18257116-ded0-4fbc-9f47-83d957eef65f",
    codigo: "10971",
    label: "Exceções",
  },
  {
    uuid: "8949224c-a523-4494-83c8-38378d73b3f8",
    codigo: "10975",
    label: "Exceção de Impedimento Infância e Juventude",
  },
  {
    uuid: "297ca178-3e59-4612-836e-f4f0eff98252",
    codigo: "10976",
    label: "Exceção de Incompetência Infância e Juventude",
  },
  {
    uuid: "5dc4ffb5-e5a5-4c20-9e51-890668be6e04",
    codigo: "10977",
    label: "Exceção de Suspeição Infância e Juventude",
  },
  {
    uuid: "3bbc1f26-e2e1-49cd-8534-a097a0dd4465",
    codigo: "10972",
    label: "Exibição de Documento ou Coisa Infância e Juventude",
  },
  {
    uuid: "fcaf13d4-f163-4606-ae7a-a058bc98459a",
    codigo: "10973",
    label: "Impugnação ao Valor da Causa Infância e Juventude",
  },
  {
    uuid: "909dac63-922e-43f2-b5db-d8293ea62fba",
    codigo: "10974",
    label: "Incidente de Falsidade Infância e Juventude",
  },
  {
    uuid: "2a1d9f54-f1d2-4185-a6d3-5feb6b4b49bc",
    codigo: "12386",
    label: "Incidente de Impedimento Infância e Juventude",
  },
  {
    uuid: "02705eb6-8d7e-40ee-9551-5f6d389f7555",
    codigo: "12388",
    label: "Incidente de Suspeição Infância e Juventude",
  },
  {
    uuid: "789c492b-c0e2-45ed-81db-c60bb2cbbf87",
    codigo: "11026",
    label: "Petição Infância e Juventude Cível",
  },
  {
    uuid: "33dab920-9d8d-40ed-9904-8ca50f3692e4",
    codigo: "1386",
    label: "Processo de Conhecimento",
  },
  {
    uuid: "7e9e7282-4ba9-45ea-beb4-20eb9145c872",
    codigo: "1690",
    label: "Ação Civil Pública Infância e Juventude",
  },
  {
    uuid: "9c390e75-8baf-4d2b-a3de-2a94c4429b26",
    codigo: "1389",
    label: "Ação de Alimentos de Infância e Juventude",
  },
  {
    uuid: "0ee7d136-b607-48cb-b383-2e736a31e5e9",
    codigo: "1401",
    label: "Adoção",
  },
  {
    uuid: "3835a228-f105-4a6f-a0e1-543dbf710764",
    codigo: "15192",
    label: "Adoção Fora do Cadastro",
  },
  {
    uuid: "3dfcfe87-8476-49a5-918c-2607c4a2bd9a",
    codigo: "15193",
    label: "Adoção Fora do Cadastro c/c Destituição do Poder Familiar",
  },
  {
    uuid: "cec632a3-12f8-4f67-b881-e34b7bbb5192",
    codigo: "15191",
    label: "Adoção pelo Cadastro",
  },
  {
    uuid: "b4e3cd54-7b01-449b-bfc3-464310de99ad",
    codigo: "1412",
    label: "Adoção c/c Destituição do Poder Familiar",
  },
  {
    uuid: "77df1900-3db5-48c8-bcfc-66df7dcf3005",
    codigo: "1392",
    label:
      "Apuração de Infração Administrativa às Normas de Proteção à Criança ou Adolescente",
  },
  {
    uuid: "28f76a95-0211-4c25-a4cb-a55e9384a0f8",
    codigo: "1391",
    label: "Apuração de Irregularidades em Entidades de Atendimento",
  },
  {
    uuid: "8b8b62b7-13d1-4e11-ae85-f6e08bd55ae9",
    codigo: "1703",
    label: "Autorização judicial",
  },
  {
    uuid: "1facae11-0471-48c3-9540-d4b75e2bc829",
    codigo: "15190",
    label: "Destituição do Poder Familiar",
  },
  {
    uuid: "7ee5695c-6c62-4cf1-a496-c7df802f4a06",
    codigo: "1415",
    label: "Emancipação",
  },
  {
    uuid: "a344c318-0f6d-4ade-9891-346d5549b332",
    codigo: "1704",
    label: "Embargos de Terceiro Infância e Juventude",
  },
  {
    uuid: "6e4ab54f-d382-4e97-92c5-1d2d26ee5784",
    codigo: "15140",
    label: "Entrega Voluntária",
  },
  {
    uuid: "15e53e34-12af-473e-86dc-90feac4057e9",
    codigo: "12230",
    label: "Guarda c/c destituição do poder familiar",
  },
  {
    uuid: "fe06fa10-448e-40fe-87e8-31399d6ce17b",
    codigo: "1420",
    label: "Guarda de Infância e Juventude",
  },
  {
    uuid: "eed0380a-971f-4275-924c-d4fca18eae02",
    codigo: "10933",
    label: "Habilitação para Adoção",
  },
  {
    uuid: "312ef996-d9cb-47c8-9ce0-36842381476a",
    codigo: "1691",
    label: "Mandado de Segurança Infância e Juventude Cível",
  },
  {
    uuid: "a49d0920-affe-4c04-b620-ad447ab08fcf",
    codigo: "12070",
    label: "Pedido de Medida de Proteção",
  },
  {
    uuid: "7a3f7725-529b-4424-b061-2985deb69d42",
    codigo: "1426",
    label: "Perda ou Suspensão do Poder Familiar",
  },
  {
    uuid: "c864ddfe-c93e-4d26-b299-77442ba96497",
    codigo: "1425",
    label: "Prestação de Contas Infância e Juventude",
  },
  {
    uuid: "b21748db-cdbb-444c-900d-42e550c8e32e",
    codigo: "1706",
    label: "Procedimento Comum Infância e Juventude",
  },
  {
    uuid: "51b86553-fda3-4e10-b089-2f1f81c308a3",
    codigo: "1424",
    label: "Providência",
  },
  {
    uuid: "005e16df-5a7d-45fe-ab53-6c1f1aba0ee7",
    codigo: "1417",
    label: "Regularização de Registro Civil",
  },
  {
    uuid: "c579baa2-919f-4355-8b1a-93a0763edf95",
    codigo: "1705",
    label: "Remoção, modificação e dispensa de tutor ou curador",
  },
  {
    uuid: "96c442aa-120a-4364-855f-8faea91cd03a",
    codigo: "12076",
    label: "Restabelecimento do Poder Familiar",
  },
  {
    uuid: "98abc0a7-22c3-42b3-95b3-0fc6a20d766c",
    codigo: "1390",
    label: "Revisão Judicial de Decisão do Conselho Tutelar",
  },
  {
    uuid: "fd832ebc-5329-4291-afe8-9bb73df6a987",
    codigo: "1414",
    label: "Suprimento de Capacidade ou de Consentimento para Casar",
  },
  {
    uuid: "1a790a06-63e5-4d05-b768-7b657a9425cd",
    codigo: "15194",
    label: "Suspensão do Poder Familiar",
  },
  {
    uuid: "36a1528e-8f14-44b0-aa5c-f7216437cc4a",
    codigo: "1399",
    label: "Tutela c/c Destituição do Poder Familiar",
  },
  {
    uuid: "ceec91a2-652a-4523-88f1-31b67f3cd8da",
    codigo: "1396",
    label: "Tutela Infância e Juventude",
  },
  {
    uuid: "2efe5711-02ba-4c21-b174-ad3b7ea6ce66",
    codigo: "1430",
    label: "Processo de Execução",
  },
  {
    uuid: "dba8b339-8f64-45cd-9936-26b994acad4c",
    codigo: "1432",
    label: "Execução de Alimentos Infância e Juventude",
  },
  {
    uuid: "39050f27-9731-401e-a448-7cf89e229097",
    codigo: "1434",
    label: "Execução de Medida de Proteção à Criança e Adolescente",
  },
  {
    uuid: "1a63efb1-e3af-4c81-9241-29cf434562db",
    codigo: "1435",
    label: "Execução de Multa",
  },
  {
    uuid: "1908168f-a523-43b1-8117-34627c7d9f52",
    codigo: "1436",
    label: "Processos Cautelares",
  },
  {
    uuid: "4224f55b-f502-44d0-b0c3-1813b313a110",
    codigo: "1438",
    label: "Busca e Apreensão Infância e Juventude",
  },
  {
    uuid: "f9837244-72ed-451d-832e-2e8074bc7087",
    codigo: "1440",
    label: "Cautelar Inominada Infância e Juventude",
  },
  {
    uuid: "d49a6efd-ef50-4620-81bd-bb2969886444",
    codigo: "1459",
    label: "Seção Infracional",
  },
  {
    uuid: "42169537-957a-45fd-a698-44825f094418",
    codigo: "12120",
    label: "Agravo em Execução de Medidas Sócio-Educativas",
  },
  {
    uuid: "8ffcdc63-d13a-4c8b-a217-62171ea844c4",
    codigo: "1473",
    label: "Cartas",
  },
  {
    uuid: "9ff31cd1-e3ac-4c4a-8e29-268725cbb542",
    codigo: "1474",
    label: "Carta de Ordem Infracional",
  },
  {
    uuid: "ca1b8958-a6fb-466d-8d1e-ed479cf134b6",
    codigo: "1478",
    label: "Carta Precatória Infracional",
  },
  {
    uuid: "6b728c5a-72ca-4047-8728-fdeae84a1d88",
    codigo: "1465",
    label: "Execução de Medidas Socioeducativas",
  },
  {
    uuid: "461d3ed8-90dc-489a-a1f8-9a934b74c2f0",
    codigo: "1472",
    label: "Advertência",
  },
  {
    uuid: "074e2e5f-1da7-4f71-bcc4-7f4137215b7d",
    codigo: "1466",
    label: "Internação com Atividades Externas",
  },
  {
    uuid: "aa2083a4-912c-4b84-a8a9-692f6ef93714",
    codigo: "1467",
    label: "Internação sem Atividades Externas",
  },
  {
    uuid: "9c15216f-7433-4971-ab99-8ea7c8b96bb5",
    codigo: "1469",
    label: "Liberdade Assistida",
  },
  {
    uuid: "d800907c-ae60-4f83-a751-ad0f7a7a455b",
    codigo: "1471",
    label: "Obrigação de Reparar o Dano",
  },
  {
    uuid: "8536431e-3e47-4bdc-b56b-c498606fb701",
    codigo: "1470",
    label: "Prestação de Serviços a Comunidade",
  },
  {
    uuid: "5a1653fb-a71c-48d5-b473-1e29d6d91fc0",
    codigo: "1468",
    label: "Semiliberdade",
  },
  {
    uuid: "eb7c37be-7663-4ceb-9125-683ebe2bf99e",
    codigo: "10960",
    label: "Incidente de Sanidade Mental",
  },
  {
    uuid: "4f353182-4c81-4e58-8b12-ce6211125622",
    codigo: "12074",
    label:
      "Pedido De Desinternação/Reavaliação/Substituição/Suspensão da Medida",
  },
  {
    uuid: "c218cee9-d5aa-4e4e-b244-b377d70ea1f8",
    codigo: "10979",
    label: "Petição Infracional",
  },
  {
    uuid: "074c3c4d-c735-4db5-8578-410325e15a62",
    codigo: "12071",
    label: "Procedimentos Cautelares",
  },
  {
    uuid: "e8b16c1c-27da-4107-9279-625a3b899d16",
    codigo: "12072",
    label: "Busca e Apreensão Infracional",
  },
  {
    uuid: "398fa9c5-6168-4e96-8598-348961ac62b2",
    codigo: "12073",
    label: "Internação Provisória",
  },
  {
    uuid: "c7ab58f7-8041-4a21-a538-6e95bfc65b20",
    codigo: "15172",
    label:
      "Medidas de Proteção - Criança e Adolescente (Lei 13.431) Infracionais",
  },
  {
    uuid: "4a9dffba-4080-46ec-bec4-8d439ce83296",
    codigo: "12424",
    label: "Medidas de Proteção à Pessoa Idosa - Infracional",
  },
  {
    uuid: "00c17abe-af35-4d31-8872-447d8befee58",
    codigo: "12423",
    label: "Medidas Protetivas de Urgência (Lei Maria da Penha) - Infracional",
  },
  {
    uuid: "aa053d20-7f20-48f9-8f10-5d5b436de03e",
    codigo: "15171",
    label:
      "Medidas Protetivas de Urgência - Crianças e Adolescentes (Lei Henry Borel - Lei 14.344/2022) Infracionais",
  },
  {
    uuid: "dcc292d7-1c1f-45c2-8e2a-16d0129416f8",
    codigo: "1460",
    label: "Procedimentos Investigatórios",
  },
  {
    uuid: "818b9a23-0644-48ce-898f-25c59b2d4b90",
    codigo: "1461",
    label: "Auto de Apreensão em Flagrante",
  },
  {
    uuid: "7fa751aa-124b-4cf1-83dc-882878bb29be",
    codigo: "1463",
    label: "Boletim de Ocorrência Circunstanciada",
  },
  {
    uuid: "bb00db70-52af-40b8-9f7c-d7fccd2e9e8e",
    codigo: "11976",
    label: "Pedido de Busca e Apreensão Infracional",
  },
  {
    uuid: "16ff52d4-4edf-47d5-81d5-cdd5d6a93fb5",
    codigo: "1462",
    label: "Relatório de Investigações",
  },
  {
    uuid: "15b6bcae-bab4-4820-9cfe-366a18f3a386",
    codigo: "1464",
    label: "Processo de Apuração de Ato Infracional",
  },
  {
    uuid: "c7da26cc-a8e4-4b2c-b574-820cd2e3f6be",
    codigo: "11794",
    label: "Restituição de Coisas Apreendidas Infracional",
  },
  {
    uuid: "77048e4f-7be6-4923-8c56-f4e600cb02c7",
    codigo: "12613",
    label: "Pedido de Conciliação Pré-Processual",
  },
  {
    uuid: "2b5f84e9-7f1e-4bac-8568-a56b4e83cb62",
    codigo: "12136",
    label: "Pedido de Mediação Pré-Processual",
  },
  {
    uuid: "e8496b14-5d27-458b-8fcb-4fd2b67e1a3d",
    codigo: "11875",
    label: "Reclamação Pré-processual",
  },
  {
    uuid: "cfe69018-a95c-468d-8864-83f20b65af00",
    codigo: "214",
    label: "Outros Procedimentos",
  },
  {
    uuid: "45d3638f-2279-4567-888e-3cfeae0d4026",
    codigo: "12232",
    label: "Ação de Partilha",
  },
  {
    uuid: "638f82ca-7d96-4e1d-90d6-08a93ff0a581",
    codigo: "15167",
    label: "Acordo de Não Persecução Cível",
  },
  {
    uuid: "00c041a1-4b99-42e2-a411-267a4e714765",
    codigo: "237",
    label: "Atos e expedientes",
  },
  {
    uuid: "17cbeae6-874b-485e-b2c1-3f006c9aae13",
    codigo: "238",
    label: "Avocatória",
  },
  {
    uuid: "3d5f2a69-989c-4624-a473-6425ed8d27d4",
    codigo: "242",
    label: "Comunicação",
  },
  {
    uuid: "d67d735f-aa0b-42b9-9c13-1a6dde03fc19",
    codigo: "12139",
    label: "Contestação em Foro Diverso",
  },
  {
    uuid: "f101acc0-7f35-4232-a7a0-d117017a3cdf",
    codigo: "239",
    label: "Habilitação para Casamento",
  },
  {
    uuid: "067a03f5-c115-411c-a95b-7cd1718e42ff",
    codigo: "240",
    label: "Instrução de Rescisória",
  },
  {
    uuid: "b65f0385-c5f6-43ef-8b89-973da7f3cc5d",
    codigo: "1701",
    label: "Nomeação de Advogado",
  },
  {
    uuid: "40527345-867f-4af7-b4a1-c746359725b6",
    codigo: "12357",
    label: "Pedido de Efeito Suspensivo à Apelação",
  },
  {
    uuid: "e9fe5ebe-e943-49b3-ba2b-28662026a67a",
    codigo: "241",
    label: "Petição Cível",
  },
  {
    uuid: "7362df54-611d-4bc9-b6fc-edb9ace273e6",
    codigo: "251",
    label: "Registro de Casamento Nuncupativo",
  },
  {
    uuid: "9475ee52-4e4b-4841-ad4d-9f86969b465c",
    codigo: "257",
    label: "Cartas",
  },
  {
    uuid: "be43cd9c-7778-4be8-a17f-72cc946a96aa",
    codigo: "12082",
    label: "Carta Arbitral",
  },
  {
    uuid: "103791c2-ef74-4723-be7b-59a067453925",
    codigo: "258",
    label: "Carta de Ordem Cível",
  },
  {
    uuid: "499066bd-722f-4914-bd04-d95e9b9f87a4",
    codigo: "261",
    label: "Carta Precatória Cível",
  },
  {
    uuid: "9b935a09-13de-46e4-94bd-19547d92cc53",
    codigo: "264",
    label: "Carta Rogatória Cível",
  },
  {
    uuid: "b0dc8e66-d5e6-4d85-a21b-b80f2222bb5b",
    codigo: "215",
    label: "Incidentes",
  },
  {
    uuid: "bba0e98b-c2a0-4d47-a389-f0960b028668",
    codigo: "218",
    label: "Assistência Judiciária",
  },
  {
    uuid: "6ae4f565-e7ed-4260-8be8-014cfd7cd228",
    codigo: "14991",
    label: "Classificação de Crédito Público",
  },
  {
    uuid: "c3cef2c1-38a9-49f4-a15f-7f7430809326",
    codigo: "1285",
    label: "Conflito de atribuição",
  },
  {
    uuid: "786c73c4-cde3-4ee7-a764-f225f079bd94",
    codigo: "221",
    label: "Conflito de competência cível",
  },
  {
    uuid: "81d6b8f9-c6fd-4b78-92ba-cc02ddf5e6f2",
    codigo: "12153",
    label: "Embargos Parciais à Ação Monitória",
  },
  {
    uuid: "441720b2-dd1c-4eb5-828e-b33cc7323a85",
    codigo: "224",
    label: "Exceções",
  },
  {
    uuid: "2684779f-b8d4-4d85-bf81-891a207f7dfb",
    codigo: "1230",
    label: "Exceção de Impedimento",
  },
  {
    uuid: "7f2ab545-dd57-4121-a3a5-f913cd96c5c1",
    codigo: "1232",
    label: "Exceção de Incompetência",
  },
  {
    uuid: "3ee90180-7dc7-4c2f-9c0e-280fa9179a17",
    codigo: "1231",
    label: "Exceção de Suspeição",
  },
  {
    uuid: "c42f9fd0-bade-4893-83e0-238f075a3f43",
    codigo: "228",
    label: "Exibição de Documento ou Coisa Cível",
  },
  {
    uuid: "600b7761-e6f2-400b-9494-4b58c995ec9d",
    codigo: "230",
    label: "Impugnação ao Pedido de Assistência Litisconsorcial ou Simples",
  },
  {
    uuid: "a768466e-3013-491b-83ce-2b4366139445",
    codigo: "231",
    label: "Impugnação ao Valor da Causa Cível",
  },
  {
    uuid: "a3b1576c-3063-420d-afde-656431471326",
    codigo: "1702",
    label: "Impugnação de Assistência Judiciária",
  },
  {
    uuid: "d0ea9c99-ed40-43bc-988e-86f443e457e9",
    codigo: "216",
    label: "Incidente De Arguição de Inconstitucionalidade Cível",
  },
  {
    uuid: "510c3dd6-4393-468e-aa4b-c1cd21dac475",
    codigo: "12087",
    label: "Incidente de Assunção de Competência",
  },
  {
    uuid: "ee11b734-f857-45e9-b3df-1e06b8108573",
    codigo: "12119",
    label: "Incidente de Desconsideração de Personalidade Jurídica",
  },
  {
    uuid: "24b31fb8-8bca-42c9-986a-d6c94c494897",
    codigo: "232",
    label: "Incidente de Falsidade",
  },
  {
    uuid: "13bb36e0-b652-4b70-969d-96d8d16b3aa2",
    codigo: "12080",
    label: "Incidente de Impedimento Cível",
  },
  {
    uuid: "28a3125e-2ee1-49f2-b788-8e36af6c6940",
    codigo: "12085",
    label: "Incidente de Resolução de Demandas Repetitivas",
  },
  {
    uuid: "2d91ffbe-1b57-415d-960c-b1c8271a132a",
    codigo: "12081",
    label: "Incidente de Suspeição Cível",
  },
  {
    uuid: "f89658a0-921f-4920-b44b-88f48ebfabfd",
    codigo: "233",
    label: "Incidente de Uniformização de Jurisprudência",
  },
  {
    uuid: "b348f9a1-8467-4277-89d1-c717bd8e4285",
    codigo: "236",
    label: "Oposição",
  },
  {
    uuid: "a6108cb6-a3f7-4800-b395-4f58070c0e2b",
    codigo: "457",
    label: "Pedido de Uniformização de Interpretação de Lei Cível",
  },
  {
    uuid: "041b38c3-57e1-4885-a34b-542243cee354",
    codigo: "12075",
    label: "Procedimento Conciliatório",
  },
  {
    uuid: "9a611b72-b464-4072-8008-a17b17972bf0",
    codigo: "234",
    label: "Remoção de Inventariante",
  },
  {
    uuid: "29129bb8-0466-4840-9d28-ddd359484fea",
    codigo: "1070",
    label: "Incidentes Trabalhistas",
  },
  {
    uuid: "19954447-862f-433f-8bd1-156f2050d260",
    codigo: "1145",
    label: "Conflito de Competência",
  },
  {
    uuid: "d99256bc-ddd8-4185-99e0-aba2502823c6",
    codigo: "12132",
    label:
      "Incidente de Julgamento de Recurso de Revista e de Embargos Repetitivos",
  },
  {
    uuid: "16f5b906-c4cc-4bdf-b86a-58a764b658a5",
    codigo: "12391",
    label: "Incidente de Uniformização de Jurisprudência",
  },
  {
    uuid: "a668b912-0537-41fb-bf06-da2082299862",
    codigo: "1072",
    label: "Pedido de Revisão do Valor da Causa",
  },
  {
    uuid: "c92a69ca-4f3a-4645-b7c3-c476e774bb73",
    codigo: "15309",
    label: "Medidas Protetivas de Urgência (Lei Maria da Penha) - Cível",
  },
  {
    uuid: "b2413ef7-d551-4b7a-9de6-a5d07ec3c7ef",
    codigo: "12137",
    label: "Requerimento de Apreensão de Veículo",
  },
  {
    uuid: "99cb29c2-997e-439c-8201-851b2d09908f",
    codigo: "175",
    label: "Processo Cautelar",
  },
  {
    uuid: "9a22b07c-75a7-4445-b050-15dbb7527f9e",
    codigo: "176",
    label: "Alimentos - Provisionais",
  },
  {
    uuid: "77e81df1-01fb-40fb-a8ea-31838d8d8a73",
    codigo: "177",
    label: "Apreensão de Títulos",
  },
  {
    uuid: "3370e046-1dcd-4409-906f-88d3e9b503f3",
    codigo: "178",
    label: "Arresto",
  },
  {
    uuid: "64f0d0e4-ac31-4137-ab5e-2146607a6d53",
    codigo: "179",
    label: "Arrolamento de Bens",
  },
  {
    uuid: "1cbca0a6-9ad6-4ee2-9af6-e7b6dbb1f440",
    codigo: "180",
    label: "Atentado",
  },
  {
    uuid: "5a4cee73-0ee6-4586-afe6-9ac2a39317bc",
    codigo: "181",
    label: "Busca e Apreensão",
  },
  {
    uuid: "de02c06b-f22e-40fc-8bcc-baa480cca9b0",
    codigo: "182",
    label: "Caução",
  },
  {
    uuid: "8bc783d3-b1f4-4546-938b-1c865e29b465",
    codigo: "83",
    label: "Cautelar Fiscal",
  },
  {
    uuid: "291dbb59-5bed-43b4-9d11-8b616627d32c",
    codigo: "183",
    label: "Cautelar Inominada",
  },
  {
    uuid: "0227f2a7-fc64-4315-99a8-ef6b1d240a07",
    codigo: "1723",
    label: "Contraprotesto Judicial",
  },
  {
    uuid: "3b8c81b0-927e-4d25-8974-57fa64fecfd6",
    codigo: "1233",
    label: "Efeito Suspensivo",
  },
  {
    uuid: "2f0a6ad2-e17c-4baa-b1de-2ca9a9aa937b",
    codigo: "186",
    label: "Exibição",
  },
  {
    uuid: "1dd497b6-9adb-4228-ba6c-6abf1017b95a",
    codigo: "188",
    label: "Homologação do Penhor Legal",
  },
  {
    uuid: "59e6263d-94d2-4371-94b6-d27ec8fc15e9",
    codigo: "1726",
    label: "Interpelação",
  },
  {
    uuid: "257af4cd-d8e3-49e9-b786-6a361a050591",
    codigo: "190",
    label: "Justificação",
  },
  {
    uuid: "34d205fb-e0b7-4075-baf9-d9f4f06d6527",
    codigo: "1725",
    label: "Notificação",
  },
  {
    uuid: "655d3398-478b-43e8-bcbe-40f872b4d56e",
    codigo: "1289",
    label: "Outras medidas provisionais",
  },
  {
    uuid: "44bdca3c-ae3f-44cf-8743-167211d7945d",
    codigo: "192",
    label: "Posse em Nome do Nascituro",
  },
  {
    uuid: "a3099e10-c40c-4990-a5a2-9054a93fe83f",
    codigo: "193",
    label: "Produção Antecipada da Prova",
  },
  {
    uuid: "b2aea26d-f0cb-4037-b311-a1539f17a89e",
    codigo: "191",
    label: "Protesto",
  },
  {
    uuid: "08f500bb-9166-4230-a8eb-7e64971f77f3",
    codigo: "194",
    label: "Regulamentação de Visitas",
  },
  {
    uuid: "811ec1df-8c97-48f7-b62b-026c5d56420e",
    codigo: "195",
    label: "Separação de Corpos",
  },
  {
    uuid: "22c11537-df5c-48fb-ac8d-584c507fc1c7",
    codigo: "196",
    label: "Seqüestro",
  },
  {
    uuid: "ae67ba68-1dee-492d-8ba9-0305f9ccfa61",
    codigo: "12083",
    label: "Tutela Antecipada Antecedente",
  },
  {
    uuid: "9a4f5c60-a60f-4f89-971f-4afacc21eb91",
    codigo: "12084",
    label: "Tutela Cautelar Antecedente",
  },
  {
    uuid: "9e3d9d52-f19a-459e-b969-b6cacb417253",
    codigo: "1106",
    label: "Processo de Conhecimento",
  },
  {
    uuid: "9917ddab-2100-4b7b-abc1-2c55ce3958b8",
    codigo: "1107",
    label: "Procedimento de Conhecimento",
  },
  {
    uuid: "2c1e585b-f713-4170-bb61-c4a73b6a2ed0",
    codigo: "7",
    label: "Procedimento Comum Cível",
  },
  {
    uuid: "bff46cc3-8a5a-409e-9a39-f2b19e078cbe",
    codigo: "436",
    label: "Procedimento do Juizado Especial Cível",
  },
  {
    uuid: "66a1dfdf-b3ff-4cfa-b4c3-5a251b997d28",
    codigo: "14695",
    label: "Procedimento do Juizado Especial da Fazenda Pública",
  },
  {
    uuid: "9cdc9505-1faa-42f5-92d1-975b7dbdc41f",
    codigo: "22",
    label: "Procedimento Sumário",
  },
  {
    uuid: "7a0ed34a-f3f0-4f97-82ca-7133f1609408",
    codigo: "26",
    label: "Procedimentos Especiais",
  },
  {
    uuid: "e1dd0bdc-180e-4c0f-a2be-5784cb1b42d9",
    codigo: "27",
    label: "Procedimentos Especiais de Jurisdição Contenciosa",
  },
  {
    uuid: "86ba1aa8-f465-4e32-a47d-bc63e30fac08",
    codigo: "45",
    label: "Ação de Exigir Contas",
  },
  {
    uuid: "8c712a9e-0d4c-40df-a468-4c7814e72680",
    codigo: "47",
    label: "Ação Rescisória",
  },
  {
    uuid: "96202e5c-7480-4657-a71c-42b90c9f210a",
    codigo: "28",
    label: "Anulação e Substituição de Títulos ao Portador",
  },
  {
    uuid: "f8a4ed41-6037-46f0-99a5-e4009b9f1fe8",
    codigo: "29",
    label: "Apreensão e Depósito de Coisa Vendida com Reserva de Domínio",
  },
  {
    uuid: "305a9a64-27f2-4f65-b40c-7c642a3efa35",
    codigo: "30",
    label: "Arrolamento Comum",
  },
  {
    uuid: "a67adb03-8b19-430e-8579-ac78074f3759",
    codigo: "31",
    label: "Arrolamento Sumário",
  },
  {
    uuid: "d6a9c134-b5c5-4477-8473-0cd8d359e486",
    codigo: "32",
    label: "Consignação em Pagamento",
  },
  {
    uuid: "1c2dca38-6622-46e2-91b5-9ffa511a1aa5",
    codigo: "34",
    label: "Demarcação / Divisão",
  },
  {
    uuid: "fdf4e239-2249-4177-a340-0395baa38150",
    codigo: "35",
    label: "Depósito",
  },
  {
    uuid: "d48ff892-9a7f-440b-ae16-3c0dc8f5fc9e",
    codigo: "12086",
    label: "Dissolução Parcial de Sociedade",
  },
  {
    uuid: "2440808c-2479-4fb2-b5bd-a1528399141d",
    codigo: "12541",
    label: "Divórcio Litigioso",
  },
  {
    uuid: "9cb50dcc-f3e4-4607-a5c6-b5e4d42de0c0",
    codigo: "37",
    label: "Embargos de Terceiro Cível",
  },
  {
    uuid: "ea098ba9-aa80-4092-b7f6-257fc3929847",
    codigo: "38",
    label: "Habilitação",
  },
  {
    uuid: "57fd7feb-b582-4f23-8f7c-686595ae56fb",
    codigo: "12761",
    label: "Homologação do Penhor Legal",
  },
  {
    uuid: "10c53141-0f58-4226-8f89-5d36d74b9a4a",
    codigo: "1709",
    label: "Interdito Proibitório",
  },
  {
    uuid: "0d674b80-cd12-4323-98cb-3692d2aeb19b",
    codigo: "39",
    label: "Inventário",
  },
  {
    uuid: "ec1e2a3a-af74-44f2-81f6-24f1f6cd5a4e",
    codigo: "40",
    label: "Monitória",
  },
  {
    uuid: "b20bd117-784f-4ea4-b23a-a64335b5b4d9",
    codigo: "41",
    label: "Nunciação de Obra Nova",
  },
  {
    uuid: "edd4a24d-dd05-4887-a9ca-5c6c4f15d7e1",
    codigo: "44",
    label: "Prestação de Contas - Oferecidas",
  },
  {
    uuid: "1ec3f8df-ae82-4fab-bf2f-b5ec20ecda92",
    codigo: "12375",
    label: "Reclamação",
  },
  {
    uuid: "15ee026f-216e-43f5-baf8-d79acd45e76d",
    codigo: "12763",
    label: "Reconhecimento e Extinção de União Estável",
  },
  {
    uuid: "83a513f3-b89d-4c8c-b34f-7c93147c8323",
    codigo: "12376",
    label: "Regulação de Avaria Grossa",
  },
  {
    uuid: "02844220-8f3d-4b32-a475-72913c69f5f3",
    codigo: "14677",
    label: "Regulamentação da Convivência Familiar",
  },
  {
    uuid: "cda9fdd2-e965-44b3-bdcd-6370fa59e6f0",
    codigo: "1707",
    label: "Reintegração / Manutenção de Posse",
  },
  {
    uuid: "31f93c2c-4ad5-46bd-aafa-58e275344e80",
    codigo: "46",
    label: "Restauração de Autos Cível",
  },
  {
    uuid: "223d3c8e-7489-4889-8abe-b787790c227a",
    codigo: "12764",
    label: "Separação Contenciosa",
  },
  {
    uuid: "0a8c9d0c-065e-40c9-8fd1-fcd32a0bf146",
    codigo: "48",
    label: "Sobrepartilha",
  },
  {
    uuid: "4257aee1-f6c7-408e-8154-aa2f4a6932fb",
    codigo: "49",
    label: "Usucapião",
  },
  {
    uuid: "13b21c76-a82e-4b8d-bf24-5a6e68025d8f",
    codigo: "50",
    label: "Procedimentos Especiais de Jurisdição Voluntária",
  },
  {
    uuid: "da8b3018-6826-4ebe-bfed-8958eb1beb62",
    codigo: "51",
    label: "Abertura, Registro e Cumprimento de Testamento",
  },
  {
    uuid: "1f42091c-b268-46bd-969b-46cd3696cc40",
    codigo: "52",
    label: "Alienação Judicial de Bens",
  },
  {
    uuid: "4dfc513b-e733-4915-a920-2404edeb5878",
    codigo: "12371",
    label: "Alteração de Regime de Bens",
  },
  {
    uuid: "7d63e764-2272-44a0-89c4-ac8bf641b3d2",
    codigo: "1295",
    label: "Alvará Judicial",
  },
  {
    uuid: "2b1996b6-5010-4c41-96ee-8997d476ac50",
    codigo: "53",
    label: "Arrecadação das Coisas Vagas",
  },
  {
    uuid: "b5ae0595-0ca5-4f23-83e7-5b1421a0c6fc",
    codigo: "54",
    label: "Confirmação de Testamento",
  },
  {
    uuid: "b51c91ad-51af-40c6-be95-67f1051ddd5c",
    codigo: "12234",
    label: "Curatela",
  },
  {
    uuid: "7057fa85-cfbb-486b-994d-65956eacd662",
    codigo: "55",
    label: "Declaração de Ausência",
  },
  {
    uuid: "5d5fd365-0cd0-453c-b860-bcc505ec5992",
    codigo: "12372",
    label: "Divórcio Consensual",
  },
  {
    uuid: "d1281a14-c251-49a1-a189-d56cebba1e24",
    codigo: "12373",
    label: "Divórcio Litigioso",
  },
  {
    uuid: "a5ccec3c-b987-4dfb-adac-3d7a08f7f593",
    codigo: "56",
    label: "Especialização de Hipoteca Legal",
  },
  {
    uuid: "6b3f570f-3d87-4a5f-a337-eb3ff911bae1",
    codigo: "12762",
    label: "Extinção Consensual de União Estável",
  },
  {
    uuid: "daaa1180-2acd-4de2-a797-64868bc707fa",
    codigo: "57",
    label: "Herança Jacente",
  },
  {
    uuid: "a1ad3683-13c1-403f-88ae-90f9194d4bbb",
    codigo: "12374",
    label: "Homologação da Transação Extrajudicial",
  },
  {
    uuid: "e57272c7-01e4-484a-b774-72f5acc77d46",
    codigo: "58",
    label: "Interdição/Curatela",
  },
  {
    uuid: "cc8a935c-187e-4a23-96cc-13575f6ad260",
    codigo: "12227",
    label: "Interpelação",
  },
  {
    uuid: "ed2259f0-d7cb-45bd-aae2-d0f4753aa998",
    codigo: "12226",
    label: "Notificação",
  },
  {
    uuid: "dd5fcf29-1953-40bb-a3f0-3b01f69c9940",
    codigo: "59",
    label: "Organização e Fiscalização de Fundação",
  },
  {
    uuid: "fb72ef0c-3f1c-4384-8b48-a38a8690239e",
    codigo: "1294",
    label: "Outros procedimentos de jurisdição voluntária",
  },
  {
    uuid: "66026b01-5a03-461e-aece-88e8ef62a880",
    codigo: "12228",
    label: "Protesto",
  },
  {
    uuid: "669f926d-fa76-455d-aadd-a66676fe0ecb",
    codigo: "12229",
    label: "Protesto formado a bordo",
  },
  {
    uuid: "d5222850-2391-4459-8c9c-1d463dd1b5b5",
    codigo: "60",
    label: "Separação Consensual",
  },
  {
    uuid: "98fd94e3-d566-4146-b286-706ffac80c6c",
    codigo: "12369",
    label: "Tomada de Decisão Apoiada",
  },
  {
    uuid: "3ae32a66-879e-47eb-915f-47c72b91468c",
    codigo: "12233",
    label: "Tutela Cível",
  },
  {
    uuid: "4c5acb42-aac9-4d50-8bea-c47f5827a466",
    codigo: "61",
    label: "Tutela e Curatela - Nomeação",
  },
  {
    uuid: "e5d40af1-2566-4ea7-897b-668de510e92a",
    codigo: "1122",
    label: "Tutela e Curatela - Remoção e Dispensa",
  },
  {
    uuid: "52a44328-2704-4f9c-a181-38441480c434",
    codigo: "62",
    label:
      "Procedimentos Regidos por Outros Códigos, Leis Esparsas e Regimentos",
  },
  {
    uuid: "e3f536b0-dbda-4851-b728-c87610bc856f",
    codigo: "63",
    label: "Ação Civil Coletiva",
  },
  {
    uuid: "b83e0e82-71b4-4779-a196-d38ef9a70e46",
    codigo: "64",
    label: "Ação Civil de Improbidade Administrativa",
  },
  {
    uuid: "ad10292f-15dd-4710-8214-936068c208b0",
    codigo: "65",
    label: "Ação Civil Pública",
  },
  {
    uuid: "db763e61-f20b-4fe3-9c4b-3239c6148757",
    codigo: "12389",
    label: "Ação de Partilha",
  },
  {
    uuid: "3ff0a462-c717-47ce-9d0d-0007bd444004",
    codigo: "12390",
    label: "ação de partilha",
  },
  {
    uuid: "7760b46b-3eb8-4f63-a225-9723c2f475fb",
    codigo: "66",
    label: "Ação Popular",
  },
  {
    uuid: "2b5140b1-c3c4-49bb-a628-d0170b272951",
    codigo: "69",
    label: "Alimentos - Lei Especial Nº 5.478/68",
  },
  {
    uuid: "6041196a-ac5d-4013-82c7-87de0a9abec4",
    codigo: "72",
    label: "Alteração do Regime de Bens",
  },
  {
    uuid: "56e47313-59dd-4dd7-b7e0-a16c96955bb4",
    codigo: "74",
    label: "Alvará Judicial - Lei 6858/80",
  },
  {
    uuid: "040d8a75-9c9f-4014-b731-7f34b746f698",
    codigo: "76",
    label: "Apreensão de Embarcações",
  },
  {
    uuid: "498648c0-e66a-4a31-9f26-fa43756c49e3",
    codigo: "77",
    label: "Arribadas Forçadas",
  },
  {
    uuid: "2a6c0872-bbb8-47c0-bdd6-797a9b5e1f85",
    codigo: "80",
    label: "Avarias",
  },
  {
    uuid: "b6908003-a937-4a56-b139-0988db6c2e2e",
    codigo: "123",
    label: "Averiguação de Paternidade",
  },
  {
    uuid: "5f12780b-6ab0-4ed8-9549-b252a219ae72",
    codigo: "81",
    label: "Busca e Apreensão em Alienação Fiduciária",
  },
  {
    uuid: "445851af-ce2a-426f-8bac-82412efe60e8",
    codigo: "82",
    label: "Cancelamento de Naturalização",
  },
  {
    uuid: "3bdf8a46-2ccb-4f71-8d73-a0a53db01d50",
    codigo: "14990",
    label: "Classificação de Crédito Público",
  },
  {
    uuid: "d2dba6cb-5e9a-42a7-a348-1ab2aeb5705b",
    codigo: "84",
    label: "Cobrança de Cédula de Crédito Industrial",
  },
  {
    uuid: "827144f1-76de-4f9a-a93e-253d836d3ede",
    codigo: "85",
    label: "Compromisso Arbitral",
  },
  {
    uuid: "56eba514-4ed4-4690-bdaf-51800d899e9d",
    codigo: "86",
    label: "Consignatória de Aluguéis",
  },
  {
    uuid: "7e70cbf5-d5bc-43fd-8cbd-4ada5581a71d",
    codigo: "87",
    label: "Conversão de Separação Judicial em Divórcio",
  },
  {
    uuid: "cbabd750-df39-4e86-ac4d-4315a4df4d10",
    codigo: "1296",
    label: "Declaratória de Constitucionalidade",
  },
  {
    uuid: "91b949f5-36c6-488c-96d8-9baec1eb4b37",
    codigo: "89",
    label: "Depósito da Lei 8. 866/94",
  },
  {
    uuid: "4422a1b4-74be-4e90-ab19-7be8f682fbbd",
    codigo: "90",
    label: "Desapropriação",
  },
  {
    uuid: "92abe16f-6622-447d-b994-7bc3da46b240",
    codigo: "91",
    label: "Desapropriação Imóvel Rural por Interesse Social",
  },
  {
    uuid: "02038359-f23b-4c75-9fe9-cf381287c83d",
    codigo: "92",
    label: "Despejo",
  },
  {
    uuid: "bceef37d-c978-47dc-8e3d-b71afab43566",
    codigo: "93",
    label: "Despejo por Falta de Pagamento",
  },
  {
    uuid: "356e8ace-3ba3-4f82-99cf-5a9e2372ef9b",
    codigo: "94",
    label: "Despejo por Falta de Pagamento Cumulado Com Cobrança",
  },
  {
    uuid: "bc7d460c-4091-46d2-94a3-266ba7099252",
    codigo: "95",
    label: "Direta de Inconstitucionalidade",
  },
  {
    uuid: "655fc9f4-830b-433d-b015-ac43062c9d4d",
    codigo: "96",
    label: "Discriminatória",
  },
  {
    uuid: "a7252e23-7408-450c-9a59-afad8e754cc7",
    codigo: "97",
    label: "Dissolução e Liquidação de Sociedade",
  },
  {
    uuid: "eec95503-5fe9-452d-8074-75f955181fc0",
    codigo: "98",
    label: "Divórcio Consensual",
  },
  {
    uuid: "4f87ba73-964f-4f75-b949-161ee964ae56",
    codigo: "99",
    label: "Divórcio Litigioso",
  },
  {
    uuid: "a4c81e6b-0f0d-4a07-93bf-ef02a470069e",
    codigo: "100",
    label: "Dúvida",
  },
  {
    uuid: "56d23adf-dcec-4e4a-a8ca-4dafe64f146e",
    codigo: "107",
    label: "Expropriação da Lei 8.257/91",
  },
  {
    uuid: "fe11b769-9a4f-4525-9dab-e31e126a3821",
    codigo: "11397",
    label: "Extinção das obrigações do falido",
  },
  {
    uuid: "d14cedd3-c4b9-4d97-97e0-b733d05dbfca",
    codigo: "108",
    label:
      "Falência de Empresários, Sociedades Empresáriais, Microempresas e Empresas de Pequeno Porte",
  },
  {
    uuid: "7aaeb298-4c02-4892-991f-49ef8a065fc7",
    codigo: "14671",
    label: "Guarda de Família",
  },
  {
    uuid: "0616c4d9-3168-42ef-aa1c-0f6e6586b3ff",
    codigo: "1269",
    label: "Habeas Corpus Cível",
  },
  {
    uuid: "d46c9195-301c-480e-a88f-fad8c53f339c",
    codigo: "110",
    label: "Habeas Data Cível",
  },
  {
    uuid: "39f105f8-7a01-4a12-a7b4-877ebbabb911",
    codigo: "111",
    label: "Habilitação de Crédito",
  },
  {
    uuid: "1bedf637-2463-4436-898c-6c4f9b275aaa",
    codigo: "112",
    label: "Homologação de Transação Extrajudicial",
  },
  {
    uuid: "4eef3e41-cac2-492c-8598-1ffb0f85e401",
    codigo: "113",
    label: "Imissão na Posse",
  },
  {
    uuid: "4f82293c-33f8-4055-a4fc-5260c4d23a5e",
    codigo: "114",
    label: "Impugnação de Crédito",
  },
  {
    uuid: "d1997fd9-35a1-4024-b881-8b4616438660",
    codigo: "115",
    label: "Inquérito Extrajudicial",
  },
  {
    uuid: "e24c6333-96c5-43e2-ab89-a1b12817383c",
    codigo: "1297",
    label: "Intervenção em Município",
  },
  {
    uuid: "df6234a8-62de-4235-8637-00dd2b38594b",
    codigo: "1124",
    label: "Justificação de Dinheiro a Risco",
  },
  {
    uuid: "e7ee9b93-f487-4cdc-bf7a-9f13f1dee0ee",
    codigo: "118",
    label: "Mandado de Injunção",
  },
  {
    uuid: "64009762-6a4d-4d58-aafc-8e9c85e16b15",
    codigo: "120",
    label: "Mandado de Segurança Cível",
  },
  {
    uuid: "99ab7e17-ee81-4a48-9e19-e486bdcbc423",
    codigo: "119",
    label: "Mandado de Segurança Coletivo",
  },
  {
    uuid: "84ccaa13-882f-4a85-b535-37fff1faf47c",
    codigo: "121",
    label: "Naturalização",
  },
  {
    uuid: "7515ab5e-09d6-4aa7-8d64-667b9f16860c",
    codigo: "122",
    label: "Opção de Nacionalidade",
  },
  {
    uuid: "a71fbf26-9117-491c-9cf7-16e800f98112",
    codigo: "124",
    label: "Pedido de Resposta ou Retificação da Lei de Imprensa",
  },
  {
    uuid: "675d233d-b239-4bf9-b31e-2330bf7b4c01",
    codigo: "15217",
    label: "Procedimento de Repactuação de Dívidas (Superendividamento)",
  },
  {
    uuid: "0db96ca6-5b5a-49f3-86f4-8e631d426337",
    codigo: "127",
    label: "Protesto Formado a Bordo",
  },
  {
    uuid: "e5f6108b-120d-4ce5-a53d-f78bdb53c37b",
    codigo: "244",
    label: "Reclamação",
  },
  {
    uuid: "1dbc8869-6015-465c-8456-4ce2cf4b1302",
    codigo: "128",
    label: "Recuperação Extrajudicial",
  },
  {
    uuid: "ab677db3-b805-4f11-8a5d-9a32cc06a934",
    codigo: "129",
    label: "Recuperação Judicial",
  },
  {
    uuid: "7bc9668c-e4b7-4d78-b95c-5b9b24c53835",
    codigo: "15159",
    label: "Regime Centralizado de Execuções",
  },
  {
    uuid: "6f4da555-9e9a-461d-8e09-d1ca91fb9901",
    codigo: "134",
    label: "Registro Torrens",
  },
  {
    uuid: "f9253d3c-4d45-4a91-85dd-6bc653448559",
    codigo: "79",
    label: "Regulação de Avaria Grossa",
  },
  {
    uuid: "f6681795-7df2-4154-960a-e439482da07c",
    codigo: "135",
    label: "Relatório Falimentar",
  },
  {
    uuid: "32f2b676-62e1-4874-9273-9b791fa4f9e2",
    codigo: "136",
    label: "Remição do Imóvel Hipotecado",
  },
  {
    uuid: "4c143af2-2181-4f6a-a7aa-1d23504cea54",
    codigo: "137",
    label: "Renovatória de Locação",
  },
  {
    uuid: "2d819da1-eda0-40ac-9bec-ef039d7db159",
    codigo: "12138",
    label: "Requerimento de Reintegração de Posse",
  },
  {
    uuid: "36faca58-3330-4d57-a919-68dad7e309d8",
    codigo: "138",
    label: "Restituição de Coisa ou Dinheiro na Falência do Devedor Empresário",
  },
  {
    uuid: "b74721c4-1d58-40fa-9668-fcb15ba447eb",
    codigo: "1683",
    label: "Retificação de Registro de Imóvel",
  },
  {
    uuid: "2323e74e-dc07-47a1-ae59-7c09d580dccd",
    codigo: "1682",
    label: "Retificação ou Suprimento ou Restauração de Registro Civil",
  },
  {
    uuid: "11db0ada-897c-4f1a-b873-747f766b6c3e",
    codigo: "140",
    label: "Revisional de Aluguel",
  },
  {
    uuid: "39a658db-7625-4a0e-a39a-95a2501ae196",
    codigo: "141",
    label: "Separação Litigiosa",
  },
  {
    uuid: "b02464d8-f135-4178-b7d2-e4f1354b91d0",
    codigo: "142",
    label: "Sonegados",
  },
  {
    uuid: "c22fae9d-f3c5-4254-ae07-132062e788d4",
    codigo: "143",
    label: "Suprimento de Idade e/ou Consentimento",
  },
  {
    uuid: "c79a45fd-fe3d-4334-9660-3709cc060ef9",
    codigo: "145",
    label: "Suspensão de Execução de Sentença",
  },
  {
    uuid: "586cb6a8-d38d-4163-a7e6-5c34a173fb7f",
    codigo: "11555",
    label: "Suspensão de Liminar e de Sentença",
  },
  {
    uuid: "435386ce-4bfd-4ae1-881a-f2e3b3d44914",
    codigo: "144",
    label: "Suspensão de Liminar ou Antecipação de Tutela",
  },
  {
    uuid: "c0228cc0-b7db-4e86-b58e-c4247a0a3e00",
    codigo: "11556",
    label: "Suspensão de Segurança Cível",
  },
  {
    uuid: "03e4cfa9-d380-4b1d-ae5e-07a2be0af278",
    codigo: "12370",
    label: "Tomada de Decisão Apoiada",
  },
  {
    uuid: "15d48687-b5c4-4a65-b743-eba11f5f3422",
    codigo: "1067",
    label: "Procedimentos Trabalhistas",
  },
  {
    uuid: "dcbe9f1b-738e-4c93-ae08-e069862810ed",
    codigo: "976",
    label: "Ação Anulatória de Cláusulas Convencionais",
  },
  {
    uuid: "6e55d5b9-4a48-41dd-920e-cb20ff54b751",
    codigo: "980",
    label: "Ação de Cumprimento",
  },
  {
    uuid: "4ea0a4ab-37fc-4f19-b22c-7b34059b46a2",
    codigo: "985",
    label: "Ação Trabalhista - Rito Ordinário",
  },
  {
    uuid: "ecf48bbc-6d39-4eb4-bbb2-b762e9bbda5a",
    codigo: "1126",
    label: "Ação Trabalhista - Rito Sumário (Alçada)",
  },
  {
    uuid: "2b3585e4-2cfc-4866-8d7e-d21dd2608523",
    codigo: "1125",
    label: "Ação Trabalhista - Rito Sumaríssimo",
  },
  {
    uuid: "6dc6d0f6-e46a-4e29-89ed-0e0806824d98",
    codigo: "987",
    label: "Dissídio Coletivo",
  },
  {
    uuid: "6c4daed7-8636-409c-aa7d-1e7ad192b687",
    codigo: "988",
    label: "Dissídio Coletivo de Greve",
  },
  {
    uuid: "3f80ae4c-0b12-48ea-a793-a5ebc9f8d07d",
    codigo: "986",
    label: "Inquérito para Apuração de Falta Grave",
  },
  {
    uuid: "5b21e860-a56a-4587-a065-9534f0d21f0e",
    codigo: "1202",
    label: "Reclamação",
  },
  {
    uuid: "a993dc35-afec-4cff-b8aa-26d809e9eaaf",
    codigo: "155",
    label: "Procedimento de Cumprimento de Sentença/Decisão",
  },
  {
    uuid: "f33d1c39-b408-4179-998f-4b2933600b2c",
    codigo: "156",
    label: "Cumprimento de sentença",
  },
  {
    uuid: "f7ec2af2-cbc9-4c24-a797-605df1137c42",
    codigo: "12231",
    label: "Cumprimento de sentença - Lei Arbitral (Lei 9.307/1996)",
  },
  {
    uuid: "6145112d-1ca4-4f58-94db-a715ba474df3",
    codigo: "12078",
    label: "Cumprimento de Sentença contra a Fazenda Pública",
  },
  {
    uuid: "c22f8e18-0285-4fb4-8c72-e60420663ba5",
    codigo: "15215",
    label:
      "Cumprimento de Sentença contra a Fazenda Pública Mediante Execução Invertida",
  },
  {
    uuid: "1753ad6f-9395-4f49-accd-67a869606096",
    codigo: "15160",
    label: "Cumprimento de Sentença de Ações Coletivas",
  },
  {
    uuid: "e33053c5-45c9-4f08-924f-8df791ad8328",
    codigo: "12246",
    label: "Cumprimento de Sentença de Obrigação de Prestar Alimentos",
  },
  {
    uuid: "21eab23b-5f93-4b4e-85b4-52b00b26d056",
    codigo: "10980",
    label: "Cumprimento Provisório de Decisão",
  },
  {
    uuid: "df3a8ef9-c66c-43da-af74-d4083855ed70",
    codigo: "157",
    label: "Cumprimento Provisório de Sentença",
  },
  {
    uuid: "4603217b-ff4a-48b2-bfb7-499de875d144",
    codigo: "15161",
    label: "Cumprimento Provisório de Sentença de Ações Coletivas",
  },
  {
    uuid: "95029838-81ce-4648-bda2-b27c4cea5d81",
    codigo: "10981",
    label: "Impugnação ao Cumprimento de Decisão",
  },
  {
    uuid: "e6f51bb5-75f9-43c8-a614-0c55e85da4e9",
    codigo: "229",
    label: "Impugnação ao Cumprimento de Sentença",
  },
  {
    uuid: "62fcb914-a257-4021-bb21-0a352b317e2f",
    codigo: "150",
    label: "Procedimento de Liquidação",
  },
  {
    uuid: "32d1b9e3-b21b-4267-977b-69d299e95011",
    codigo: "152",
    label: "Liquidação de Sentença pelo Procedimento Comum",
  },
  {
    uuid: "a35f426a-d902-410e-afbe-dfb34bbc1d2b",
    codigo: "151",
    label: "Liquidação por Arbitramento",
  },
  {
    uuid: "9cd20a86-0fda-4aac-9d65-abb17791dbe0",
    codigo: "154",
    label: "Liquidação Provisória de Sentença pelo Procedimento Comum",
  },
  {
    uuid: "1854481b-4964-402c-bced-641bd49d88f4",
    codigo: "12088",
    label: "Liquidação Provisória de Sentença pelo Procedimento Comum",
  },
  {
    uuid: "39d0e0af-af15-433c-bfb7-53403a031b2f",
    codigo: "153",
    label: "Liquidação Provisória por Arbitramento",
  },
  {
    uuid: "86fb2c92-e49f-4221-8fbd-454791de2244",
    codigo: "158",
    label: "Processo de Execução",
  },
  {
    uuid: "7a4f99d1-ec21-4a62-9fc9-7d5a7a517572",
    codigo: "169",
    label: "Embargos",
  },
  {
    uuid: "fd1e6d40-e85a-4faa-940c-066adc1e29dc",
    codigo: "170",
    label: "Embargos à Adjudicação",
  },
  {
    uuid: "dd365b44-1734-4c73-93e0-8854bba9da3b",
    codigo: "171",
    label: "Embargos à Arrematação",
  },
  {
    uuid: "1166e10f-1d3a-49d1-9ae1-0e9f90cfeac0",
    codigo: "172",
    label: "Embargos à Execução",
  },
  {
    uuid: "6dcca10d-63eb-448e-b3ea-48931c4a5bd5",
    codigo: "1118",
    label: "Embargos à Execução Fiscal",
  },
  {
    uuid: "3c3c8f1b-08ba-4720-ae0b-c349959009ca",
    codigo: "173",
    label: "Embargos de Retenção por Benfeitorias",
  },
  {
    uuid: "9eceb43b-306a-4e50-9b5e-808b28992239",
    codigo: "159",
    label: "Execução de Título Extrajudicial",
  },
  {
    uuid: "0712d854-1ca0-4f6b-80df-c4c34f28e007",
    codigo: "12154",
    label: "Execução de Título Extrajudicial",
  },
  {
    uuid: "19888b45-a3d3-46fa-b924-9d91410168ca",
    codigo: "12079",
    label: "Execução de Título Extrajudicial contra a Fazenda Pública",
  },
  {
    uuid: "634c209d-f1cb-411a-b726-98ef6bb1c2e1",
    codigo: "12247",
    label: "Execução Extrajudicial de Alimentos",
  },
  {
    uuid: "7d3bcd7e-27c9-4b04-8ba3-c08eda61879c",
    codigo: "1111",
    label: "Execução de Título Judicial",
  },
  {
    uuid: "6468bbb9-1553-4be1-82f4-877f28788350",
    codigo: "1114",
    label: "Execução Contra a Fazenda Pública",
  },
  {
    uuid: "cb537796-fa52-4ded-9852-e50a8c5e77a5",
    codigo: "1112",
    label: "Execução de Alimentos",
  },
  {
    uuid: "decb6c07-e5a9-4bbf-9153-d117ffa8a7d7",
    codigo: "12251",
    label: "Execução de Título Judicial - CEJUSC",
  },
  {
    uuid: "79ecf241-514e-4e63-b168-1c479ad9eede",
    codigo: "1116",
    label: "Execução Fiscal",
  },
  {
    uuid: "b177b494-8522-49c4-8f93-d1b4796be3e6",
    codigo: "1117",
    label: "Execução Hipotecária do Sistema Financeiro da Habitação",
  },
  {
    uuid: "bb498894-ed2a-40de-a492-4d2df39ad97c",
    codigo: "165",
    label: "Insolvência Civil",
  },
  {
    uuid: "d83d86e2-9c0b-421c-a12e-7b0911f3c99d",
    codigo: "166",
    label: "Insolvência Requerida pelo Credor",
  },
  {
    uuid: "44f007d7-8108-4d98-a8fb-f98d4441fa70",
    codigo: "167",
    label: "Insolvência Requerida pelo Devedor ou pelo Espólio",
  },
  {
    uuid: "1e82d17a-bcf7-492d-97c2-f934754f6167",
    codigo: "1068",
    label: "Processo de Execução Trabalhista",
  },
  {
    uuid: "9f3b4f15-3381-4117-8b43-81a27287a3f8",
    codigo: "993",
    label: "Execução de Certidão de Crédito Judicial",
  },
  {
    uuid: "17fde67b-9bb4-4632-9c0f-eaba48973b48",
    codigo: "991",
    label: "Execução de Termo de Ajuste de Conduta",
  },
  {
    uuid: "296d33aa-b4d8-4cc7-bfcb-5209d30685e3",
    codigo: "992",
    label: "Execução de Termo de Conciliação de CCP",
  },
  {
    uuid: "fccbd3c3-8fc8-457a-a091-a7db67b925b0",
    codigo: "990",
    label: "Execução de Título Extrajudicial",
  },
  {
    uuid: "2d63f605-447d-43e5-887f-c2d600da79db",
    codigo: "994",
    label: "Execução Provisória em Autos Suplementares",
  },
  {
    uuid: "18c560e8-de13-483d-bb1d-6a938c84d247",
    codigo: "15187",
    label: "Plano Especial de Pagamento Trabalhista",
  },
  {
    uuid: "26928a32-435f-45b9-9bb2-d3de3c94f873",
    codigo: "197",
    label: "Recursos",
  },
  {
    uuid: "59734ffc-8b7a-48e0-90d4-faf53ea92efc",
    codigo: "200",
    label: "Agravos",
  },
  {
    uuid: "e2b9780f-d6a6-4a9f-9f52-86502fba7e59",
    codigo: "202",
    label: "Agravo de Instrumento",
  },
  {
    uuid: "3c9bb987-e55b-4fab-885c-5f5dba772aa6",
    codigo: "14774",
    label: "Agravo de Instrumento em Mandado de Segurança",
  },
  {
    uuid: "673dcff4-6252-4279-8908-4485f9e4243a",
    codigo: "203",
    label: "Agravo de Instrumento em Recurso Especial",
  },
  {
    uuid: "39c98ddc-efa0-48bc-acc7-7ae470d32967",
    codigo: "204",
    label: "Agravo de Instrumento em Recurso Extraordinário",
  },
  {
    uuid: "3d7c3761-4cbf-4bbc-be72-54aa41ae1260",
    codigo: "1208",
    label: "Agravo Interno Cível",
  },
  {
    uuid: "e0c6b18f-ce2c-4668-808e-306d0309e913",
    codigo: "206",
    label: "Agravo Regimental Cível",
  },
  {
    uuid: "3b8b2704-fefa-4e3f-b443-06735b05432b",
    codigo: "1728",
    label: "Apelação / Remessa Necessária",
  },
  {
    uuid: "87891e69-2df2-43bd-a70a-30e40fb26ba3",
    codigo: "198",
    label: "Apelação Cível",
  },
  {
    uuid: "1dca4b73-e4f9-46c2-a311-808164a588ae",
    codigo: "10942",
    label: "Correição Parcial Cível",
  },
  {
    uuid: "036ae6e7-a75c-487b-915f-2d4868158900",
    codigo: "207",
    label: "Embargos",
  },
  {
    uuid: "efdaa516-3359-4f00-ada4-a3cf2efe32f7",
    codigo: "1689",
    label: "Embargos de Declaração Cível",
  },
  {
    uuid: "e49eaa46-0db1-4592-a623-2028c85956c6",
    codigo: "208",
    label: "Embargos Infringentes",
  },
  {
    uuid: "313e3c50-eb79-4d0f-81d9-655a64e8ca7d",
    codigo: "210",
    label: "Embargos Infringentes na Execução Fiscal",
  },
  {
    uuid: "ac49b725-7a35-44cb-ac23-e8cc8f34bb6b",
    codigo: "1271",
    label: "Recurso de Medida Cautelar Cível",
  },
  {
    uuid: "c98c9188-9fab-42b4-b571-36c4b9e356db",
    codigo: "213",
    label: "Recurso Especial",
  },
  {
    uuid: "8e53fb52-9d6c-446c-b37d-c4a09b6c5745",
    codigo: "212",
    label: "Recurso Extraordinário",
  },
  {
    uuid: "c5be386c-cc2f-41a0-9b83-82f09d3c62b9",
    codigo: "460",
    label: "Recurso Inominado Cível",
  },
  {
    uuid: "147893e5-7a38-4f90-a89d-ece2e647b8d8",
    codigo: "211",
    label: "Recurso Ordinário Cível",
  },
  {
    uuid: "b73fe52a-ff16-47f2-b93a-86a2d2946f49",
    codigo: "1071",
    label: "Recursos Trabalhistas",
  },
  {
    uuid: "8bfd624f-f134-4443-a4bc-2e58abca03ab",
    codigo: "1209",
    label: "Agravos",
  },
  {
    uuid: "1c70c685-08cd-4f70-bbf9-36803f105648",
    codigo: "1000",
    label: "Agravo",
  },
  {
    uuid: "e6ea4242-86e3-4127-a6a3-03c84d93c4ac",
    codigo: "1001",
    label: "Agravo de Instrumento em Agravo de Petição",
  },
  {
    uuid: "bfb10714-5d2f-4751-9291-8a274a0d4f21",
    codigo: "14775",
    label: "Agravo de Instrumento em Mandado de Segurança",
  },
  {
    uuid: "93fa3761-8de5-4ec8-8119-8dff6e3e2ab9",
    codigo: "1002",
    label: "Agravo de Instrumento em Recurso de Revista",
  },
  {
    uuid: "cbae0fdc-65db-4f41-aca6-31589b9d8424",
    codigo: "1003",
    label: "Agravo de Instrumento em Recurso Ordinário",
  },
  {
    uuid: "02199528-a128-4514-b4aa-7eb9818315a2",
    codigo: "11400",
    label: "Agravo de Instrumento em Recurso Ordinário para o STF",
  },
  {
    uuid: "b8178d88-8f41-4946-b2fa-d1e87f7df3f4",
    codigo: "1004",
    label: "Agravo de Petição",
  },
  {
    uuid: "04c204e1-d0c4-4919-a005-aa09d8059bb4",
    codigo: "1005",
    label: "Agravo Regimental Trabalhista",
  },
  {
    uuid: "dc209b87-6caa-4524-a4ee-4a29c9fc3871",
    codigo: "1006",
    label: "Embargos",
  },
  {
    uuid: "5b50e0b1-e4d1-495b-a169-cd282ff0482e",
    codigo: "1007",
    label: "Embargos Infringentes",
  },
  {
    uuid: "b63bcc97-2eb9-45a5-88a5-ed1fe5ff08ea",
    codigo: "12760",
    label: "Recurso de Julgamento Parcial",
  },
  {
    uuid: "79b31cac-88ba-4673-ad51-e053b3764b2a",
    codigo: "1267",
    label: "Recurso de Multa",
  },
  {
    uuid: "813cfc17-357b-4f40-8fa3-9cf2723f2a93",
    codigo: "1008",
    label: "Recurso de Revista",
  },
  {
    uuid: "bc76ce01-31de-4e9c-84f5-5b19390ed493",
    codigo: "11882",
    label: "Recurso de Revista com Agravo",
  },
  {
    uuid: "9f9e5a09-7169-458f-960b-6bb58df67427",
    codigo: "11886",
    label: "Recurso Ordinário - Rito Sumaríssimo",
  },
  {
    uuid: "86fe5e10-20ff-47eb-949f-9d2447f03ef8",
    codigo: "1009",
    label: "Recurso Ordinário Trabalhista",
  },
  {
    uuid: "d1dfe436-288d-4bed-8a49-13e21475cefd",
    codigo: "11027",
    label: "Remessa Necessária / Recurso Ordinário",
  },
  {
    uuid: "f89a26fe-c1c5-4765-a1ef-06d75a649e7e",
    codigo: "1685",
    label: "Remessa Necessária Trabalhista",
  },
  {
    uuid: "f0645ac5-c6e5-4cac-9917-b9c957cfe032",
    codigo: "199",
    label: "Remessa Necessária Cível",
  },
  {
    uuid: "481d25b3-960e-4a66-8d05-b7275d6b0aae",
    codigo: "12133",
    label: "Tutela Provisória de Urgência e Tutela Provisória de Evidência",
  },
  {
    uuid: "ef7bd680-e538-4052-ba95-f17475924b25",
    codigo: "12135",
    label: "Tutela Antecipada Antecedente",
  },
  {
    uuid: "f429d3e5-1fd1-4207-b55b-08e5a96d00cf",
    codigo: "12134",
    label: "Tutela Cautelar Antecedente",
  },
  {
    uuid: "0d4dffbe-fc39-4730-9956-fec2e90127ff",
    codigo: "334",
    label: "Cartas",
  },
  {
    uuid: "90d55578-33d7-4a0d-b871-e35ead9fe6a1",
    codigo: "335",
    label: "Carta de Ordem Criminal",
  },
  {
    uuid: "61cbfef4-5704-4f64-9b0e-0bc469bc65a6",
    codigo: "355",
    label: "Carta Precatória Criminal",
  },
  {
    uuid: "4d8c51ca-7201-477e-b77a-06fa80543b17",
    codigo: "375",
    label: "Carta Rogatória Criminal",
  },
  {
    uuid: "a8f6c2bf-354d-4bed-874c-a0bba7198ada",
    codigo: "308",
    label: "Medidas Cautelares",
  },
  {
    uuid: "03359c9f-73b0-451f-922a-1e164f632ebb",
    codigo: "11955",
    label: "Cautelar Inominada Criminal",
  },
  {
    uuid: "e728fb09-fe93-4266-aff6-2790a87ca2e1",
    codigo: "14734",
    label: "Medidas de Proteção - Criança e Adolescente (Lei 13.431) Criminais",
  },
  {
    uuid: "fec17456-3a44-46f9-a3b2-2b8b0aebfad0",
    codigo: "10967",
    label: "Medidas de Proteção à Pessoa Idosa - Criminal",
  },
  {
    uuid: "4f21efcc-9e7c-438c-8ae0-400c3505ebac",
    codigo: "311",
    label: "Medidas Investigatórias Sobre Organizações Criminosas",
  },
  {
    uuid: "61a169b2-91cc-4029-adca-3b4f2923d616",
    codigo: "1268",
    label: "Medidas Protetivas de Urgência (Lei Maria da Penha) - Criminal",
  },
  {
    uuid: "e81dc5e6-8f1d-43b6-b3fb-f2f8c79e5f81",
    codigo: "15170",
    label:
      "Medidas Protetivas de Urgência - Crianças e Adolescentes (Lei Henry Borel - Lei 14.344/2022) Criminais",
  },
  {
    uuid: "1a469f66-d309-4759-bf03-d75240ea37f5",
    codigo: "309",
    label: "Pedido de Busca e Apreensão Criminal",
  },
  {
    uuid: "c04591b2-f8b2-487d-8644-4345148b8adf",
    codigo: "312",
    label: "Pedido de Prisão",
  },
  {
    uuid: "dc56b5fd-1b4e-4ce9-87a9-df78fb70b950",
    codigo: "313",
    label: "Pedido de Prisão Preventiva",
  },
  {
    uuid: "201ef22f-e73a-4085-abf7-04ed3c37765b",
    codigo: "314",
    label: "Pedido de Prisão Temporária",
  },
  {
    uuid: "54700ef0-330b-472b-8968-e47faa74f9b6",
    codigo: "315",
    label: "Pedido de Prisão/ Liberdade Vigiada para Fins de Expulsão",
  },
  {
    uuid: "c91d0f4a-521e-48a8-837f-f1ef37bafb77",
    codigo: "310",
    label: "Pedido de Quebra de Sigilo de Dados e/ou Telefônico",
  },
  {
    uuid: "1b3b9f11-df99-4d94-abcb-52768cac131e",
    codigo: "11793",
    label: "Produção Antecipada de Provas Criminal",
  },
  {
    uuid: "cb896f3c-cba6-4b11-ab75-f0865b54352b",
    codigo: "303",
    label: "Medidas Garantidoras",
  },
  {
    uuid: "212b8a34-7ad6-464b-912a-be8187741bdb",
    codigo: "307",
    label: "Habeas Corpus Criminal",
  },
  {
    uuid: "74ab7e13-b3f0-484e-b6cf-da9657d01e8f",
    codigo: "304",
    label: "Liberdade",
  },
  {
    uuid: "cc69d4ba-dbca-4c5d-942c-e0af6bb8c0b4",
    codigo: "305",
    label: "Liberdade Provisória com ou sem fiança",
  },
  {
    uuid: "fd917b50-c167-4d34-b82a-43ae61ae5ccb",
    codigo: "306",
    label: "Relaxamento de Prisão",
  },
  {
    uuid: "38797365-4c8b-41be-a255-8829ddaa8fab",
    codigo: "269",
    label: "Medidas Preparatórias",
  },
  {
    uuid: "0db8ede4-480f-4d3b-b9c0-a7d44d88de64",
    codigo: "274",
    label: "Interpelações",
  },
  {
    uuid: "aefcc55d-0607-4661-ab1f-76dfcd523073",
    codigo: "275",
    label: "Notificação para Explicações",
  },
  {
    uuid: "a19a21d5-bdfb-436f-a7e3-8f24a984263c",
    codigo: "276",
    label: "Notificação para Explicações (Lei de Imprensa)",
  },
  {
    uuid: "8aa85b59-1ffc-44e1-86e8-c5d9f223d30a",
    codigo: "270",
    label: "Notícia-Crime",
  },
  {
    uuid: "b69252a5-8273-440e-8f44-60c72bc638e3",
    codigo: "1727",
    label: "Petição Criminal",
  },
  {
    uuid: "14479cdc-ae16-4be8-9680-8afe3a7cf235",
    codigo: "281",
    label: "Procedimento Comum",
  },
  {
    uuid: "4499e151-8ffb-4046-84da-23e7abf07090",
    codigo: "283",
    label: "Ação Penal - Procedimento Ordinário",
  },
  {
    uuid: "bedb0cf2-3c7b-4163-bcbf-00242265bdea",
    codigo: "10943",
    label: "Ação Penal - Procedimento Sumário",
  },
  {
    uuid: "4409816e-dc9b-424a-889b-46fd05a2b941",
    codigo: "10944",
    label: "Ação Penal - Procedimento Sumaríssimo",
  },
  {
    uuid: "d6ae3af9-0fbe-4216-b98e-02690e2bcb54",
    codigo: "282",
    label: "Ação Penal de Competência do Júri",
  },
  {
    uuid: "6ab2c78f-a8de-4357-ac8c-0008feb2b9f0",
    codigo: "277",
    label: "Procedimentos Investigatórios",
  },
  {
    uuid: "64a5e39f-86cd-483f-bad4-6efd3573b92c",
    codigo: "280",
    label: "Auto de Prisão em Flagrante",
  },
  {
    uuid: "bdb89eab-7f97-46b2-aa20-fac893b69d26",
    codigo: "12121",
    label: "Comunicado de Mandado de Prisão",
  },
  {
    uuid: "02cd6ce5-8b00-4b54-9b45-2114d571db96",
    codigo: "279",
    label: "Inquérito Policial",
  },
  {
    uuid: "4732fb5f-5395-40a1-adcc-7f15c299f4ff",
    codigo: "1731",
    label: "Investigação contra magistrado",
  },
  {
    uuid: "bad387d1-b78d-4b2a-851e-16537c093be7",
    codigo: "1733",
    label: "Procedimento Investigatório Criminal (PIC-MP)",
  },
  {
    uuid: "6089d3c3-923e-4fd0-b411-3d23125a6865",
    codigo: "271",
    label: "Representação Criminal",
  },
  {
    uuid: "7f7e46ad-a894-42b8-a420-66e9068add0d",
    codigo: "273",
    label: "Pedido de Arquivamento em Representação Criminal",
  },
  {
    uuid: "b79fd4a5-3b49-4570-a8e5-203f5ddf03b4",
    codigo: "272",
    label: "Representação Criminal/Notícia de Crime",
  },
  {
    uuid: "bea48471-113e-4055-94ec-998e69331984",
    codigo: "278",
    label: "Termo Circunstanciado",
  },
  {
    uuid: "fbcdbc3e-a39a-46bb-970d-74fcf1c7d6ba",
    codigo: "284",
    label: "Processo Especial",
  },
  {
    uuid: "c0374fac-178c-4232-9fc8-7a9ccb178623",
    codigo: "292",
    label: "Processo Especial de Leis Esparsas",
  },
  {
    uuid: "a37568c4-a417-495d-b20b-d77716be1fd9",
    codigo: "293",
    label: "Crimes Ambientais",
  },
  {
    uuid: "1d873e3a-8681-47a6-a324-d4405ece319c",
    codigo: "294",
    label: "Crimes Contra a Propriedade Industrial",
  },
  {
    uuid: "1a0c4f5d-ac5d-4fde-969d-58cd89b77c5a",
    codigo: "295",
    label: "Crimes Contra a Propriedade Intelectual",
  },
  {
    uuid: "7ff91c4c-536a-4c59-8f2c-899ff0bac4d0",
    codigo: "297",
    label: "Crimes de Imprensa",
  },
  {
    uuid: "28a419f9-c7e7-420f-80f3-c27093104a02",
    codigo: "14701",
    label: "Habeas Data Criminal",
  },
  {
    uuid: "c49c0792-bd9a-4e6e-9a5b-39f0c80cbafa",
    codigo: "1710",
    label: "Mandado de Segurança Criminal",
  },
  {
    uuid: "f4a09eab-a1d9-4068-9fd3-f6b44e557c81",
    codigo: "299",
    label: "Procedimento do Juizado Especial Criminal - Sumariíssimo",
  },
  {
    uuid: "f1c5cdc9-80fb-4f1f-8406-7c38352ef259",
    codigo: "300",
    label: "Procedimento Especial da Lei Antitóxicos",
  },
  {
    uuid: "4a0d018e-4904-4a39-b273-030586ef9f02",
    codigo: "302",
    label: "Procedimento Especial dos Crimes de Abuso de Autoridade",
  },
  {
    uuid: "40c9be40-11a3-4334-af0d-8254a6c52c83",
    codigo: "12122",
    label: "Reclamação Criminal",
  },
  {
    uuid: "5aa8a890-69c3-45f7-a275-5b8b6c624dfe",
    codigo: "285",
    label: "Processo Especial do Código de Processo Penal",
  },
  {
    uuid: "2e8dd12b-3106-4b54-a5f5-7f9803ebccac",
    codigo: "289",
    label: "Crimes Contra a Propriedade Imaterial",
  },
  {
    uuid: "ac147cae-44ca-46c7-b2db-ca22516c6f58",
    codigo: "288",
    label:
      "Crimes de Calúnia, Injúria e Difamação de Competência do Juiz Singular",
  },
  {
    uuid: "ed773e67-7ca5-465f-9279-c1aad5401a93",
    codigo: "287",
    label: "Crimes de Responsabilidade dos Funcionários Públicos",
  },
  {
    uuid: "766db739-7d0c-4d86-8e68-505263896b93",
    codigo: "11798",
    label:
      "Processo de Aplicação de Medida de Segurança Por Fato Não Criminoso",
  },
  {
    uuid: "c071dbfc-321f-44f0-914b-6fa56f78cf9d",
    codigo: "290",
    label: "Processo Sumário (Detenção)",
  },
  {
    uuid: "a970c567-0425-4afa-8370-fd51101809b7",
    codigo: "291",
    label: "Restauração de Autos Criminal",
  },
  {
    uuid: "9871de19-fe39-4438-9f8a-5901d120fb6b",
    codigo: "12394",
    label: "Revisão Criminal",
  },
  {
    uuid: "07441303-e7b0-4d0f-a40a-bd0badeb5c60",
    codigo: "316",
    label: "Questões e Processos Incidentes",
  },
  {
    uuid: "b7d87608-3110-43c8-a9ac-1abc66330da9",
    codigo: "1717",
    label: "Alienação de Bens do Acusado",
  },
  {
    uuid: "a6ec88ef-fc2b-4bd9-8026-1d1ddd9b1f96",
    codigo: "14123",
    label: "Destinação de Bens Apreendidos",
  },
  {
    uuid: "5f9b449c-8bdb-40c5-a997-c1bb2bc72080",
    codigo: "327",
    label: "Embargos de Terceiro Criminal",
  },
  {
    uuid: "c9d9c23e-b434-4aa9-b745-d812c8bf3ac6",
    codigo: "1715",
    label: "Embargos do Acusado",
  },
  {
    uuid: "e81daa88-3182-4e89-8b64-d427a30545dc",
    codigo: "317",
    label: "Exceções",
  },
  {
    uuid: "fc551da4-0cf9-439f-997f-33e88f839921",
    codigo: "324",
    label: "Exceção da Verdade",
  },
  {
    uuid: "63203b42-4cb3-457b-9b86-71141181746e",
    codigo: "322",
    label: "Exceção de Coisa Julgada",
  },
  {
    uuid: "8bfa6cb2-a207-4f1d-8dec-6c1b79b5a52d",
    codigo: "321",
    label: "Exceção de Ilegitimidade de Parte",
  },
  {
    uuid: "4860dfe3-43c3-47c3-9d8b-01bb52cdd16f",
    codigo: "323",
    label: "Exceção de Impedimento",
  },
  {
    uuid: "f2c2619b-0ec4-4917-9b24-cad748ac1450",
    codigo: "319",
    label: "Exceção de Incompetência de Juízo",
  },
  {
    uuid: "db2d631e-9ed1-4917-b912-d23ca8dd4f03",
    codigo: "320",
    label: "Exceção de Litispendência",
  },
  {
    uuid: "2c8e6a18-12c6-414c-b791-79da7e1c68c0",
    codigo: "318",
    label: "Exceção de Suspeição",
  },
  {
    uuid: "e564579d-d0d2-4d49-b5cd-6750c0804ebb",
    codigo: "331",
    label: "Incidentes",
  },
  {
    uuid: "f2bba5b4-3333-4c52-9c52-1a6364838d7b",
    codigo: "14678",
    label: "Acordo de Não Persecução Penal",
  },
  {
    uuid: "2979febe-b4f4-4e8f-ac91-e6404212db37",
    codigo: "11787",
    label: "Assistência Judiciária",
  },
  {
    uuid: "8256f999-f724-434e-9d68-97bb025e1366",
    codigo: "1719",
    label: "Avaliação para atestar dependência de drogas",
  },
  {
    uuid: "ff94f0b0-6229-4f3d-a226-9a1ea81252af",
    codigo: "325",
    label: "Conflito de Jurisdição",
  },
  {
    uuid: "d26deea6-4f60-4982-a67f-4bbacf1a3030",
    codigo: "432",
    label: "Desaforamento de Julgamento",
  },
  {
    uuid: "42166ad4-5c5e-4ed8-a2a5-03f868f89937",
    codigo: "11788",
    label: "Exibição de Documento ou Coisa Criminal",
  },
  {
    uuid: "b11bd876-7c7e-473e-a08d-f8fca1eded7c",
    codigo: "12077",
    label: "Homologação em Acordo de Colaboração Premiada",
  },
  {
    uuid: "4e95e70b-e568-4dfb-a319-c47f38bf1743",
    codigo: "11789",
    label: "Impugnação ao Valor da Causa",
  },
  {
    uuid: "276463ff-0c05-4518-a99f-8657d63888ed",
    codigo: "11790",
    label: "Impugnação de Assistência Judiciária",
  },
  {
    uuid: "543eecf0-60cc-4136-9952-ec54990b12ab",
    codigo: "1178",
    label: "Incidente de Arguição de Inconstitucionalidade Criminal",
  },
  {
    uuid: "512b021c-6c1a-4683-9a62-d979c1461d14",
    codigo: "332",
    label: "Incidente de Falsidade",
  },
  {
    uuid: "2b64c73b-29d0-437d-8520-af7143d1cedc",
    codigo: "433",
    label: "Incidente de Uniformização de Jurisprudência",
  },
  {
    uuid: "2d5a38d9-9be0-454f-b7c9-13384f6ec30f",
    codigo: "333",
    label: "Insanidade Mental do Acusado",
  },
  {
    uuid: "81ea2727-505e-4edf-8b54-b5c0bc4cb5e4",
    codigo: "11791",
    label: "Pedido de Uniformização de Interpretação de Lei Criminal",
  },
  {
    uuid: "8446c6be-b199-4ad4-a274-76195be8bb17",
    codigo: "1291",
    label: "Reabilitação",
  },
  {
    uuid: "bd4b01fc-c6f6-4c2f-9998-420bf8c96e33",
    codigo: "328",
    label: "Medidas Assecuratórias",
  },
  {
    uuid: "8cd6c09e-40d3-4a3c-a958-57592ac01c0a",
    codigo: "330",
    label: "Arresto / Hipoteca Legal",
  },
  {
    uuid: "087eacdf-76b4-4d70-a91b-309b1c3d52c6",
    codigo: "329",
    label: "Seqüestro",
  },
  {
    uuid: "8efaf5d6-0023-49ed-a2ec-dae7008436e4",
    codigo: "326",
    label: "Restituição de Coisas Apreendidas",
  },
  {
    uuid: "bceb49c3-7c7f-43ba-a18c-266232af9731",
    codigo: "412",
    label: "Recursos",
  },
  {
    uuid: "535dda31-53c6-4f7f-935b-22a66c86fb9d",
    codigo: "413",
    label: "Agravo de Execução Penal",
  },
  {
    uuid: "ebe06b1f-163d-4390-8326-03a11d76cbb0",
    codigo: "1711",
    label: "Agravo de Instrumento em Recurso Especial",
  },
  {
    uuid: "926ee819-743c-43a8-af07-2785962ece83",
    codigo: "1712",
    label: "Agravo de Instrumento em Recurso Extraordinário",
  },
  {
    uuid: "ec9bf029-feb3-4fb7-9083-c3972d3cf33c",
    codigo: "1729",
    label: "Agravo Interno Criminal",
  },
  {
    uuid: "fc0d9953-8164-445f-bc14-336307bc3f54",
    codigo: "417",
    label: "Apelação Criminal",
  },
  {
    uuid: "4143bd29-aaa1-468e-a680-5f1c952ea765",
    codigo: "416",
    label: "Apelação em Mandado de Segurança",
  },
  {
    uuid: "51d324c7-2af5-47d2-89f7-13d8ca22cd52",
    codigo: "418",
    label: "Carta Testemunhável",
  },
  {
    uuid: "6c328590-2ac4-471f-b763-725d6927ad1e",
    codigo: "419",
    label: "Correição Parcial Criminal",
  },
  {
    uuid: "cc56500d-7b74-4570-b197-f5b0b2ca8351",
    codigo: "420",
    label: "Embargos de Declaração Criminal",
  },
  {
    uuid: "ddbc39bb-1586-4836-abd9-682863e24061",
    codigo: "421",
    label: "Embargos Infringentes e de Nulidade",
  },
  {
    uuid: "a29e27d2-e0d8-4e45-8d72-a361d3ccd293",
    codigo: "422",
    label: "Protesto por Novo Júri",
  },
  {
    uuid: "280bc236-614d-43bf-a1a6-bc5a8fdbf569",
    codigo: "424",
    label: "Recurso de Medida Cautelar Criminal",
  },
  {
    uuid: "8fe21fd9-4b4f-465c-ab7b-2e6d711f409f",
    codigo: "425",
    label: "Recurso de Sentença Criminal",
  },
  {
    uuid: "a41879f5-1ea6-4fbf-811e-b91b414f73e4",
    codigo: "426",
    label: "Recurso em Sentido Estrito",
  },
  {
    uuid: "f8821d1d-a141-4192-8038-6b1b2763bad4",
    codigo: "11398",
    label: "Recurso em sentido estrito/Recurso ex officio",
  },
  {
    uuid: "49a5562c-37e6-4509-918e-78f9e3327847",
    codigo: "1730",
    label: "Recurso Ordinário Criminal",
  },
  {
    uuid: "6b8c541e-5ae2-4495-a48e-b88cc815fb39",
    codigo: "427",
    label: "Remessa Necessária Criminal",
  },
  {
    uuid: "0bcead45-ee54-4abf-8566-7eef66464278",
    codigo: "428",
    label: "Revisão Criminal",
  },
  {
    uuid: "aca248ef-eba4-44d0-9e2a-76e39adb2193",
    codigo: "11528",
    label: "Ação Penal Eleitoral",
  },
  {
    uuid: "f572e2f7-9f0d-470b-9101-61387d27f088",
    codigo: "11551",
    label: "Consulta",
  },
  {
    uuid: "b04cf9c3-3156-4d53-b980-14a24dd113ac",
    codigo: "12464",
    label: "Corregedoria Eleitoral",
  },
  {
    uuid: "78aa92b2-3329-4acb-84cc-a9433d0f8cab",
    codigo: "12466",
    label: "Inquérito Administrativo",
  },
  {
    uuid: "394d75ca-3b84-4d0f-8fb5-b92a9a1c349c",
    codigo: "12465",
    label: "Petição Corregedoria",
  },
  {
    uuid: "51770b7c-fd1c-4d8f-96e7-e1aff37289dd",
    codigo: "12552",
    label: "Direitos Políticos",
  },
  {
    uuid: "bb47924d-8551-42ed-bcf5-1fad5a308a47",
    codigo: "11552",
    label: "Pedido de Desaforamento",
  },
  {
    uuid: "2b326754-46d3-42d5-95be-4241e2104aaa",
    codigo: "11540",
    label: "Procedimentos Administrativos da Justiça Eleitoral",
  },
  {
    uuid: "7c41dceb-7a1f-43c1-a1f4-8245b594f27d",
    codigo: "12549",
    label: "Cancelamento de Inscrição Eleitoral (CIE)",
  },
  {
    uuid: "1beec284-e107-4f95-8642-38e57bf4250c",
    codigo: "11542",
    label: "Correição",
  },
  {
    uuid: "87bb3404-5918-4351-a568-fed1bff96925",
    codigo: "11543",
    label: "Criação de Zona Eleitoral ou Remanejamento",
  },
  {
    uuid: "b6684868-3f00-45aa-822b-c5199ecb49e2",
    codigo: "12551",
    label: "Descarte de Material",
  },
  {
    uuid: "54f836ad-9cf3-4028-847f-2affcf652712",
    codigo: "12553",
    label: "Duplicidade/Pluralidade de Inscrições - Coincidências",
  },
  {
    uuid: "d0d250de-a513-4bd4-ae8f-69bd67ef974d",
    codigo: "11544",
    label: "Instrução",
  },
  {
    uuid: "83815e48-fe30-47fa-9efd-e509d5594d80",
    codigo: "11545",
    label: "Lista Tríplice",
  },
  {
    uuid: "3b859aa9-d089-4354-aa24-0aa2b6afd169",
    codigo: "12557",
    label: "Recurso/Impugnação de Alistamento Eleitoral",
  },
  {
    uuid: "b0ceb72d-7dd2-4131-811a-f45bf4464e4b",
    codigo: "12559",
    label: "Regularização de Situação do Eleitor",
  },
  {
    uuid: "c5a01d61-f0a9-4e86-80ee-8f8f56a7a922",
    codigo: "11546",
    label: "Revisão de Eleitorado",
  },
  {
    uuid: "dee0e4c9-6ad2-4aa1-9e24-a479bd4a6f4f",
    codigo: "11534",
    label: "Procedimentos Relativos a Partidos Políticos",
  },
  {
    uuid: "9a597326-5366-4fb6-b858-2d429a7a2271",
    codigo: "12628",
    label:
      "Ação de Justificação de Desfiliação Partidária/Perda de Cargo Eletivo",
  },
  {
    uuid: "723dbb8c-bf84-4969-b790-18a98ee11705",
    codigo: "11535",
    label: "Cancelamento de Registro de Partido Político",
  },
  {
    uuid: "b1c5c382-199e-45a6-806b-598717a1de62",
    codigo: "12554",
    label: "Filiação Partidária",
  },
  {
    uuid: "2a5d7628-3439-4ac6-b609-b1dee40338e6",
    codigo: "12560",
    label: "Lista de Apoiamento para Criação de Partido Político",
  },
  {
    uuid: "1eaab53e-f2bb-4b3c-851e-b865682d361c",
    codigo: "12629",
    label: "Pedido de Novas Eleições",
  },
  {
    uuid: "403f6854-f976-44ad-b7ce-b420b9d12139",
    codigo: "12377",
    label: "Prestação de Contas Anual",
  },
  {
    uuid: "54e32844-37eb-413a-adaa-783808cd7975",
    codigo: "11536",
    label: "Propaganda Partidária",
  },
  {
    uuid: "885ab008-1b67-4588-84b6-242bd41aa9c8",
    codigo: "15011",
    label: "Registro de Federação Partidária",
  },
  {
    uuid: "491ebe7a-63b4-4f90-af59-8b60d60c901b",
    codigo: "11537",
    label: "Registro de Órgão de Partido Político em Formação",
  },
  {
    uuid: "04966a37-e8a4-4cc1-9f28-67628cbe1e47",
    codigo: "11539",
    label: "Registro de Partido Político",
  },
  {
    uuid: "544c921c-1c65-4bfd-aca5-fa8ff89d1b3f",
    codigo: "12631",
    label:
      "Requerimento de Regularização de Omissão de Prestação de Contas Anual",
  },
  {
    uuid: "71e3d595-5c4c-4e07-8016-99a931cc9ac5",
    codigo: "12632",
    label:
      "Requerimento de Regularização de Omissão de Prestação de Contas Anual",
  },
  {
    uuid: "df977d87-f4fb-4a5b-8446-f8a2aa3fb68b",
    codigo: "14208",
    label: "Suspensão de Órgão Partidário",
  },
  {
    uuid: "8dacd6a1-e6a7-47c3-a1a9-b13bfc19bbfd",
    codigo: "11529",
    label: "Procedimentos Relativos a Realização de Eleição",
  },
  {
    uuid: "56e72e14-929f-46cf-a82d-8ce60b67bfa9",
    codigo: "11530",
    label: "Apuração de Eleição",
  },
  {
    uuid: "2db9554b-021d-461c-9ccc-52412b6bd8d0",
    codigo: "12550",
    label: "Composição de Mesa Receptora",
  },
  {
    uuid: "bc76fec8-fccd-425b-b718-23d826904dd9",
    codigo: "12625",
    label: "Direito de Resposta",
  },
  {
    uuid: "d54636f9-68bb-4913-8120-e405aa55b7fe",
    codigo: "12555",
    label: "Impugnação à Composição de Junta Eleitoral",
  },
  {
    uuid: "90ce4a72-d71c-4484-9f11-ac41f60ff6c6",
    codigo: "12556",
    label: "Impugnação Perante as Juntas Eleitorais",
  },
  {
    uuid: "5d5ca325-0bdb-4c4e-b66f-fcbf30cf6fda",
    codigo: "12561",
    label: "Notícia de Irregularidade em Propaganda Eleitoral",
  },
  {
    uuid: "2849546f-241b-4e4a-aa2e-78535386ea4b",
    codigo: "11531",
    label: "Prestação de Contas",
  },
  {
    uuid: "5b419083-f48c-4975-a33d-22977a0fb419",
    codigo: "12193",
    label: "Prestação de Contas Eleitorais",
  },
  {
    uuid: "9489bab8-7712-416f-9321-0f975b242f43",
    codigo: "15323",
    label: "Reclamação Administrativa Eleitoral",
  },
  {
    uuid: "83a7239b-48e2-4cff-9277-80d59318b807",
    codigo: "11533",
    label: "Recurso contra Expedição de Diploma",
  },
  {
    uuid: "9ae8fc69-ac9b-4b9d-bfe1-317714410493",
    codigo: "11532",
    label: "Registro de Candidatura",
  },
  {
    uuid: "06b0280c-66e6-4737-b972-21a6de9e1271",
    codigo: "11538",
    label: "Registro de Comitê Financeiro",
  },
  {
    uuid: "f557e18a-6de5-4a93-83d6-8aec188fd599",
    codigo: "12558",
    label: "Registro de Debates",
  },
  {
    uuid: "ad936a5a-aeda-493f-81c1-4a1e4d645fc6",
    codigo: "11541",
    label: "Representação",
  },
  {
    uuid: "a5a9134d-f81b-44e4-9c76-386984564aef",
    codigo: "12630",
    label: "Representação Especial",
  },
  {
    uuid: "feb79731-15d4-4351-8ab3-798c6c625bce",
    codigo: "12633",
    label:
      "Requerimento de Regularização de Omissão de Prestação de Contas Eleitorais",
  },
  {
    uuid: "8a0ae8f0-9adf-46ee-931c-b5b2fa13dcc6",
    codigo: "11525",
    label: "Processos Cíveis-Eleitorais",
  },
  {
    uuid: "56dfa0d0-906d-4014-b879-40d6c36dbc56",
    codigo: "12061",
    label: "Ação Cautelar",
  },
  {
    uuid: "b8c62130-0580-4de5-b581-a03a5440a3a1",
    codigo: "11526",
    label: "Ação de Impugnação de Mandato Eletivo",
  },
  {
    uuid: "49d39899-8618-4249-bd01-c9fd44967e13",
    codigo: "11527",
    label: "Ação de Investigação Judicial Eleitoral",
  },
  {
    uuid: "c8ebfe09-6776-4d17-83d1-af3c1f008f9a",
    codigo: "12627",
    label: "Ação Rescisória Eleitoral",
  },
  {
    uuid: "8b2177bf-396f-4375-88b5-3296d9e0b093",
    codigo: "12060",
    label: "Incidente de Impedimento/Suspeição",
  },
  {
    uuid: "21e4f276-ee4b-47ee-84c7-0185207a72c4",
    codigo: "15303",
    label: "Representação em Propaganda Partidária",
  },
  {
    uuid: "40910800-02e7-4391-a693-6278fc37cf5a",
    codigo: "12059",
    label: "Suspensão de Segurança - Eleitoral",
  },
  {
    uuid: "1fa1bced-e976-4cae-b4d3-0c2f3d5ba673",
    codigo: "11547",
    label: "Recursos Eleitorais",
  },
  {
    uuid: "54a90ce2-d9da-4b68-a646-4b9f58f2b113",
    codigo: "12626",
    label: "Agravo em Recurso Especial Eleitoral",
  },
  {
    uuid: "67189ea5-c8ea-4373-bb92-d55b55e3b77c",
    codigo: "15090",
    label: "Recurso",
  },
  {
    uuid: "adef8983-ea05-439d-9527-288001545348",
    codigo: "14209",
    label: "Recurso Criminal Eleitoral",
  },
  {
    uuid: "1cb70dea-a126-4155-b088-f2c6caa9234a",
    codigo: "11548",
    label: "Recurso Eleitoral",
  },
  {
    uuid: "1550148c-c9b5-492b-84e0-213c436eccd2",
    codigo: "11549",
    label: "Recurso Especial Eleitoral",
  },
  {
    uuid: "684fd494-14d3-453d-9741-dcba02b1d702",
    codigo: "11550",
    label: "Recurso Ordinário Eleitoral",
  },
  {
    uuid: "b3a8f5d5-ae7c-41f5-bc59-17bbc95bc6d2",
    codigo: "12057",
    label: "Reexame Necessário Eleitoral",
  },
  {
    uuid: "bda85da4-59c7-4245-ac61-2a7540f9075c",
    codigo: "12058",
    label: "Suspensão de Segurança",
  },
  {
    uuid: "b3d5eefd-3ec0-48ce-866d-e62f7d563af7",
    codigo: "11034",
    label: "Conselho de Justificação",
  },
  {
    uuid: "ea0ab45a-ab55-4838-9dae-fecf53665f25",
    codigo: "11035",
    label: "Representação p/ Declaração de Indignidade/Incompatibilidade",
  },
  {
    uuid: "b33edb2d-6e24-48db-9759-d9ecf02c4f2b",
    codigo: "11036",
    label: "Representação p/ Perda da Graduação",
  },
  {
    uuid: "d35e6cae-e125-4072-8184-ae5a988cf69a",
    codigo: "11037",
    label: "Ação Penal Militar - Procedimento Ordinário",
  },
  {
    uuid: "1569e230-b3d4-4f20-8d87-67d3f6afe7c6",
    codigo: "11031",
    label: "Procedimento Especial",
  },
  {
    uuid: "6b7f1188-0e7a-4193-8943-78a538ba2785",
    codigo: "11042",
    label: "Correição Parcial Militar",
  },
  {
    uuid: "d04893c5-d0fd-4720-b1a2-4db77b3a6b93",
    codigo: "11043",
    label: "Deserção",
  },
  {
    uuid: "4b49403e-0d73-4f0b-9cae-6dd255a26f7d",
    codigo: "11045",
    label: "Deserção de Oficial",
  },
  {
    uuid: "6fa0babf-bdaa-400e-86e6-53b3e1465bbe",
    codigo: "11046",
    label: "Deserção de Praça",
  },
  {
    uuid: "5c87a8c9-0377-4260-b1b7-b22ec6761691",
    codigo: "11553",
    label: "Instrução Provisória de Deserção",
  },
  {
    uuid: "cd5c5dbc-895a-40ff-ba1e-12899a7fe734",
    codigo: "11044",
    label: "Insubmissão",
  },
  {
    uuid: "30f77281-bd7e-4aa7-902e-f8d8179c0df0",
    codigo: "11032",
    label: "Procedimentos Investigatórios",
  },
  {
    uuid: "de77809f-0cdd-471b-80bf-133749d6d24a",
    codigo: "11041",
    label: "Inquérito Policial Militar",
  },
  {
    uuid: "d2b4f8a7-5897-48ef-9873-731cdbe67a3c",
    codigo: "11800",
    label: "Instrução Provisória de Deserção",
  },
  {
    uuid: "a80ac933-a600-4f3e-a8b4-ecc758b82e63",
    codigo: "11799",
    label: "Instrução Provisória de Insubmissão",
  },
  {
    uuid: "116c56fa-7e54-4f65-b3fb-35787029877e",
    codigo: "11033",
    label: "Recursos",
  },
  {
    uuid: "3a4cf028-cab6-4313-abc1-2d7581e9974f",
    codigo: "11038",
    label: "Embargos em Ação Penal Militar",
  },
  {
    uuid: "cbd80b8a-d878-4f36-ade6-87772fb4e7d4",
    codigo: "11039",
    label: "Reclamação Militar",
  },
  {
    uuid: "87de8bb4-d16c-48e6-bdd8-9b2d533d0321",
    codigo: "11040",
    label: "Recurso Inominado Militar",
  },
  {
    uuid: "c4a4d1fc-c8c8-4d6c-b4ab-2fe5fb79e4c8",
    codigo: "15321",
    label: "Revisão Judicial - RDII",
  },
  {
    uuid: "86b48d77-8c50-465e-9dcc-455afa63f7b6",
    codigo: "1670",
    label: "Ação de Improbidade Administrativa",
  },
  {
    uuid: "879ff1c8-d3d2-44e5-8865-7cc7f0414367",
    codigo: "1033",
    label: "Ação Penal",
  },
  {
    uuid: "b4fc82bc-4b1d-478c-bd6d-e4c8bf13cf8e",
    codigo: "1669",
    label: "Ação Rescisória",
  },
  {
    uuid: "6f1b1a31-3cd9-4f4b-bf6d-bb45e42f6520",
    codigo: "1044",
    label: "Agravo de Instrumento",
  },
  {
    uuid: "b2e74cec-7a70-4397-a6df-560cf4a089ea",
    codigo: "1013",
    label: "Agravo em Recurso de Habeas Corpus",
  },
  {
    uuid: "75fb24a5-efd5-46bd-befc-d3b3c3e009e6",
    codigo: "1046",
    label: "Agravo em Recurso de Mandado de Segurança",
  },
  {
    uuid: "1576dc3d-579a-4266-8a1e-a620be966892",
    codigo: "11881",
    label: "Agravo em Recurso Especial",
  },
  {
    uuid: "308ac07a-e60b-422f-abd4-5602494887eb",
    codigo: "1045",
    label: "Agravo em Recurso Extraordinário",
  },
  {
    uuid: "0f4a6f0b-5dfb-4d44-bef6-8ba4ceb48ac5",
    codigo: "1035",
    label: "Apelação Cível",
  },
  {
    uuid: "7dcebdcb-91a8-4f94-a958-b26b792a48ae",
    codigo: "1047",
    label: "Carta Rogatória",
  },
  {
    uuid: "ffa9879d-2e32-4a8c-87a4-8128e5890a55",
    codigo: "1671",
    label: "Comunicação",
  },
  {
    uuid: "9957505d-bac3-4375-b7bc-2bd2eb82b80d",
    codigo: "1053",
    label: "Conflito de Atribuição",
  },
  {
    uuid: "21052ec5-7627-41e8-a785-80540fe0226b",
    codigo: "1054",
    label: "Conflito de Competência",
  },
  {
    uuid: "f3e4be4d-03fb-4328-97b4-b7931bcb8c01",
    codigo: "1018",
    label: "Embargos à Execução em Ação Recisoria",
  },
  {
    uuid: "6d2096e8-a8e2-41e8-9778-8e09e9185dbc",
    codigo: "1017",
    label: "Embargos à Execução em Mandado de Segurança",
  },
  {
    uuid: "2f92bc17-2f6c-4f2e-b2b1-92d9b04ef18d",
    codigo: "1019",
    label: "Embargos à Execução em Medida Cautelar",
  },
  {
    uuid: "89ce81a6-6581-45dd-9b5a-63d48652caa1",
    codigo: "11956",
    label: "Embargos de Divergência em Agravo em Recurso Especial",
  },
  {
    uuid: "000f7e00-b76c-496c-aa03-724f5233814a",
    codigo: "1016",
    label: "Embargos de Divergência em Agravo Regimental",
  },
  {
    uuid: "13c21b6c-5a3d-4f9a-952f-5406cd3cbb5a",
    codigo: "1015",
    label: "Embargos de Divergência em Recurso de Mandado de Segurança",
  },
  {
    uuid: "6aca773d-80d3-4dc1-a325-01e689396d97",
    codigo: "1137",
    label: "Embargos de Divergência em Recurso Especial",
  },
  {
    uuid: "c1099903-02cb-499b-a41a-44e78b8c6b52",
    codigo: "1066",
    label: "Embargos Infringentes em Ação Rescisória",
  },
  {
    uuid: "8967eeb2-6ce4-4b61-bd94-80318a869343",
    codigo: "1037",
    label: "Embargos Infringentes em Apelação Cível",
  },
  {
    uuid: "f28ff81b-4dd5-4464-be3e-a686114b18ba",
    codigo: "1063",
    label: "Exceção da Verdade",
  },
  {
    uuid: "d2e70cf4-bae2-415b-8bd3-488d2298da2f",
    codigo: "1672",
    label: "Exceção de Impedimento",
  },
  {
    uuid: "24f0fafb-4135-44b4-93c0-181c223bf26e",
    codigo: "1673",
    label: "Exceção de Suspeição",
  },
  {
    uuid: "8bdc0273-6545-49fb-b84e-c117fd899be5",
    codigo: "1020",
    label: "Execução em Ação Rescisória",
  },
  {
    uuid: "3fe4acb4-0b0a-451a-a5d8-5f32c08941d1",
    codigo: "1023",
    label: "Execução em Mandado de Segurança",
  },
  {
    uuid: "058694e6-d52c-41e4-b888-f425cf5a9052",
    codigo: "1024",
    label: "Execução em Medida Cautelar",
  },
  {
    uuid: "0f363287-c4c3-485c-9827-d18bf881719e",
    codigo: "1021",
    label: "Execução em Sentença Estrangeira",
  },
  {
    uuid: "f24fa8c4-c346-41a1-b07c-1a25e9ba8abe",
    codigo: "1022",
    label: "Execução em Sentença Estrangeira Contestada",
  },
  {
    uuid: "14a22ef5-9a01-4320-b597-b986fc1ede34",
    codigo: "1720",
    label: "Habeas Corpus",
  },
  {
    uuid: "057b8918-8608-43af-adc5-a9a64478d7f1",
    codigo: "15224",
    label: "Habeas Corpus Coletivo",
  },
  {
    uuid: "8177d39f-987e-474e-917d-654920b94bba",
    codigo: "1049",
    label: "Habeas Data",
  },
  {
    uuid: "0cce1516-ab81-4fc1-a8e2-7045566a4c3a",
    codigo: "1026",
    label: "Homologação de Decisão Estrangeira",
  },
  {
    uuid: "dd5f3c17-d999-42f4-a0b9-fa16d57484bf",
    codigo: "1025",
    label: "Incidente de Deslocamento de Competência",
  },
  {
    uuid: "95d2d5a4-061a-4474-bd15-6f399b1d9203",
    codigo: "1042",
    label: "Inquérito",
  },
  {
    uuid: "4d604bf2-bf71-4995-b042-4177844d6607",
    codigo: "1034",
    label: "Interpelação Judicial",
  },
  {
    uuid: "c32b06c1-84ad-4356-a649-92f50b5e5b91",
    codigo: "1674",
    label: "Intervenção Federal",
  },
  {
    uuid: "dea1c40e-e068-4d48-a57e-ff0a43a2a0b1",
    codigo: "1675",
    label: "Mandado de Injunção",
  },
  {
    uuid: "7633dcb9-4a82-4a75-aa4a-72712994dd4a",
    codigo: "1029",
    label: "Mandado de Segurança",
  },
  {
    uuid: "ce7583fd-30b5-46f5-869e-c04f25fc1475",
    codigo: "1062",
    label: "Medida Cautelar",
  },
  {
    uuid: "23fe957b-6069-4fb5-b23d-5a59b9f034cd",
    codigo: "1057",
    label: "Petição",
  },
  {
    uuid: "ad546ab6-de5d-45f2-8782-381dd59e88ae",
    codigo: "1677",
    label: "Precatório",
  },
  {
    uuid: "c48f499c-87d1-4536-a774-66963ad0705e",
    codigo: "15228",
    label: "Queixa-Crime",
  },
  {
    uuid: "3370fc79-eb87-4092-8c88-9834c05f3b56",
    codigo: "1030",
    label: "Reclamação",
  },
  {
    uuid: "bfa32fd9-45ac-452c-a67d-81709856d0f4",
    codigo: "1032",
    label: "Recurso Especial",
  },
  {
    uuid: "e2afc7b0-9cce-4822-bd98-4c73a3f723ab",
    codigo: "1031",
    label: "Recurso Ordinário",
  },
  {
    uuid: "59cb0a69-20e2-4c69-a5f4-17c623d7a6e3",
    codigo: "1722",
    label: "Recurso Ordinário em Habeas Corpus",
  },
  {
    uuid: "fd6a1213-e0a2-4376-b6f7-4fb73d93e76f",
    codigo: "1721",
    label: "Recurso Ordinário em Mandado de Segurança",
  },
  {
    uuid: "32f1694f-ca71-43b0-b5b3-36685d0b595e",
    codigo: "1064",
    label: "Remessa Necessária em Habeas Corpus",
  },
  {
    uuid: "6000142c-966b-4cb7-adc4-b24fc11c8b6e",
    codigo: "1038",
    label: "Representação",
  },
  {
    uuid: "d315f0a7-9b97-4235-afc5-294420eded31",
    codigo: "1040",
    label: "Requisição de Pequeno Valor",
  },
  {
    uuid: "af949e59-2975-45a2-b380-d6b21849e3d9",
    codigo: "1678",
    label: "Revisão Criminal",
  },
  {
    uuid: "658b580e-12aa-4347-906f-2f88c53d6d8f",
    codigo: "1027",
    label: "Sentença Estrangeira Contestada",
  },
  {
    uuid: "580cfd68-6bb2-494e-b640-cc2ae034180c",
    codigo: "1028",
    label: "Sindicância",
  },
  {
    uuid: "95523e09-18f7-4d07-8b43-26768cbcaed5",
    codigo: "1036",
    label: "Suspensão de Liminar e de Sentença",
  },
  {
    uuid: "cd948877-5c9b-4d48-9d42-465a8c908e75",
    codigo: "1679",
    label: "Suspensão de Segurança",
  },
  {
    uuid: "bec0e2c4-7699-4931-abf9-85189e692f47",
    codigo: "12118",
    label: "Suspensão em Incidente de Resolução de Demandas Repetitivas",
  },
  {
    uuid: "eb88ae81-a2a3-4e9f-b1b2-cbb0169c2b19",
    codigo: "12250",
    label: "Suspensão em IRDR",
  },
  {
    uuid: "2e6ce5a7-64b3-4556-8779-efac61e61a2d",
    codigo: "1312",
    label: "Ação Originária",
  },
  {
    uuid: "8ea6d44e-e189-4258-a778-1a8e9a181747",
    codigo: "1311",
    label: "Ação Cautelar",
  },
  {
    uuid: "c5ffc7ce-39a0-4065-9a6c-b26816f5368a",
    codigo: "1315",
    label: "Ação Cível Originária",
  },
  {
    uuid: "bb0c6e7b-564d-439f-ba94-1021ce4488f0",
    codigo: "1313",
    label: "Ação Declaratória de Constitucionalidade",
  },
  {
    uuid: "490de992-0640-459b-ae22-38c26a7492a4",
    codigo: "1314",
    label: "Ação Direta de Inconstitucionalidade",
  },
  {
    uuid: "5741f408-2b66-4cf3-b979-912c5948c927",
    codigo: "12775",
    label: "Ação Direta de Inconstitucionalidade por Omissão",
  },
  {
    uuid: "84814d25-bcf4-4dfd-ac99-f61b0fb69666",
    codigo: "1316",
    label: "Ação Originária Especial",
  },
  {
    uuid: "76682082-9028-4117-9213-991aa325f460",
    codigo: "1317",
    label: "Ação Penal",
  },
  {
    uuid: "83cc35a8-5c42-4106-a9e9-a6f445f9a010",
    codigo: "1318",
    label: "Ação Rescisória",
  },
  {
    uuid: "d55a47c4-b92b-4ffd-ac13-46523e481a39",
    codigo: "12780",
    label: "Admissão de Assistente",
  },
  {
    uuid: "616ac3b9-ccef-4d37-a0e5-45b23f224daa",
    codigo: "1320",
    label: "Agravo de Instrumento",
  },
  {
    uuid: "b2a9be7a-e123-4a63-80fe-dec000436089",
    codigo: "1319",
    label: "Agravo Interno",
  },
  {
    uuid: "ecfe8494-4d50-4f04-80af-6f1bfece44a7",
    codigo: "1321",
    label: "Agravo Regimental",
  },
  {
    uuid: "1283d399-e3ea-45ba-8cd8-0e3b23d9c426",
    codigo: "1322",
    label: "Arguição de Descumprimento de Preceito Fundamental",
  },
  {
    uuid: "39eb0b2c-f454-4cb1-863c-ee340de280ce",
    codigo: "12776",
    label: "Arguição de Impedimento",
  },
  {
    uuid: "e034ecf8-573a-49f8-9c77-c4b380f17f80",
    codigo: "1323",
    label: "Arguição de Suspeição",
  },
  {
    uuid: "2e324342-034a-48e2-9efe-8684baa89e53",
    codigo: "1324",
    label: "Carta Rogatória",
  },
  {
    uuid: "49af87d7-bb83-4858-882f-ffbef310ef0a",
    codigo: "1325",
    label: "Comunicação",
  },
  {
    uuid: "9343cc84-d6e7-4f3d-97f0-59e281795fdd",
    codigo: "1326",
    label: "Conflito de Competência",
  },
  {
    uuid: "05c8b64e-28d1-4a62-9950-a89f9f71fc06",
    codigo: "12786",
    label: "Cumprimento de Sentença",
  },
  {
    uuid: "c0b0df94-23d2-48ed-865d-1377a0cae1c5",
    codigo: "12787",
    label: "Execução contra a Fazenda Pública",
  },
  {
    uuid: "873d6277-65a3-491f-bda5-a1c21fb5d040",
    codigo: "12785",
    label: "Embargos à Execução",
  },
  {
    uuid: "b342ddbd-05ac-4823-83f1-2c004c787777",
    codigo: "1327",
    label: "Embargos de Declaração",
  },
  {
    uuid: "a54cd99a-f517-4bb7-97ad-201c7ba0e806",
    codigo: "1328",
    label: "Embargos Divergentes",
  },
  {
    uuid: "2d9b3498-7aa1-4abb-a94a-d6e137536e8a",
    codigo: "1329",
    label: "Embargos Infringentes",
  },
  {
    uuid: "47b16652-467b-45ae-83bb-2be863200b90",
    codigo: "12777",
    label: "Exceção de Incompetência",
  },
  {
    uuid: "88c818f6-b347-45f7-9c51-2af1f986b584",
    codigo: "12778",
    label: "Exceção de Litispendência",
  },
  {
    uuid: "e910b9ac-0340-41c2-af28-4b221dd46e0c",
    codigo: "12788",
    label: "Execução contra a Fazenda Pública",
  },
  {
    uuid: "3520f3ee-f82e-4e7c-ab09-4b0f5ca79db1",
    codigo: "12789",
    label: "Execução de Pena",
  },
  {
    uuid: "5ffa0b13-0f0f-47f0-9cc4-ea507da1519c",
    codigo: "12790",
    label: "Extensão",
  },
  {
    uuid: "5e1cea97-e773-4de9-b4ab-2a7816333bb1",
    codigo: "1330",
    label: "Extradição",
  },
  {
    uuid: "a8a87ba8-e55f-4a7b-a1ec-ebf497c94416",
    codigo: "1331",
    label: "Habeas Corpus",
  },
  {
    uuid: "53eb6ca4-4105-4892-9123-b48cb46ac069",
    codigo: "1332",
    label: "Habeas Data",
  },
  {
    uuid: "eda03de1-54ec-4221-9294-e6d96371cf5b",
    codigo: "12781",
    label: "Impugnação ao Valor da Causa",
  },
  {
    uuid: "47feebcc-e8e5-4719-9cd7-aefdae13ff31",
    codigo: "12791",
    label: "Incidente de Assunção de Competência",
  },
  {
    uuid: "334d5c40-0695-4a0f-8752-fee0faebb984",
    codigo: "12782",
    label: "Incidente de Falsidade",
  },
  {
    uuid: "d8a745e5-9a14-43ff-8513-f84e414e72be",
    codigo: "1333",
    label: "Inquerito",
  },
  {
    uuid: "84a8bd91-059b-4415-a0d1-cc3c73d6b284",
    codigo: "1334",
    label: "Intervenção Federal",
  },
  {
    uuid: "a8473051-05ca-40b9-be33-f46c9bf68470",
    codigo: "1335",
    label: "Mandado de Injunção",
  },
  {
    uuid: "f3204352-2e19-4679-9457-971d53d6572e",
    codigo: "1336",
    label: "Mandado de Segurança",
  },
  {
    uuid: "d67f71bb-37e3-4fee-a3b3-c610dddd0a27",
    codigo: "1337",
    label: "Medida Cautelar",
  },
  {
    uuid: "5b6bafe6-a05f-432b-8ce0-3b7be74eeeb1",
    codigo: "12783",
    label: "Oposição",
  },
  {
    uuid: "34324d9a-ad00-4ba3-a6f6-192de0139723",
    codigo: "1338",
    label: "Petição",
  },
  {
    uuid: "df94ddd9-67ec-48ee-9a3a-d473e07c0e65",
    codigo: "1339",
    label: "Prisão Preventiva para Extradição",
  },
  {
    uuid: "6c35f9a0-59e9-498b-b201-0891f785411c",
    codigo: "1340",
    label: "Processo Administrativo",
  },
  {
    uuid: "83dce4c6-8bee-433c-998a-8fc487d79dec",
    codigo: "12779",
    label: "Proposta de Súmula Vinculante",
  },
  {
    uuid: "8f417c74-790a-4055-8c74-018dc8483452",
    codigo: "1341",
    label: "Questão de Ordem",
  },
  {
    uuid: "a3969322-3423-4cf6-8bdd-5ae0ed175d35",
    codigo: "1342",
    label: "Reclamação",
  },
  {
    uuid: "debe470f-945c-4eaf-8746-06166bd136c1",
    codigo: "1343",
    label: "Recurso Criminal",
  },
  {
    uuid: "af1b372e-44b8-41e0-be0a-a33cd955ec2d",
    codigo: "1344",
    label: "Recurso em Habeas Corpus",
  },
  {
    uuid: "69894a22-d600-4fe3-ae81-c315811fce9c",
    codigo: "1345",
    label: "Recurso em Habeas Data",
  },
  {
    uuid: "1450a830-da6b-446b-a814-2cb61ecbf6fe",
    codigo: "1346",
    label: "Recurso em Mandado de Injunção",
  },
  {
    uuid: "c9d00d48-29b8-4753-8c86-b32553a5c918",
    codigo: "1347",
    label: "Recurso em Mandado de Segurança",
  },
  {
    uuid: "bf5a0f21-f9e9-4f16-986d-2f1f6d0333bf",
    codigo: "1348",
    label: "Recurso Extraordinário",
  },
  {
    uuid: "c1427193-1817-4516-9509-8b086ee3fba8",
    codigo: "11880",
    label: "Recurso Extraordinário com Agravo",
  },
  {
    uuid: "6ea91cbb-db43-4f9d-a5f8-c6f37634376d",
    codigo: "1349",
    label: "Revisão Criminal",
  },
  {
    uuid: "1b57d0bc-1882-43ec-a878-7f6c27a2a6c3",
    codigo: "1350",
    label: "Sentença Estrangeira",
  },
  {
    uuid: "54a52ac0-a6a3-4344-9e99-d459f5c9a92f",
    codigo: "1351",
    label: "Sentença Estrangeira Contestada",
  },
  {
    uuid: "31fe9cdd-0163-4eb4-ab79-2923f7c9e6a0",
    codigo: "1355",
    label: "Siglas dos Processos Extintos",
  },
  {
    uuid: "787a84ab-edc6-4e8e-88ff-5b7458f87d4f",
    codigo: "1356",
    label: "Ação Ordinária Regressiva",
  },
  {
    uuid: "4c7740bc-0e81-47c9-a7e0-2f19e5e7888a",
    codigo: "1357",
    label: "Ação Regressiva",
  },
  {
    uuid: "838ad4f2-b4aa-4fbe-99c3-78acdd02ca56",
    codigo: "1358",
    label: "Apelação Cível",
  },
  {
    uuid: "b49c925b-3f9f-4d8e-97a5-5f30d84c62ed",
    codigo: "1359",
    label: "Apelação Criminal",
  },
  {
    uuid: "2963dfce-0385-439d-9d52-9a273def4eda",
    codigo: "1360",
    label: "Arguição de Relevância",
  },
  {
    uuid: "f4c1fc05-d1a8-44f2-8bd6-c708ea385cd0",
    codigo: "1361",
    label: "Carta Testemunhável",
  },
  {
    uuid: "7591039e-8a48-4f9a-b45d-1272d7149b53",
    codigo: "1362",
    label: "Conflito de Atribuições",
  },
  {
    uuid: "4561e3f8-f9ec-4229-a5d9-83f6af1fcd44",
    codigo: "1363",
    label: "Conflito de Jurisdição",
  },
  {
    uuid: "6a60bcde-c513-428f-b0dd-3bcd61639bb1",
    codigo: "1364",
    label: "Denúncia",
  },
  {
    uuid: "20cb767c-c158-461a-8e4b-ac3d438aa52b",
    codigo: "1365",
    label: "Embargos Remetidos",
  },
  {
    uuid: "608c20a3-8a32-4fa8-985d-e183f2783583",
    codigo: "1366",
    label: "Exceção da Verdade",
  },
  {
    uuid: "2b0b5d76-f593-483b-a299-5eec2f3fa7be",
    codigo: "1367",
    label: "Exceção de Suspeição",
  },
  {
    uuid: "d305835d-1dce-4152-a22c-2ae9bb4c1f78",
    codigo: "1368",
    label: "Inquérito Administrativo",
  },
  {
    uuid: "070f0f39-528d-4838-b85f-2c6097138708",
    codigo: "1369",
    label: "Inquérito Policial",
  },
  {
    uuid: "8dc4f8b4-aef7-4b30-8b21-feb2440f6982",
    codigo: "1370",
    label: "Inquérito Policial Especial",
  },
  {
    uuid: "c82db83d-425e-49ee-9bcc-b33380faa109",
    codigo: "1371",
    label: "Interpelação",
  },
  {
    uuid: "63d4a799-fc72-4c33-9d42-4468d910b289",
    codigo: "1372",
    label: "Liquidação de Sentença",
  },
  {
    uuid: "0186c92b-73a1-4550-b425-53aa695d4a47",
    codigo: "1373",
    label: "Notificação",
  },
  {
    uuid: "ec7e9096-9275-4661-ac48-260f5bcc5e84",
    codigo: "1374",
    label: "Pedido de Avocação",
  },
  {
    uuid: "c6340369-1225-4b52-81de-333362404ba3",
    codigo: "1375",
    label: "Processo Crime",
  },
  {
    uuid: "d47ccc97-5d9d-44e1-845b-e206e598a7b5",
    codigo: "1376",
    label: "Processo Judicial",
  },
  {
    uuid: "15675552-81e3-45f6-ac76-3263cccb260c",
    codigo: "1377",
    label: "Queixa Crime",
  },
  {
    uuid: "5f0cdb0d-1f0d-4cb1-b39e-9088e7c7c008",
    codigo: "1378",
    label: "Recurso de Apreensão de Livro",
  },
  {
    uuid: "9192e79d-576b-4693-93bb-814108b8d716",
    codigo: "1379",
    label: "Recurso de Liquidação de Sentença",
  },
  {
    uuid: "4f87956c-5944-4caf-9f15-0aa4012bb3ce",
    codigo: "1380",
    label: "Recurso de Revista",
  },
  {
    uuid: "62c5a2bb-f70c-4fdd-b8bb-02d5f03ed003",
    codigo: "1381",
    label: "Representação",
  },
  {
    uuid: "2cd16a61-7bf8-4601-8d9a-f6d3b181b535",
    codigo: "1382",
    label: "Retificação de Nome Estrangeiro",
  },
  {
    uuid: "f8fb88cb-cf95-4ae4-9ca6-0e9d64ee377a",
    codigo: "1383",
    label: "Sentença Arbitral",
  },
  {
    uuid: "04cd1557-45f2-4787-bf3d-69cc7ebd5a84",
    codigo: "1384",
    label: "Suspensão de Direitos",
  },
  {
    uuid: "312b742d-d5eb-453f-ad6c-f58f6d6c023c",
    codigo: "12784",
    label: "Suspeição de Perito",
  },
  {
    uuid: "e95667a5-7243-4931-9db3-2e98eb651666",
    codigo: "1352",
    label: "Suspensão de Liminar",
  },
  {
    uuid: "bc6f073d-c697-487e-b3b2-1bde3f2a30f5",
    codigo: "1353",
    label: "Suspensão de Segurança",
  },
  {
    uuid: "1919b1ac-8824-4228-adb6-53f133e45c8c",
    codigo: "1354",
    label: "Suspensão de Tutela Provisória",
  },
  {
    uuid: "71accc49-e4a9-4789-aa4f-e8118ddbcc9b",
    codigo: "12117",
    label: "Suspensão do Incidente de Resolução de Demandas Repetitivas",
  },
  {
    uuid: "075cac5b-951a-4115-8dbc-0f0719ef4673",
    codigo: "12249",
    label: "Suspensão em IRDR",
  },
  {
    uuid: "8097948c-1bbd-43e6-a41c-1a9c4f94a816",
    codigo: "12190",
    label:
      "Suspensão Nacional do Incidente de Resolução de Demandas Repetitivas",
  },
  {
    uuid: "393ac5a8-baeb-40ca-9536-2eb4a4e1161b",
    codigo: "12191",
    label: "Tutela Provisória Antecedente",
  },
  {
    uuid: "363768ef-460d-4d8d-b190-c5226a4117fe",
    codigo: "12192",
    label: "Tutela Provisória Incidental",
  },
];

const CLASSES_JUDICIAIS: {
  uuid: string;
  criado_em: Datetime<string>["toDatabaseTimeStamp"];
  nome: string;
  codigo: string;
}[] = [];

let i = 1;

for (const classe of data) {
  const values: (typeof CLASSES_JUDICIAIS)[number] = {
    uuid: classe.uuid,
    criado_em: Datetime.create().toDatabaseTimeStamp,
    nome: classe.label,
    codigo: classe.codigo,
  };
  CLASSES_JUDICIAIS.push(values);
  i++;
}

export default CLASSES_JUDICIAIS;
