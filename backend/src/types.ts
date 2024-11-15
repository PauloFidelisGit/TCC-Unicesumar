/**
 * Tipos dos resolvers exportados para uso no frontend
 */

import { TIPO_PESSOA } from "./domain/enums/TIPO_PESSOA.js";
import { DeepPartial } from "./domain/types/index.js";
import { FindAdminType } from "./graphql-interface/field-config/admin/find-admin.field-config.js";
import { LoginAdminType } from "./graphql-interface/field-config/admin/login-admin.graphql-type.js";
import { CountAdvogadoType } from "./graphql-interface/field-config/advogado/count-advogado.field-config.js";
import { CreateAdvogadoType } from "./graphql-interface/field-config/advogado/create-advogado.field-config.js";
import { DeleteAdvogadoType } from "./graphql-interface/field-config/advogado/delete-advogado.field-config.js";
import { FindAdvogadoType } from "./graphql-interface/field-config/advogado/find-advogado.field-config.js";
import { ListAdvogadoType } from "./graphql-interface/field-config/advogado/list-advogado.field-config.js";
import { LoginAdvogadoType } from "./graphql-interface/field-config/advogado/login-advogado.field-config.js";
import { SearchAdvogadoType } from "./graphql-interface/field-config/advogado/search-advogado.field-config.js";
import { UpdateAdvogadoType } from "./graphql-interface/field-config/advogado/update-advogado.field-config.js";
import { CreateAnotacoesCasoType } from "./graphql-interface/field-config/caso/create-anotacoes-caso.field-config.js";
import { CreateCasoType } from "./graphql-interface/field-config/caso/create-caso.field-config.js";
import { CreateRelacionamentoCasoPessoaType } from "./graphql-interface/field-config/caso/create-relacionamento-caso-pessoa.field-config.js";
import { CreateRelacionamentoCasoProcessoType } from "./graphql-interface/field-config/caso/create-relacionamento-caso-processo.field-config.js";
import { DeleteAnotacoesCasoType } from "./graphql-interface/field-config/caso/delete-anotacoes-caso.field-config.js";
import { DeleteCasoType } from "./graphql-interface/field-config/caso/delete-caso.field-config.js";
import { DeleteRelacionamentoCasoPessoaType } from "./graphql-interface/field-config/caso/delete-relacionamento-caso-pessoa.field-config.js";
import { DeleteRelacionamentoCasoProcessoType } from "./graphql-interface/field-config/caso/delete-relacionamento-caso-processo.field-config.js";
import { FindAnotacoesCasoType } from "./graphql-interface/field-config/caso/find-anotacoes-caso.field-config.js";
import { FindCasoType } from "./graphql-interface/field-config/caso/find-caso.field-config.js";
import { FindProcessosRelatedCasoType } from "./graphql-interface/field-config/caso/find-processos-related-caso.field-config.js";
import { ListAnotacoesCasoType } from "./graphql-interface/field-config/caso/list-anotacoes-caso.field-config.js";
import { ListCasoType } from "./graphql-interface/field-config/caso/list-caso.field-config.js";
import { SearchAnotacoesCasoType } from "./graphql-interface/field-config/caso/search-anotacoes-caso.field-config.js";
import { SearchCasoType } from "./graphql-interface/field-config/caso/search-caso.field-config.js";
import { UpdateAnotacoesCasoType } from "./graphql-interface/field-config/caso/update-anotacoes-caso.field-config.js";
import { UpdateCasoType } from "./graphql-interface/field-config/caso/update-caso.field-config.js";
import { CreateEnderecoType } from "./graphql-interface/field-config/endereco/create-endereco.field-config.js";
import { DeleteEnderecoType } from "./graphql-interface/field-config/endereco/delete-endereco.field-config.js";
import { FindEnderecoType } from "./graphql-interface/field-config/endereco/find-endereco.field-config.js";
import { ListEnderecoType } from "./graphql-interface/field-config/endereco/list-endereco.field-config.js";
import { SearchEnderecoType } from "./graphql-interface/field-config/endereco/search-endereco.field-config.js";
import { UpdateEnderecoType } from "./graphql-interface/field-config/endereco/update-endereco.field-config.js";
import { CreateFaturaType } from "./graphql-interface/field-config/fatura/create-fatura.field-config.js";
import { FindFaturaType } from "./graphql-interface/field-config/fatura/find-fatura.field-config.js";
import { ListFaturaType } from "./graphql-interface/field-config/fatura/list-fatura.field-config.js";
import { UpdateFaturaType } from "./graphql-interface/field-config/fatura/update-fatura.field-config.js";
import { CreateClasseJudicialType } from "./graphql-interface/field-config/judiciario/create-classe-judicial.field-config.js";
import { CreateOrgaoType } from "./graphql-interface/field-config/judiciario/create-orgao.field-config.js";
import { CreateTribunalType } from "./graphql-interface/field-config/judiciario/create-tribunal.field-config.js";
import { DeleteClasseJudicialType } from "./graphql-interface/field-config/judiciario/delete-classe-judicial.field-config.js";
import { DeleteOrgaoType } from "./graphql-interface/field-config/judiciario/delete-orgao.field-config.js";
import { DeleteTribunalType } from "./graphql-interface/field-config/judiciario/delete-tribunal.field-config.js";
import { FindClasseJudicialType } from "./graphql-interface/field-config/judiciario/find-classe-judicial.field-config.js";
import { FindOrgaoType } from "./graphql-interface/field-config/judiciario/find-orgao.field-config.js";
import { FindTribunalType } from "./graphql-interface/field-config/judiciario/find-tribunal.field-config.js";
import { ListClasseJudicialType } from "./graphql-interface/field-config/judiciario/list-classe-judicial.field-config.js";
import { ListOrgaoType } from "./graphql-interface/field-config/judiciario/list-orgao.field-config.js";
import { ListTribunalType } from "./graphql-interface/field-config/judiciario/list-tribunal.field-config.js";
import { SearchClasseJudicialType } from "./graphql-interface/field-config/judiciario/search-classe-judicial.field-config.js";
import { SearchOrgaoType } from "./graphql-interface/field-config/judiciario/search-orgao.field-config.js";
import { SearchTribunalType } from "./graphql-interface/field-config/judiciario/search-tribunal.field-config.js";
import { UpdateClasseJudicialType } from "./graphql-interface/field-config/judiciario/update-classe-judicial.field-config.js";
import { UpdateOrgaoType } from "./graphql-interface/field-config/judiciario/update-orgao.field-config.js";
import { UpdateTribunalType } from "./graphql-interface/field-config/judiciario/update-tribunal.field-config.js";
import { CreateMunicipioType } from "./graphql-interface/field-config/municipio/create-municipio.field-config.js";
import { FindMunicipioType } from "./graphql-interface/field-config/municipio/find-municipio.field-config.js";
import { ListMunicipioType } from "./graphql-interface/field-config/municipio/list-municipio.field-config.js";
import { SearchMunicipioType } from "./graphql-interface/field-config/municipio/search-municipio.field-config.js";
import { UpdateMunicipioType } from "./graphql-interface/field-config/municipio/update-municipio.field-config.js";
import { CreateOrdemServicoType } from "./graphql-interface/field-config/ordem-servico/create-ordem-servico.field-config.js";
import { FindOrdemServicoType } from "./graphql-interface/field-config/ordem-servico/find-ordem-servico.field-config.js";
import { ListOrdemServicoType } from "./graphql-interface/field-config/ordem-servico/list-ordem-servico.field-config.js";
import { SearchOrdemServicoType } from "./graphql-interface/field-config/ordem-servico/search-ordem-servico.field-config.js";
import { UpdateOrdemServicoType } from "./graphql-interface/field-config/ordem-servico/update-ordem-servico.field-config.js";
import { CountPessoaType } from "./graphql-interface/field-config/pessoa/count-pessoa.field-config.js";
import { CreatePessoaType } from "./graphql-interface/field-config/pessoa/create-pessoa.field-config.js";
import { DeletePessoaType } from "./graphql-interface/field-config/pessoa/delete-pessoa.field-config.js";
import { FindPessoaType } from "./graphql-interface/field-config/pessoa/find-pessoa.field-config.js";
import { ListPessoaType } from "./graphql-interface/field-config/pessoa/list-pessoa.field-config.js";
import { SearchPessoaType } from "./graphql-interface/field-config/pessoa/search-pessoa.field-config.js";
import { UpdatePessoaType } from "./graphql-interface/field-config/pessoa/update-pessoa.field-config.js";
import { CountProcessoType } from "./graphql-interface/field-config/processo/count-processo.field-config.js";
import { CreateAnotacoesProcessoType } from "./graphql-interface/field-config/processo/create-anotacoes-processo.field-config.js";
import { CreateProcessoType } from "./graphql-interface/field-config/processo/create-processo.field-config.js";
import { CreateRelacionamentoProcessoPessoaType } from "./graphql-interface/field-config/processo/create-relacionamento-processo-pessoa.field-config.js";
import { DeleteAnotacoesProcessoType } from "./graphql-interface/field-config/processo/delete-anotacoes-processo.field-config.js";
import { DeleteProcessoType } from "./graphql-interface/field-config/processo/delete-processo.field-config.js";
import { DeleteRelacionamentoProcessoPessoaType } from "./graphql-interface/field-config/processo/delete-relacionamento-processo-pessoa.field-config.js";
import { FindAnotacoesProcessoType } from "./graphql-interface/field-config/processo/find-anotacoes-processo.field-config.js";
import { FindProcessoType } from "./graphql-interface/field-config/processo/find-processo.field-config.js";
import { ListAnotacoesProcessoType } from "./graphql-interface/field-config/processo/list-anotacoes-processo.field-config.js";
import { ListProcessoType } from "./graphql-interface/field-config/processo/list-processo.field-config.js";
import { SearchAnotacoesProcessoType } from "./graphql-interface/field-config/processo/search-anotacoes-processo.field-config.js";
import { SearchProcessoType } from "./graphql-interface/field-config/processo/search-processo.field-config.js";
import { UpdateAnotacoesProcessoType } from "./graphql-interface/field-config/processo/update-anotacoes-processo.field-config.js";
import { UpdateProcessoType } from "./graphql-interface/field-config/processo/update-processo.field-config.js";
import { CreateServicoType } from "./graphql-interface/field-config/servico/create-servico.field-config.js";
import { FindServicoType } from "./graphql-interface/field-config/servico/find-servico.field-config.js";
import { ListServicoType } from "./graphql-interface/field-config/servico/list-servico.field-config.js";
import { SearchServicoType } from "./graphql-interface/field-config/servico/search-servico.field-config.js";
import { UpdateServicoType } from "./graphql-interface/field-config/servico/update-servico.field-config.js";

