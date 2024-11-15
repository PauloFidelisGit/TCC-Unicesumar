import { ServicoRepositoryAbstract } from "../../../../../domain/repositories/servico.repository-abstract.js";
import { Datetime } from "../../../../../domain/vo/datetime.vo.js";
import { GetFirstParam } from "../../types/index.js";

const data = [
  {
    uuid: "f043c51c-28c7-4bef-ad54-d62b58f7a232",
    nome: "Elaboração de petições iniciais",
  },
  {
    uuid: "ada4ccb2-cc8d-4b20-bcfb-2a4b2deeb197",
    nome: "Acompanhamento de audiências",
  },
  {
    uuid: "1a50e632-634f-4d87-9e35-cc4193f735a4",
    nome: "Elaboração de recursos judiciais",
  },
  {
    uuid: "baded5ef-31d7-41bb-b4c0-d195cf75a8b9",
    nome: "Revisão e elaboração de contratos",
  },
  {
    uuid: "a2142210-d576-4ab9-aa14-129d06853aa7",
    nome: "Consultoria jurídica preventiva",
  },
  {
    uuid: "ced8d550-3180-4227-a4ec-455f19e4ad24",
    nome: "Defesa em processos de execução",
  },
  {
    uuid: "e9cf4178-8a0d-4c71-8d9b-9240e909f40c",
    nome: "Negociação e acordos extrajudiciais",
  },
  {
    uuid: "b876da60-5543-49d2-b390-9a8d8ecb2e52",
    nome: "Assessoria em processos de mediação e conciliação",
  },
  {
    uuid: "04f409b8-0a50-498c-bb2c-34a459011b55",
    nome: "Defesa em ações trabalhistas",
  },
  {
    uuid: "ecc0be48-8e70-4aed-bd33-fec96fd94813",
    nome: "Assessoria em processos de inventário e partilha",
  },
  {
    uuid: "9c39eade-6f77-4f71-a5fe-50ee327c86b2",
    nome: "Realização de due diligence legal",
  },
  {
    uuid: "964f78a3-c3d7-4c85-a614-3e08e6ffd760",
    nome: "Elaboração de pareceres jurídicos",
  },
  {
    uuid: "fe1800f0-0e8d-4259-b39e-276925d7a4f0",
    nome: "Defesa em ações de responsabilidade civil",
  },
  {
    uuid: "0ce6c5d2-ae7d-42c0-9bb9-da796689787d",
    nome: "Recuperação de créditos e cobrança extrajudicial",
  },
  {
    uuid: "a2df7abb-bb9c-4940-9a0c-09f594bc3c1f",
    nome: "Assessoria em procedimentos administrativos",
  },
  {
    uuid: "cd6598a5-5127-4377-b668-56fbfe00e04e",
    nome: "Defesa em processos criminais",
  },
  {
    uuid: "d9c4722b-8d9c-48c7-8c40-3b75f22b720d",
    nome: "Orientação para registro de marcas e patentes",
  },
  {
    uuid: "3c1f7818-cc56-416c-84ca-1c4e366ef93f",
    nome: "Requerimento de benefícios previdenciários",
  },
];

const SERVICOS: GetFirstParam<ServicoRepositoryAbstract["save"]>[] = [];

let i = 1;

for (const servico of data) {
  const values: (typeof SERVICOS)[number] = {
    uuid: servico.uuid,
    criado_em: Datetime.create().toDatabaseTimeStamp,
    nome: servico.nome,
  };
  SERVICOS.push(values);
  i++;
}

export default SERVICOS;
