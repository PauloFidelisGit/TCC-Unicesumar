import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { findAdmin } from "./admin/find-admin.field-config.js";
import { loginAdmin } from "./admin/login-admin.graphql-type.js";
import { countAdvogado } from "./advogado/count-advogado.field-config.js";
import { createAdvogado } from "./advogado/create-advogado.field-config.js";
import { deleteAdvogado } from "./advogado/delete-advogado.field-config.js";
import { findAdvogado } from "./advogado/find-advogado.field-config.js";
import { listAdvogado } from "./advogado/list-advogado.field-config.js";
import { loginAdvogado } from "./advogado/login-advogado.field-config.js";
import { searchAdvogado } from "./advogado/search-advogado.field-config.js";
import { updateAdvogado } from "./advogado/update-advogado.field-config.js";
import { createAnotacoesCaso } from "./caso/create-anotacoes-caso.field-config.js";
import { createCaso } from "./caso/create-caso.field-config.js";
import { createRelacionamentoCasoPessoa } from "./caso/create-relacionamento-caso-pessoa.field-config.js";
import { createRelacionamentoCasoProcesso } from "./caso/create-relacionamento-caso-processo.field-config.js";
import { deleteAnotacoesCaso } from "./caso/delete-anotacoes-caso.field-config.js";
import { deleteCaso } from "./caso/delete-caso.field-config.js";
import { deleteRelacionamentoCasoPessoa } from "./caso/delete-relacionamento-caso-pessoa.field-config.js";
import { deleteRelacionamentoCasoProcesso } from "./caso/delete-relacionamento-caso-processo.field-config.js";
import { findAnotacoesCaso } from "./caso/find-anotacoes-caso.field-config.js";
import { findCaso } from "./caso/find-caso.field-config.js";
import { findProcessosRelatedCaso } from "./caso/find-processos-related-caso.field-config.js";
import { listAnotacoesCaso } from "./caso/list-anotacoes-caso.field-config.js";
import { listCaso } from "./caso/list-caso.field-config.js";
import { searchAnotacoesCaso } from "./caso/search-anotacoes-caso.field-config.js";
import { searchCaso } from "./caso/search-caso.field-config.js";
import { updateAnotacoesCaso } from "./caso/update-anotacoes-caso.field-config.js";
import { updateCaso } from "./caso/update-caso.field-config.js";
import { createEndereco } from "./endereco/create-endereco.field-config.js";
import { deleteEndereco } from "./endereco/delete-endereco.field-config.js";
import { findEndereco } from "./endereco/find-endereco.field-config.js";
import { listEndereco } from "./endereco/list-endereco.field-config.js";
import { searchEndereco } from "./endereco/search-endereco.field-config.js";
import { updateEndereco } from "./endereco/update-endereco.field-config.js";
import { createFatura } from "./fatura/create-fatura.field-config.js";
import { deleteFatura } from "./fatura/delete-fatura.field-config.js";
import { findFatura } from "./fatura/find-fatura.field-config.js";
import { findParcelasFatura } from "./fatura/find-parcelas-fatura.field-config.js";
import { listFatura } from "./fatura/list-fatura.field-config.js";
import { searchFatura } from "./fatura/search-fatura.field-config.js";
import { updateFatura } from "./fatura/update-fatura.field-config.js";
import { createClasseJudicial } from "./judiciario/create-classe-judicial.field-config.js";
import { createOrgao } from "./judiciario/create-orgao.field-config.js";
import { createTribunal } from "./judiciario/create-tribunal.field-config.js";
import { deleteClasseJudicial } from "./judiciario/delete-classe-judicial.field-config.js";
import { deleteOrgao } from "./judiciario/delete-orgao.field-config.js";
import { deleteTribunal } from "./judiciario/delete-tribunal.field-config.js";
import { findClasseJudicial } from "./judiciario/find-classe-judicial.field-config.js";
import { findOrgao } from "./judiciario/find-orgao.field-config.js";
import { findTribunal } from "./judiciario/find-tribunal.field-config.js";
import { listClasseJudicial } from "./judiciario/list-classe-judicial.field-config.js";
import { listOrgao } from "./judiciario/list-orgao.field-config.js";
import { listTribunal } from "./judiciario/list-tribunal.field-config.js";
import { searchClasseJudicial } from "./judiciario/search-classe-judicial.field-config.js";
import { searchOrgao } from "./judiciario/search-orgao.field-config.js";
import { searchTribunal } from "./judiciario/search-tribunal.field-config.js";
import { updateClasseJudicial } from "./judiciario/update-classe-judicial.field-config.js";
import { updateOrgao } from "./judiciario/update-orgao.field-config.js";
import { updateTribunal } from "./judiciario/update-tribunal.field-config.js";
import { createMunicipio } from "./municipio/create-municipio.field-config.js";
import { findMunicipio } from "./municipio/find-municipio.field-config.js";
import { listMunicipio } from "./municipio/list-municipio.field-config.js";
import { searchMunicipio } from "./municipio/search-municipio.field-config.js";
import { updateMunicipio } from "./municipio/update-municipio.field-config.js";
import { createOrdemServico } from "./ordem-servico/create-ordem-servico.field-config.js";
import { deleteOrdemServico } from "./ordem-servico/delete-ordem-servico.field-config.js";
import { findOrdemServico } from "./ordem-servico/find-ordem-servico.field-config.js";
import { listOrdemServico } from "./ordem-servico/list-ordem-servico.field-config.js";
import { searchOrdemServico } from "./ordem-servico/search-ordem-servico.field-config.js";
import { updateOrdemServico } from "./ordem-servico/update-ordem-servico.field-config.js";
import { countPessoa } from "./pessoa/count-pessoa.field-config.js";
import { createPessoa } from "./pessoa/create-pessoa.field-config.js";
import { deletePessoa } from "./pessoa/delete-pessoa.field-config.js";
import { findPessoa } from "./pessoa/find-pessoa.field-config.js";
import { listPessoa } from "./pessoa/list-pessoa.field-config.js";
import { searchPessoa } from "./pessoa/search-pessoa.field-config.js";
import { updatePessoa } from "./pessoa/update-pessoa.field-config.js";
import { countProcesso } from "./processo/count-processo.field-config.js";
import { createAnotacoesProcesso } from "./processo/create-anotacoes-processo.field-config.js";
import { createProcesso } from "./processo/create-processo.field-config.js";
import { createRelacionamentoProcessoPessoa } from "./processo/create-relacionamento-processo-pessoa.field-config.js";
import { deleteAnotacoesProcesso } from "./processo/delete-anotacoes-processo.field-config.js";
import { deleteProcesso } from "./processo/delete-processo.field-config.js";
import { deleteRelacionamentoProcessoPessoa } from "./processo/delete-relacionamento-processo-pessoa.field-config.js";
import { findAnotacoesProcesso } from "./processo/find-anotacoes-processo.field-config.js";
import { findProcesso } from "./processo/find-processo.field-config.js";
import { listAnotacoesProcesso } from "./processo/list-anotacoes-processo.field-config.js";
import { listProcesso } from "./processo/list-processo.field-config.js";
import { searchAnotacoesProcesso } from "./processo/search-anotacoes-processo.field-config.js";
import { searchProcesso } from "./processo/search-processo.field-config.js";
import { updateAnotacoesProcesso } from "./processo/update-anotacoes-processo.field-config.js";
import { updateProcesso } from "./processo/update-processo.field-config.js";
import { createServico } from "./servico/create-servico.field-config.js";
import { findServico } from "./servico/find-servico.field-config.js";
import { listServico } from "./servico/list-servico.field-config.js";
import { searchServico } from "./servico/search-servico.field-config.js";
import { updateServico } from "./servico/update-servico.field-config.js";

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    // ADMIN
    findAdmin,
    loginAdmin,

    // ADVOGADO
    findAdvogado,
    listAdvogado,
    searchAdvogado,
    loginAdvogado,
    countAdvogado,

    // ENDERECO
    findEndereco,
    listEndereco,
    searchEndereco,

    // FATURA
    findFatura,
    listFatura,
    searchFatura,
    findParcelasFatura,

    // JUDICIARIO
    findTribunal,
    listTribunal,
    searchTribunal,
    findOrgao,
    listOrgao,
    searchOrgao,
    findClasseJudicial,
    listClasseJudicial,
    searchClasseJudicial,

    // MUNICIPIO
    findMunicipio,
    listMunicipio,
    searchMunicipio,

    // PESSOA
    findPessoa,
    listPessoa,
    searchPessoa,
    countPessoa,

    // PROCESSO
    findProcesso,
    listProcesso,
    searchProcesso,
    countProcesso,
    findAnotacoesProcesso,
    listAnotacoesProcesso,
    searchAnotacoesProcesso,

    // CASO
    findCaso,
    listCaso,
    searchCaso,
    findProcessosRelatedCaso,
    findAnotacoesCaso,
    listAnotacoesCaso,
    searchAnotacoesCaso,

    // SERVICO
    findServico,
    listServico,
    searchServico,

    // ORDEM DE SERVIÇO
    findOrdemServico,
    listOrdemServico,
    searchOrdemServico,
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // ADVOGADO
    createAdvogado,
    updateAdvogado,
    deleteAdvogado,

    // ENDERECO
    createEndereco,
    updateEndereco,
    deleteEndereco,

    // FATURA
    createFatura,
    updateFatura,
    deleteFatura,

    // JUDICIARIO
    createClasseJudicial,
    updateClasseJudicial,
    deleteClasseJudicial,
    createOrgao,
    updateOrgao,
    deleteOrgao,
    createTribunal,
    updateTribunal,
    deleteTribunal,

    // MUNICIPIO
    createMunicipio,
    updateMunicipio,

    // PESSOA
    createPessoa,
    updatePessoa,
    deletePessoa,

    // CASO
    createCaso,
    updateCaso,
    deleteCaso,
    createRelacionamentoCasoPessoa,
    deleteRelacionamentoCasoPessoa,
    createRelacionamentoCasoProcesso,
    deleteRelacionamentoCasoProcesso,
    createAnotacoesCaso,
    updateAnotacoesCaso,
    deleteAnotacoesCaso,

    // PROCESSO
    createProcesso,
    updateProcesso,
    deleteProcesso,
    createRelacionamentoProcessoPessoa,
    deleteRelacionamentoProcessoPessoa,
    createAnotacoesProcesso,
    updateAnotacoesProcesso,
    deleteAnotacoesProcesso,

    // SERVICO
    createServico,
    updateServico,

    // ORDEM DE SERVIÇO
    createOrdemServico,
    updateOrdemServico,
    deleteOrdemServico,
  },
});

export const schema = new GraphQLSchema({
  query,
  mutation,
});

// function saveSDL() {
//   const print = printSchema(schema);
//   fs.writeFileSync("./schema.graphql", print);
// }

// saveSDL();