type ExtractResolverType<T> = T extends (...args: infer P) => Promise<infer U>
  ? {
      args: P[1];
      return: U;
    }
  : never;

type ListType<T> = {
  data: T;
  nextCursor: number | null;
  count: number | null;
};

//=========== ADMIN ===========//

type FindAdmin = ExtractResolverType<FindAdminType>;
export type FindAdminArgs = FindAdmin["args"];
export type FindAdminReturn = FindAdmin["return"];
export type PickFindAdminReturn<T extends DeepPartial<FindAdminReturn>> =
  keyof T extends keyof FindAdminReturn ? T : never;

type LoginAdmin = ExtractResolverType<LoginAdminType>;
export type LoginAdminArgs = LoginAdmin["args"];
export type LoginAdminReturn = LoginAdmin["return"];

//=========== ADVOGADO ===========//

type CreateAdvogado = ExtractResolverType<CreateAdvogadoType>;
export type CreateAdvogadoArgs = CreateAdvogado["args"];
export type CreateAdvogadoReturn = CreateAdvogado["return"];

type UpdateAdvogado = ExtractResolverType<UpdateAdvogadoType>;
export type UpdateAdvogadoArgs = UpdateAdvogado["args"];
export type UpdateAdvogadoReturn = UpdateAdvogado["return"];
export type PickUpdateAdvogadoArgsData<
  T extends DeepPartial<UpdateAdvogadoArgs["data"]>,
