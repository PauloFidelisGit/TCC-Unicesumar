import { mariaDbConfig } from "../../configuration/mariadb.config.js";
import { AdminMariaDB } from "./repositories/admin.mariadb.repository.js";
import { AdvogadoMariaDB } from "./repositories/advogado.mariadb.repository.js";
import { AnotacoesCasoMariaDB } from "./repositories/anotacoesCaso.mariadb.repository.js";
import { AnotacoesProcessoMariaDB } from "./repositories/anotacoesProcesso.mariadb.repository.js";
import { CasoMariaDB } from "./repositories/caso.mariadb.repository.js";
import { ClasseJudicialMariaDB } from "./repositories/classeJudicial.mariadb.repository.js";
import { EnderecoMariaDB } from "./repositories/endereco.mariadb.repository.js";
import { FaturaMariaDB } from "./repositories/fatura.mariadb.repository.js";
import { MariaDb } from "./repositories/mariaDb.js";
import { MunicipioMariaDB } from "./repositories/municipio.mariadb.repository.js";
import { OrdemServicoMariaDB } from "./repositories/ordem-servico.mariadb.repository.js";
import { OrgaoMariaDB } from "./repositories/orgao.mariadb.repository.js";
import { ParcelaFaturaMariaDB } from "./repositories/parcela-fatura.mariadb.repository.js";
import { PermissaoAdvogadoMariaDB } from "./repositories/permissao-advogado.mariadb.repository.js";
import { PessoaMariaDB } from "./repositories/pessoa.mariadb.repository.js";
import { ProcessoMariaDB } from "./repositories/processo.mariadb.repository.js";
import { RelacionamentoCasoPessoaMariaDB } from "./repositories/relacionamento-caso-pessoa.mariadb.repository.js";
import { RelacionamentoCasoProcessoMariaDB } from "./repositories/relacionamento-caso-processo.mariadb.repository.js";
import { RelacionamentoPermissaoAdvogadoMariaDB } from "./repositories/relacionamento-permissao-advogado.mariadb.repository.js";
import { RelacionamentoProcessoPessoaMariaDB } from "./repositories/relacionamento-processo-pessoa.mariadb.repository.js";
import { ServicoMariaDB } from "./repositories/servico.mariadb.repository.js";
import { TribunalMariaDB } from "./repositories/tribunal.mariadb.repository.js";

export const mariaDb = new MariaDb(mariaDbConfig);

export const adminRepository = new AdminMariaDB(mariaDb);
export const advogadoRepository = new AdvogadoMariaDB(mariaDb);
export const anotacoesCasoRepository = new AnotacoesCasoMariaDB(mariaDb);
export const anotacoesProcessoRepository = new AnotacoesProcessoMariaDB(
  mariaDb,
);
export const casoRepository = new CasoMariaDB(mariaDb);
export const classeJudicialRepository = new ClasseJudicialMariaDB(mariaDb);
export const enderecoRepository = new EnderecoMariaDB(mariaDb);
export const faturaRepository = new FaturaMariaDB(mariaDb);
export const municipioRepository = new MunicipioMariaDB(mariaDb);
export const orgaoRepository = new OrgaoMariaDB(mariaDb);
export const parcelaFaturaRepository = new ParcelaFaturaMariaDB(mariaDb);
export const pessoaRepository = new PessoaMariaDB(mariaDb);
export const processoRepository = new ProcessoMariaDB(mariaDb);
export const relacionamentoCasoPessoaRepository =
  new RelacionamentoCasoPessoaMariaDB(mariaDb);
export const relacionamentoCasoProcessoRepository =
  new RelacionamentoCasoProcessoMariaDB(mariaDb);
export const relacionamentoProcessoPessoaRepository =
  new RelacionamentoProcessoPessoaMariaDB(mariaDb);
export const tribunalRepository = new TribunalMariaDB(mariaDb);
export const servicoRepository = new ServicoMariaDB(mariaDb);
export const ordemServicoRepository = new OrdemServicoMariaDB(mariaDb);
export const permissaoAdvogadoRepository = new PermissaoAdvogadoMariaDB(
  mariaDb,
);
export const relacionamentoPermissaoAdvogadoRepository =
  new RelacionamentoPermissaoAdvogadoMariaDB(mariaDb);
