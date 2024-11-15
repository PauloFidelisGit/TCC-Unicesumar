import { lazy } from "react";

// DASHBOARD
export const DashboardAdvogado = lazy(
  () => import("@/advogado/dashboard/dashboard-advogado"),
);
export const IndexPage = lazy(
  () => import("@/advogado/pages/index/index.page"),
);

// CLASSE JUDICIAL
export const ClasseJudicialPage = lazy(
  () => import("@/advogado/pages/classe-judicial/classe-judicial.page"),
);
export const SearchClasseJudicialPage = lazy(
  () =>
    import(
      "@/advogado/pages/search-classe-judicial/search-classe-judicial.page"
    ),
);

// MUNICIPIO
export const MunicipioPage = lazy(
  () => import("@/advogado/pages/muncipio/muncipio.page"),
);
export const SearchMunicipioPage = lazy(
  () => import("@/advogado/pages/search-municipio/search-municipio.page"),
);

// ÓRGÃO
export const OrgaoPage = lazy(
  () => import("@/advogado/pages/orgao/orgao.page"),
);
export const OrgaosPage = lazy(
  () => import("@/advogado/pages/orgaos/orgaos.page"),
);
export const RegisterOrgaoPage = lazy(
  () => import("@/advogado/pages/register-orgao/register-orgao.page"),
);
export const SearchOrgaoPage = lazy(
  () => import("@/advogado/pages/search-orgao/search-orgao.page"),
);

// PROCESSO
export const ProcessoPage = lazy(
  () => import("@/advogado/pages/processo/processo.page"),
);
export const ProcessosPage = lazy(
  () => import("@/advogado/pages/processos/processos.page"),
);
export const IndexProcessoPage = lazy(
  () => import("@/advogado/pages/processo/index/index-processo.tab"),
);
export const RegisterProcessoPage = lazy(
  () => import("@/advogado/pages/register-processo/register-processo.page"),
);
export const SearchProcessoPage = lazy(
  () => import("@/advogado/pages/search-processo/search-processo.page"),
);

// TRIBUNAL
export const TribunaisPage = lazy(
  () => import("@/advogado/pages/tribunais/tribunais.page"),
);
export const TribunalPage = lazy(
  () => import("@/advogado/pages/tribunal/tribunal.page"),
);
export const RegisterTribunalPage = lazy(
  () => import("@/advogado/pages/register-tribunal/register-tribunal.page"),
);
export const SearchTribunalPage = lazy(
  () => import("@/advogado/pages/search-tribunal/search-tribunal.page"),
);

// PESSOA
export const PessoasPage = lazy(
  () => import("@/advogado/pages/pessoas/pessoas.page"),
);
export const PessoaPage = lazy(
  () => import("@/advogado/pages/pessoa/pessoa.page"),
);
export const SelectIndexPessoaPage = lazy(
  () => import("@/advogado/pages/pessoa/select-index-pessoa-page"),
);
export const RegisterPessoaPage = lazy(
  () => import("@/advogado/pages/register-pessoa/register-pessoa.page"),
);
export const SearchPessoaPage = lazy(
  () => import("@/advogado/pages/search-pessoa/search-pessoa.page"),
);
export const EnderecosPessoaTab = lazy(
  () => import("@/advogado/pages/pessoa/enderecos/enderecos-pessoa.tab"),
);
export const AnotacoesProcessoTab = lazy(
  () => import("@/advogado/pages/processo/anotacoes/anotacoes-processo.tab"),
);
export const PartesProcessoTab = lazy(
  () => import("@/advogado/pages/processo/partes/partes-processo.tab"),
);

// CASO
export const CasosPage = lazy(
  () => import("@/advogado/pages/casos/casos.page"),
);
export const RegisterCasoPage = lazy(
  () => import("@/advogado/pages/register-caso/register-caso.page"),
);
export const CasoPage = lazy(() => import("@/advogado/pages/caso/caso.page"));
export const IndexCasoTab = lazy(
  () => import("@/advogado/pages/caso/index/index-caso.tab"),
);
export const ProcessosCasoTab = lazy(
  () => import("@/advogado/pages/caso/processos/processos-caso.tab"),
);
export const AnotacoesCasoTab = lazy(
  () => import("@/advogado/pages/caso/anotacoes/anotacoes-caso.tab"),
);

// SERVICO
export const RegisterServicoPage = lazy(
  () => import("@/advogado/pages/register-servico/register-servico.page"),
);
export const ServicoPage = lazy(
  () => import("@/advogado/pages/servico/servico.page"),
);
export const ServicosPage = lazy(
  () => import("@/advogado/pages/servicos/servicos.page"),
);

// ORDEM DE SERVIÇO
export const RegisterOrdemServicoPage = lazy(
  () =>
    import(
      "@/advogado/pages/register-ordem-servico/register-ordem-servico.page"
    ),
);
export const OrdemServicoPage = lazy(
  () => import("@/advogado/pages/ordem-servico/ordem-servico.page"),
);
export const OrdensServicoPage = lazy(
  () => import("@/advogado/pages/ordens-servico/ordens-servico.page"),
);

// FATURA
export const CreateFaturaPage = lazy(
  () => import("@/advogado/pages/create-fatura/create-fatura.page"),
);
export const FaturasPage = lazy(
  () => import("@/advogado/pages/faturas/faturas.page"),
);
export const FaturaPage = lazy(
  () => import("@/advogado/pages/fatura/fatura.page"),
);