> = keyof T extends keyof UpdateAdvogadoArgs["data"] ? T : never;

type FindAdvogado = ExtractResolverType<FindAdvogadoType>;
export type FindAdvogadoArgs = FindAdvogado["args"];
export type FindAdvogadoReturn = FindAdvogado["return"];
export type PickFindAdvogadoReturn<T extends DeepPartial<FindAdvogadoReturn>> =
  keyof T extends keyof FindAdvogadoReturn ? T : never;

type ListAdvogado = ExtractResolverType<ListAdvogadoType>;
export type ListAdvogadoArgs = ListAdvogado["args"];
export type ListAdvogadoReturn = ListAdvogado["return"];
export type PickListAdvogadoReturnData<
  T extends DeepPartial<ListAdvogadoReturn["data"][number]>,
> = keyof T extends keyof ListAdvogadoReturn["data"][number] ? T : never;

type SearchAdvogado = ExtractResolverType<SearchAdvogadoType>;
export type SearchAdvogadoArgs = SearchAdvogado["args"];
export type SearchAdvogadoReturn = SearchAdvogado["return"];
export type PickSearchAdvogadoReturn<
  T extends DeepPartial<SearchAdvogadoReturn[number]>,
> = keyof T extends keyof SearchAdvogadoReturn[number] ? T : never;

type DeleteAdvogado = ExtractResolverType<DeleteAdvogadoType>;
export type DeleteAdvogadoArgs = DeleteAdvogado["args"];
export type DeleteAdvogadoReturn = DeleteAdvogado["return"];

type CountAdvogado = ExtractResolverType<CountAdvogadoType>;
export type CountAdvogadoArgs = CountAdvogado["args"];
export type CountAdvogadoReturn = CountAdvogado["return"];

type LoginAdvogado = ExtractResolverType<LoginAdvogadoType>;
export type LoginAdvogadoArgs = LoginAdvogado["args"];
export type LoginAdvogadoReturn = LoginAdvogado["return"];

//=========== ANOTACOES PROCESSO ===========//

type CreateAnotacoesProcesso = ExtractResolverType<CreateAnotacoesProcessoType>;
export type CreateAnotacoesProcessoArgs = CreateAnotacoesProcesso["args"];
export type CreateAnotacoesProcessoReturn = CreateAnotacoesProcesso["return"];

type UpdateAnotacoesProcesso = ExtractResolverType<UpdateAnotacoesProcessoType>;
export type UpdateAnotacoesProcessoArgs = UpdateAnotacoesProcesso["args"];
export type UpdateAnotacoesProcessoReturn = UpdateAnotacoesProcesso["return"];

type FindAnotacoesProcesso = ExtractResolverType<FindAnotacoesProcessoType>;
export type FindAnotacoesProcessoArgs = FindAnotacoesProcesso["args"];
export type FindAnotacoesProcessoReturn = FindAnotacoesProcesso["return"];
export type PickFindAnotacoesProcessoReturn<
  T extends DeepPartial<FindAnotacoesProcessoReturn>,
> = keyof T extends keyof FindAnotacoesProcessoReturn ? T : never;

type ListAnotacoesProcesso = ExtractResolverType<ListAnotacoesProcessoType>;
export type ListAnotacoesProcessoArgs = ListAnotacoesProcesso["args"];
export type ListAnotacoesProcessoReturn = ListAnotacoesProcesso["return"];
export type PickListAnotacoesProcessoReturn<
  T extends DeepPartial<ListAnotacoesProcessoReturn>,
> = keyof T extends keyof ListAnotacoesProcessoReturn ? T : never;

type SearchAnotacoesProcesso = ExtractResolverType<SearchAnotacoesProcessoType>;
export type SearchAnotacoesProcessoArgs = SearchAnotacoesProcesso["args"];
export type SearchAnotacoesProcessoReturn = SearchAnotacoesProcesso["return"];
export type PickSearchAnotacoesProcessoReturn<
  T extends DeepPartial<SearchAnotacoesProcessoReturn[number]>,
> = keyof T extends keyof SearchAnotacoesProcessoReturn[number] ? T : never;

type DeleteAnotacoesProcesso = ExtractResolverType<DeleteAnotacoesProcessoType>;
export type DeleteAnotacoesProcessoArgs = DeleteAnotacoesProcesso["args"];
export type DeleteAnotacoesProcessoReturn = DeleteAnotacoesProcesso["return"];

//=========== ANOTACOES CASO ===========//

type CreateAnotacoesCaso = ExtractResolverType<CreateAnotacoesCasoType>;
export type CreateAnotacoesCasoArgs = CreateAnotacoesCaso["args"];
export type CreateAnotacoesCasoReturn = CreateAnotacoesCaso["return"];

type UpdateAnotacoesCaso = ExtractResolverType<UpdateAnotacoesCasoType>;
export type UpdateAnotacoesCasoArgs = UpdateAnotacoesCaso["args"];
export type UpdateAnotacoesCasoReturn = UpdateAnotacoesCaso["return"];

type FindAnotacoesCaso = ExtractResolverType<FindAnotacoesCasoType>;
export type FindAnotacoesCasoArgs = FindAnotacoesCaso["args"];
export type FindAnotacoesCasoReturn = FindAnotacoesCaso["return"];
export type PickFindAnotacoesCasoReturn<
  T extends DeepPartial<FindAnotacoesCasoReturn>,
> = keyof T extends keyof FindAnotacoesCasoReturn ? T : never;

type ListAnotacoesCaso = ExtractResolverType<ListAnotacoesCasoType>;
export type ListAnotacoesCasoArgs = ListAnotacoesCaso["args"];
export type ListAnotacoesCasoReturn = ListAnotacoesCaso["return"];
export type PickListAnotacoesCasoReturn<
  T extends DeepPartial<ListAnotacoesCasoReturn>,
> = keyof T extends keyof ListAnotacoesCasoReturn ? T : never;

type SearchAnotacoesCaso = ExtractResolverType<SearchAnotacoesCasoType>;
export type SearchAnotacoesCasoArgs = SearchAnotacoesCaso["args"];
export type SearchAnotacoesCasoReturn = SearchAnotacoesCaso["return"];
export type PickSearchAnotacoesCasoReturnDTO<
  T extends DeepPartial<SearchAnotacoesCasoReturn[number]>,
> = keyof T extends keyof SearchAnotacoesCasoReturn[number] ? T : never;

type DeleteAnotacoesCaso = ExtractResolverType<DeleteAnotacoesCasoType>;
export type DeleteAnotacoesCasoArgs = DeleteAnotacoesCaso["args"];
export type DeleteAnotacoesCasoReturn = DeleteAnotacoesCaso["return"];

//=========== CASO ===========//

type CreateCaso = ExtractResolverType<CreateCasoType>;
export type CreateCasoArgs = CreateCaso["args"];
export type CreateCasoReturn = CreateCaso["return"];

type UpdateCaso = ExtractResolverType<UpdateCasoType>;
export type UpdateCasoArgs = UpdateCaso["args"];
export type UpdateCasoReturn = UpdateCaso["return"];

type FindCaso = ExtractResolverType<FindCasoType>;
export type FindCasoArgs = FindCaso["args"];
export type FindCasoReturn = FindCaso["return"];
export type PickFindCasoReturn<T extends DeepPartial<FindCasoReturn>> =
  keyof T extends keyof FindCasoReturn ? T : never;

type ListCaso = ExtractResolverType<ListCasoType>;
export type ListCasoArgs = ListCaso["args"];
export type ListCasoReturn = ListCaso["return"];
export type PickListCasoReturn<
  T extends DeepPartial<ListCasoReturn["data"][number]>,
> = keyof T extends keyof ListCasoReturn["data"][number] ? T : never;

type SearchCaso = ExtractResolverType<SearchCasoType>;
export type SearchCasoArgs = SearchCaso["args"];
export type SearchCasoReturn = SearchCaso["return"];
export type PickSearchCasoReturn<
  T extends DeepPartial<SearchCasoReturn[number]>,
> = keyof T extends keyof SearchCasoReturn[number] ? T : never;

type DeleteCaso = ExtractResolverType<DeleteCasoType>;
export type DeleteCasoArgs = DeleteCaso["args"];
export type DeleteCasoReturn = DeleteCaso["return"];

type FindProcessosRelatedCaso =
  ExtractResolverType<FindProcessosRelatedCasoType>;
export type FindProcessosRelatedCasoArgs = FindProcessosRelatedCaso["args"];
export type FindProcessosRelatedCasoReturn = FindProcessosRelatedCaso["return"];
export type PickFindProcessosRelatedCasoReturn<
  T extends DeepPartial<FindProcessosRelatedCasoReturn[number]>,
> = keyof T extends keyof FindProcessosRelatedCasoReturn[number] ? T : never;

//=========== CLASSE JUDICIAL ===========//

type CreateClasseJudicial = ExtractResolverType<CreateClasseJudicialType>;
export type CreateClasseJudicialArgs = CreateClasseJudicial["args"];
export type CreateClasseJudicialReturn = CreateClasseJudicial["return"];

type UpdateClasseJudicial = ExtractResolverType<UpdateClasseJudicialType>;
export type UpdateClasseJudicialArgs = UpdateClasseJudicial["args"];
export type UpdateClasseJudicialReturn = UpdateClasseJudicial["return"];

type FindClasseJudicial = ExtractResolverType<FindClasseJudicialType>;
export type FindClasseJudicialArgs = FindClasseJudicial["args"];
export type FindClasseJudicialReturn = FindClasseJudicial["return"];
export type PickFindClasseJudicialReturn<
  T extends DeepPartial<FindClasseJudicialReturn>,
> = keyof T extends keyof FindClasseJudicialReturn ? T : never;

type ListClasseJudicial = ExtractResolverType<ListClasseJudicialType>;
export type ListClasseJudicialArgs = ListClasseJudicial["args"];
export type ListClasseJudicialReturn = ListClasseJudicial["return"];
export type PickListClasseJudicialReturnData<
  T extends DeepPartial<ListClasseJudicialReturn["data"][number]>,
> = keyof T extends keyof ListClasseJudicialReturn["data"][number] ? T : never;

type SearchClasseJudicial = ExtractResolverType<SearchClasseJudicialType>;
export type SearchClasseJudicialArgs = SearchClasseJudicial["args"];
export type SearchClasseJudicialReturn = SearchClasseJudicial["return"];
export type PickSearchClasseJudicialReturn<
  T extends DeepPartial<SearchClasseJudicialReturn[number]>,
> = keyof T extends keyof SearchClasseJudicialReturn[number] ? T : never;

type DeleteClasseJudicial = ExtractResolverType<DeleteClasseJudicialType>;
export type DeleteClasseJudicialArgs = DeleteClasseJudicial["args"];
export type DeleteClasseJudicialReturn = DeleteClasseJudicial["return"];

//=========== ENDERECO ===========//

type CreateEndereco = ExtractResolverType<CreateEnderecoType>;
export type CreateEnderecoArgs = CreateEndereco["args"];
export type CreateEnderecoReturn = CreateEndereco["return"];

type UpdateEndereco = ExtractResolverType<UpdateEnderecoType>;
export type UpdateEnderecoArgs = UpdateEndereco["args"];
export type UpdateEnderecoReturn = UpdateEndereco["return"];

type FindEndereco = ExtractResolverType<FindEnderecoType>;
export type FindEnderecoArgs = FindEndereco["args"];
export type FindEnderecoReturn = FindEndereco["return"];
export type PickFindEnderecoReturn<T extends DeepPartial<FindEnderecoReturn>> =
  keyof T extends keyof FindEnderecoReturn ? T : never;

type ListEndereco = ExtractResolverType<ListEnderecoType>;
export type ListEnderecoArgs = ListEndereco["args"];
export type ListEnderecoReturn = ListEndereco["return"];
export type PickListEnderecoReturn<T extends DeepPartial<ListEnderecoReturn>> =
  keyof T extends keyof ListEnderecoReturn ? T : never;

type SearchEndereco = ExtractResolverType<SearchEnderecoType>;
export type SearchEnderecoArgs = SearchEndereco["args"];
export type SearchEnderecoReturn = SearchEndereco["return"];
export type PickSearchEnderecoReturnData<
  T extends DeepPartial<SearchEnderecoReturn[number]>,
> = keyof T extends keyof SearchEnderecoReturn[number] ? T : never;

type DeleteEndereco = ExtractResolverType<DeleteEnderecoType>;
export type DeleteEnderecoArgs = DeleteEndereco["args"];
export type DeleteEnderecoReturn = DeleteEndereco["return"];

//=========== MUNICIPIO ===========//

type CreateMunicipio = ExtractResolverType<CreateMunicipioType>;
export type CreateMunicipioArgs = CreateMunicipio["args"];
export type CreateMunicipioReturn = CreateMunicipio["return"];

type UpdateMunicipio = ExtractResolverType<UpdateMunicipioType>;
export type UpdateMunicipioArgs = UpdateMunicipio["args"];
export type UpdateMunicipioReturn = UpdateMunicipio["return"];

type FindMunicipio = ExtractResolverType<FindMunicipioType>;
export type FindMunicipioArgs = FindMunicipio["args"];
export type FindMunicipioReturn = FindMunicipio["return"];
export type PickFindMunicipioReturn<
  T extends DeepPartial<FindMunicipioReturn>,
> = keyof T extends keyof FindMunicipioReturn ? T : never;

type ListMunicipio = ExtractResolverType<ListMunicipioType>;
export type ListMunicipioArgs = ListMunicipio["args"];
export type ListMunicipioReturn = ListMunicipio["return"];
export type PickListMunicipioReturn<
  T extends DeepPartial<ListMunicipioReturn["data"][number]>,
> = keyof T extends keyof ListMunicipioReturn["data"][number] ? T : never;

type SearchMunicipio = ExtractResolverType<SearchMunicipioType>;
export type SearchMunicipioArgs = SearchMunicipio["args"];
export type SearchMunicipioReturn = SearchMunicipio["return"];
export type PickSearchMunicipioReturn<
  T extends DeepPartial<SearchMunicipioReturn[number]>,
> = keyof T extends keyof SearchMunicipioReturn[number] ? T : never;

//=========== ORGAO ===========//

type CreateOrgao = ExtractResolverType<CreateOrgaoType>;
export type CreateOrgaoArgs = CreateOrgao["args"];
export type CreateOrgaoReturn = CreateOrgao["return"];

type UpdateOrgao = ExtractResolverType<UpdateOrgaoType>;
export type UpdateOrgaoArgs = UpdateOrgao["args"];
export type UpdateOrgaoReturn = UpdateOrgao["return"];

type FindOrgao = ExtractResolverType<FindOrgaoType>;
export type FindOrgaoArgs = FindOrgao["args"];
export type FindOrgaoReturn = FindOrgao["return"];
export type PickFindOrgaoReturn<T extends DeepPartial<FindOrgaoReturn>> =
  keyof T extends keyof FindOrgaoReturn ? T : never;

type ListOrgao = ExtractResolverType<ListOrgaoType>;
export type ListOrgaoArgs = ListOrgao["args"];
export type ListOrgaoReturn = ListOrgao["return"];
export type PickListOrgaoReturn<
  T extends DeepPartial<ListOrgaoReturn["data"][number]>,
> = keyof T extends keyof ListOrgaoReturn["data"][number] ? T : never;

type SearchOrgao = ExtractResolverType<SearchOrgaoType>;
export type SearchOrgaoArgs = SearchOrgao["args"];
export type SearchOrgaoReturn = SearchOrgao["return"];
export type PickSearchOrgaoReturn<
  T extends DeepPartial<SearchOrgaoReturn[number]>,
> = keyof T extends keyof SearchOrgaoReturn[number] ? T : never;

type DeleteOrgao = ExtractResolverType<DeleteOrgaoType>;
export type DeleteOrgaoArgs = DeleteOrgao["args"];
export type DeleteOrgaoReturn = DeleteOrgao["return"];

//=========== PESSOA ===========//

type CreatePessoa = ExtractResolverType<CreatePessoaType>;
export type CreatePessoaArgs = CreatePessoa["args"];
export type CreatePessoaPfArgs = Extract<
  CreatePessoaArgs,
  { tipo_pessoa: TIPO_PESSOA.PF }
>;
export type CreatePessoaPjArgs = Extract<
  CreatePessoaArgs,
  { tipo_pessoa: TIPO_PESSOA.PJ }
>;
export type CreatePessoaReturn = CreatePessoa["return"];

type UpdatePessoa = ExtractResolverType<UpdatePessoaType>;
export type UpdatePessoaArgs = UpdatePessoa["args"];
export type UpdatePessoaReturn = UpdatePessoa["return"];

type FindPessoa = ExtractResolverType<FindPessoaType>;
export type FindPessoaArgs = FindPessoa["args"];
export type FindPessoaReturn = FindPessoa["return"];
export type PickFindPessoaReturn<T extends DeepPartial<FindPessoaReturn>> =
  keyof T extends keyof FindPessoaReturn ? T : never;

type ListPessoa = ExtractResolverType<ListPessoaType>;
export type ListPessoaArgs = ListPessoa["args"];
export type ListPessoaReturn = ListPessoa["return"];
export type PickListPessoaReturn<
  T extends DeepPartial<ListPessoaReturn["data"][number]>,
> = keyof T extends keyof ListPessoaReturn["data"][number] ? T : never;

type SearchPessoa = ExtractResolverType<SearchPessoaType>;
export type SearchPessoaArgs = SearchPessoa["args"];
export type SearchPessoaReturn = SearchPessoa["return"];
export type PickSearchPessoaReturn<
  T extends DeepPartial<SearchPessoaReturn[number]>,
> = keyof T extends keyof SearchPessoaReturn[number] ? T : never;

type DeletePessoa = ExtractResolverType<DeletePessoaType>;
export type DeletePessoaArgs = DeletePessoa["args"];
export type DeletePessoaReturn = DeletePessoa["return"];

type CountPessoa = ExtractResolverType<CountPessoaType>;
export type CountPessoaArgs = CountPessoa["args"];
export type CountPessoaReturn = CountPessoa["return"];

//=========== PROCESSO ===========//

type CreateProcesso = ExtractResolverType<CreateProcessoType>;
export type CreateProcessoArgs = CreateProcesso["args"];
export type CreateProcessoReturn = CreateProcesso["return"];

type UpdateProcesso = ExtractResolverType<UpdateProcessoType>;
export type UpdateProcessoArgs = UpdateProcesso["args"];
export type UpdateProcessoReturn = UpdateProcesso["return"];

type FindProcesso = ExtractResolverType<FindProcessoType>;
export type FindProcessoArgs = FindProcesso["args"];
export type FindProcessoReturn = FindProcesso["return"];
export type PickFindProcessoReturn<T extends DeepPartial<FindProcessoReturn>> =
  keyof T extends keyof FindProcessoReturn ? T : never;

type ListProcesso = ExtractResolverType<ListProcessoType>;
export type ListProcessoArgs = ListProcesso["args"];
export type ListProcessoReturn = ListProcesso["return"];
export type PickListProcessoReturn<
  T extends DeepPartial<ListProcessoReturn["data"][number]>,
> = keyof T extends keyof ListProcessoReturn["data"][number] ? T : never;

type SearchProcesso = ExtractResolverType<SearchProcessoType>;
export type SearchProcessoArgs = SearchProcesso["args"];
export type SearchProcessoReturn = SearchProcesso["return"];
export type PickSearchProcessoReturn<
  T extends DeepPartial<SearchProcessoReturn[number]>,
> = keyof T extends keyof SearchProcessoReturn[number] ? T : never;

type DeleteProcesso = ExtractResolverType<DeleteProcessoType>;
export type DeleteProcessoArgs = DeleteProcesso["args"];
export type DeleteProcessoReturn = DeleteProcesso["return"];

type CountProcesso = ExtractResolverType<CountProcessoType>;
export type CountProcessoArgs = CountProcesso["args"];
export type CountProcessoReturn = CountProcesso["return"];

//=========== RELACIONAMENTO CASO PESSOA ===========//

type CreateRelacionamentoCasoPessoa =
  ExtractResolverType<CreateRelacionamentoCasoPessoaType>;
export type CreateRelacionamentoCasoPessoaArgs =
  CreateRelacionamentoCasoPessoa["args"];
export type CreateRelacionamentoCasoPessoaReturn =
  CreateRelacionamentoCasoPessoa["return"];

type DeleteRelacionamentoCasoPessoa =
  ExtractResolverType<DeleteRelacionamentoCasoPessoaType>;
export type DeleteRelacionamentoCasoArgs =
  DeleteRelacionamentoCasoPessoa["args"];
export type DeleteRelacionamentoCasoReturn =
  DeleteRelacionamentoCasoPessoa["return"];

//=========== RELACIONAMENTO PROCESSO PESSOA ===========//

type CreateRelacionamentoCasoProcesso =
  ExtractResolverType<CreateRelacionamentoCasoProcessoType>;
export type CreateRelacionamentoCasoProcessoArgs =
  CreateRelacionamentoCasoProcesso["args"];
export type CreateRelacionamentoCasoProcessoReturn =
  CreateRelacionamentoCasoProcesso["return"];

type CreateRelacionamentoProcessoPessoa =
  ExtractResolverType<CreateRelacionamentoProcessoPessoaType>;
export type CreateRelacionamentoProcessoPessoaArgs =
  CreateRelacionamentoProcessoPessoa["args"];
export type CreateRelacionamentoProcessoReturn =
  CreateRelacionamentoProcessoPessoa["return"];

type DeleteRelacionamentoCasoProcesso =
  ExtractResolverType<DeleteRelacionamentoCasoProcessoType>;
export type DeleteRelacionamentoCasoProcessoArgs =
  DeleteRelacionamentoCasoProcesso["args"];
export type DeleteRelacionamentoCasoProcessoReturn =
  DeleteRelacionamentoCasoProcesso["return"];

type DeleteRelacionamentoProcessoPessoa =
  ExtractResolverType<DeleteRelacionamentoProcessoPessoaType>;
export type DeleteRelacionamentoProcessoArgs =
  DeleteRelacionamentoProcessoPessoa["args"];
export type DeleteRelacionamentoProcessoReturn =
  DeleteRelacionamentoProcessoPessoa["return"];

//=========== TRIBUNAL ===========//

type CreateTribunal = ExtractResolverType<CreateTribunalType>;
export type CreateTribunalArgs = CreateTribunal["args"];
export type CreateTribunalReturn = CreateTribunal["return"];

type UpdateTribunal = ExtractResolverType<UpdateTribunalType>;
export type UpdateTribunalArgs = UpdateTribunal["args"];
export type UpdateTribunalReturn = UpdateTribunal["return"];

type FindTribunal = ExtractResolverType<FindTribunalType>;
export type FindTribunalArgs = FindTribunal["args"];
export type FindTribunalReturn = FindTribunal["return"];
export type PickFindTribunalReturn<T extends DeepPartial<FindTribunalReturn>> =
  keyof T extends keyof FindTribunalReturn ? T : never;

type ListTribunal = ExtractResolverType<ListTribunalType>;
export type ListTribunalArgs = ListTribunal["args"];
export type ListTribunalReturn = ListTribunal["return"];
export type PickListTribunalReturn<
  T extends DeepPartial<ListTribunalReturn["data"][number]>,
> = keyof T extends keyof ListTribunalReturn["data"][number] ? T : never;

type SearchTribunal = ExtractResolverType<SearchTribunalType>;
export type SearchTribunalArgs = SearchTribunal["args"];
export type SearchTribunalReturn = SearchTribunal["return"];
export type PickSearchTribunalReturn<
  T extends DeepPartial<SearchTribunalReturn[number]>,
> = keyof T extends keyof SearchTribunalReturn[number] ? T : never;

type DeleteTribunal = ExtractResolverType<DeleteTribunalType>;
export type DeleteTribunalArgs = DeleteTribunal["args"];
export type DeleteTribunalReturn = DeleteTribunal["return"];

//=========== SERVICO ===========//
type CreateServico = ExtractResolverType<CreateServicoType>;
export type CreateServicoArgs = CreateServico["args"];
export type CreateServicoReturn = CreateServico["return"];

type UpdateServico = ExtractResolverType<UpdateServicoType>;
export type UpdateServicoArgs = UpdateServico["args"];
export type UpdateServicoReturn = UpdateServico["return"];

type FindServico = ExtractResolverType<FindServicoType>;
export type FindServicoArgs = FindServico["args"];
export type FindServicoReturn = FindServico["return"];
export type PickFindServicoReturn<T extends DeepPartial<FindServicoReturn>> =
  keyof T extends keyof FindServicoReturn ? T : never;

type ListServico = ExtractResolverType<ListServicoType>;
export type ListServicoArgs = ListServico["args"];
export type ListServicoReturn = ListServico["return"];
export type PickListServicoReturn<
  T extends DeepPartial<ListServicoReturn["data"][number]>,
> = ListType<
  (keyof T extends keyof ListServicoReturn["data"][number] ? T : never)[]
>;

type SearchServico = ExtractResolverType<SearchServicoType>;
export type SearchServicoArgs = SearchServico["args"];
export type SearchServicoReturn = SearchServico["return"];
export type PickSearchServicoReturn<
  T extends DeepPartial<SearchServicoReturn[number]>,
> = keyof T extends keyof SearchServicoReturn[number] ? T : never;

//=========== ORDEM DE SERVICO ===========//
type CreateOrdemServico = ExtractResolverType<CreateOrdemServicoType>;
export type CreateOrdemServicoArgs = CreateOrdemServico["args"];
export type CreateOrdemServicoReturn = CreateOrdemServico["return"];

type UpdateOrdemServico = ExtractResolverType<UpdateOrdemServicoType>;
export type UpdateOrdemServicoArgs = UpdateOrdemServico["args"];
export type UpdateOrdemServicoReturn = UpdateOrdemServico["return"];

type FindOrdemServico = ExtractResolverType<FindOrdemServicoType>;
export type FindOrdemServicoArgs = FindOrdemServico["args"];
export type FindOrdemServicoReturn = FindOrdemServico["return"];
export type PickFindOrdemServicoReturn<
  T extends DeepPartial<FindOrdemServicoReturn>,
> = keyof T extends keyof FindOrdemServicoReturn ? T : never;

type ListOrdemServico = ExtractResolverType<ListOrdemServicoType>;
export type ListOrdemServicoArgs = ListOrdemServico["args"];
export type ListOrdemServicoReturn = ListOrdemServico["return"];
export type PickListOrdemServicoReturn<
  T extends DeepPartial<ListOrdemServicoReturn["data"][number]>,
> = ListType<
  (keyof T extends keyof ListOrdemServicoReturn["data"][number] ? T : never)[]
>;

type SearchOrdemServico = ExtractResolverType<SearchOrdemServicoType>;
export type SearchOrdemServicoArgs = SearchOrdemServico["args"];
export type SearchOrdemServicoReturn = SearchOrdemServico["return"];
export type PickSearchOrdemServicoReturn<
  T extends DeepPartial<SearchOrdemServicoReturn[number]>,
> = keyof T extends keyof SearchOrdemServicoReturn[number] ? T : never;

//=========== FATURA ===========//
type CreateFatura = ExtractResolverType<CreateFaturaType>;
export type CreateFaturaArgs = CreateFatura["args"];
export type CreateFaturaReturn = CreateFatura["return"];

type UpdateFatura = ExtractResolverType<UpdateFaturaType>;
export type UpdateFaturaArgs = UpdateFatura["args"];
export type UpdateFaturaReturn = UpdateFatura["return"];
export type PickUpdateFaturaArgs<T extends DeepPartial<UpdateFaturaArgs>> =
  keyof T extends keyof UpdateFaturaArgs ? T : never;

type ListFatura = ExtractResolverType<ListFaturaType>;
export type ListFaturaArgs = ListFatura["args"];
export type ListFaturaReturn = ListFatura["return"];
export type PickListFaturaReturn<
  T extends DeepPartial<ListFaturaReturn["data"][number]>,
> = ListType<
  (keyof T extends keyof ListFaturaReturn["data"][number] ? T : never)[]
>;

type FindFatura = ExtractResolverType<FindFaturaType>;
export type FindFaturaArgs = FindFatura["args"];
export type FindFaturaReturn = FindFatura["return"];
export type PickFindFaturaReturn<T extends DeepPartial<FindFaturaReturn>> =
  keyof T extends keyof FindFaturaReturn ? T : never;
