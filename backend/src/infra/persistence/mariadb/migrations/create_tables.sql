-- --------------------------------------------------
-- TABELAS
-- --------------------------------------------------
CREATE TABLE Admin (
	id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
	uuid CHAR(36) UNIQUE NOT NULL,
	criado_em TIMESTAMP NOT NULL,
	atualizado_em TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	nome VARCHAR(255) NOT NULL,
	login VARCHAR(255) NOT NULL UNIQUE,
	senha TEXT NOT NULL
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- ------------------------------------------------
CREATE TABLE Advogado (
	id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
	uuid CHAR(36) UNIQUE NOT NULL,
	criado_em TIMESTAMP NOT NULL,
	atualizado_em TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	login VARCHAR(60) NOT NULL UNIQUE,
	senha VARCHAR(255) NOT NULL,
	telefones VARCHAR(255),
	emails VARCHAR(255),
	nome VARCHAR(255) NOT NULL,
	data_nascimento DATE,
	nacionalidade VARCHAR(255),
	estado_civil VARCHAR(255),
	cpf CHAR(11) UNIQUE,
	oab VARCHAR(255)
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- ------------------------------------------------
CREATE TABLE Endereco (
	id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
	uuid CHAR(36) UNIQUE NOT NULL,
	criado_em TIMESTAMP NOT NULL,
	atualizado_em TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	logradouro VARCHAR(255),
	numero VARCHAR(255),
	complemento VARCHAR(255),
	bairro VARCHAR(255),
	cidade VARCHAR(255),
	estado VARCHAR(255),
	cep VARCHAR(255),
	-- Relacionamentos
	advogado_uuid CHAR(36),
	pessoa_uuid CHAR(36)
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- ------------------------------------------------
CREATE TABLE Pessoa (
	id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
	uuid CHAR(36) UNIQUE NOT NULL,
	criado_em TIMESTAMP NOT NULL,
	atualizado_em TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	login VARCHAR(10) UNIQUE,
	senha VARCHAR(255),
	telefones VARCHAR(255),
	emails VARCHAR(255),
	tipo_pessoa VARCHAR(2) NOT NULL,
	nome VARCHAR(255),
	data_nascimento DATE,
	nacionalidade VARCHAR(255),
	profissao VARCHAR(255),
	estado_civil VARCHAR(255),
	cpf CHAR(11) UNIQUE,
	nome_fantasia VARCHAR(255),
	razao_social VARCHAR(255),
	cnpj CHAR(14) UNIQUE
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- ------------------------------------------------
CREATE TABLE Processo (
	id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
	uuid CHAR(36) UNIQUE NOT NULL,
	criado_em TIMESTAMP NOT NULL,
	atualizado_em TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	numero VARCHAR(255) NOT NULL UNIQUE,
	data_autuacao DATE,
	valor_causa DECIMAL(10, 2),
	segredo_justica BOOLEAN,
	tutela_urgencia BOOLEAN,
	-- Relacionamentos
	classe_judicial_uuid CHAR(36),
	criado_por_advogado_uuid CHAR(36) NOT NULL,
	orgao_uuid CHAR(36)
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- ------------------------------------------------
CREATE TABLE Caso (
	id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
	uuid CHAR(36) UNIQUE NOT NULL,
	criado_em TIMESTAMP NOT NULL,
	atualizado_em TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	titulo VARCHAR(255) NOT NULL,
	descricao TEXT,
	data_abertura TIMESTAMP NOT NULL,
	data_encerramento TIMESTAMP,
	-- Relacionamentos
	criado_por_advogado_uuid CHAR(36) NOT NULL
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- ------------------------------------------------
CREATE TABLE RelacionamentoProcessoPessoa (
	id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
	uuid CHAR(36) UNIQUE NOT NULL,
	criado_em TIMESTAMP NOT NULL,
	tipo_relacionamento VARCHAR(255) NOT NULL,
	-- Relacionamentos
	processo_uuid CHAR(36) NOT NULL,
	pessoa_uuid CHAR(36) NOT NULL
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- ------------------------------------------------
CREATE TABLE RelacionamentoCasoPessoa (
	id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
	uuid CHAR(36) UNIQUE NOT NULL,
	criado_em TIMESTAMP NOT NULL,
	-- Relacionamentos
	caso_uuid CHAR(36) NOT NULL,
	pessoa_uuid CHAR(36) NOT NULL
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- ------------------------------------------------
CREATE TABLE RelacionamentoCasoProcesso (
	id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
	uuid CHAR(36) UNIQUE NOT NULL,
	criado_em TIMESTAMP NOT NULL,
	-- Relacionamentos
	caso_uuid CHAR(36) NOT NULL,
	processo_uuid CHAR(36) NOT NULL
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- ------------------------------------------------ 
CREATE TABLE ClasseJudicial (
	id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
	uuid CHAR(36) UNIQUE NOT NULL,
	criado_em TIMESTAMP NOT NULL,
	atualizado_em TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	nome VARCHAR(255) NOT NULL,
	codigo VARCHAR(255) NOT NULL
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- ------------------------------------------------
CREATE TABLE Tribunal (
	id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
	uuid CHAR(36) UNIQUE NOT NULL,
	criado_em TIMESTAMP NOT NULL,
	atualizado_em TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	nome VARCHAR(255) NOT NULL
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- ------------------------------------------------
CREATE TABLE Orgao (
	id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
	uuid CHAR(36) UNIQUE NOT NULL,
	criado_em TIMESTAMP NOT NULL,
	atualizado_em TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	nome VARCHAR(255) NOT NULL UNIQUE,
	-- Relacionamentos
	municipio_uuid CHAR(36) NOT NULL,
	tribunal_uuid CHAR(36) NOT NULL
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- ------------------------------------------------
CREATE TABLE Municipio (
	id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
	uuid CHAR(36) UNIQUE NOT NULL,
	criado_em TIMESTAMP NOT NULL,
	atualizado_em TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	nome VARCHAR(255) NOT NULL,
	codigo VARCHAR(255) NOT NULL,
	codigo_uf VARCHAR(255) NOT NULL
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- ------------------------------------------------
CREATE TABLE AnotacoesProcesso (
	id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
	uuid CHAR(36) UNIQUE NOT NULL,
	criado_em TIMESTAMP NOT NULL,
	atualizado_em TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	titulo VARCHAR(255) NOT NULL,
	descricao TEXT,
	-- Relacionamentos
	criado_por_advogado_uuid CHAR(36) NOT NULL,
	processo_uuid CHAR(36) NOT NULL
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- ------------------------------------------------
CREATE TABLE AnotacoesCaso (
	id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
	uuid CHAR(36) UNIQUE NOT NULL,
	criado_em TIMESTAMP NOT NULL,
	atualizado_em TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	titulo VARCHAR(255) NOT NULL,
	descricao TEXT,
	-- Relacionamentos
	criado_por_advogado_uuid CHAR(36) NOT NULL,
	caso_uuid CHAR(36) NOT NULL
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- ------------------------------------------------
CREATE TABLE PermissaoAdvogado (
	id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
	uuid CHAR(36) UNIQUE NOT NULL,
	criado_em TIMESTAMP NOT NULL,
	nome VARCHAR(255) NOT NULL
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- ------------------------------------------------
CREATE TABLE RelacionamentoPermissaoAdvogado (
	id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
	uuid CHAR(36) UNIQUE NOT NULL,
	criado_em TIMESTAMP NOT NULL,
	-- Relacionamentos
	advogado_uuid CHAR(36),
	permissao_advogado_uuid CHAR(36)
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- ------------------------------------------------
CREATE TABLE Fatura (
	id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
	uuid CHAR(36) UNIQUE NOT NULL,
	criado_em TIMESTAMP NOT NULL,
	atualizado_em TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	valor_total DECIMAL(10, 2) NOT NULL,
	data_emissao TIMESTAMP NOT NULL,
	status_fatura VARCHAR(255) NOT NULL,
	observacoes VARCHAR(255),
	criado_por_advogado_uuid CHAR(36) NOT NULL
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- ------------------------------------------------
CREATE TABLE ParcelaFatura (
	id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
	uuid CHAR(36) UNIQUE NOT NULL,
	criado_em TIMESTAMP NOT NULL,
	atualizado_em TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	fatura_uuid CHAR(36) NOT NULL,
	numero INT NOT NULL,
	valor DECIMAL(10, 2) NOT NULL,
	data_vencimento DATE NOT NULL,
	data_pagamento DATE
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- ------------------------------------------------
CREATE TABLE Servico (
	id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
	uuid CHAR(36) UNIQUE NOT NULL,
	criado_em TIMESTAMP NOT NULL,
	atualizado_em TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	nome VARCHAR(255) NOT NULL
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- ------------------------------------------------
CREATE TABLE OrdemServico (
	id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
	uuid CHAR(36) UNIQUE NOT NULL,
	criado_em TIMESTAMP NOT NULL,
	atualizado_em TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	numero INT GENERATED ALWAYS AS (id) VIRTUAL,
	titulo VARCHAR(255),
	descricao VARCHAR(255),
	data_abertura TIMESTAMP NOT NULL,
	data_conclusao TIMESTAMP,
	data_cancelamento TIMESTAMP,
	prazo_conclusao TIMESTAMP,
	status VARCHAR(255),
	prioridade VARCHAR(255),
	valor_servico DECIMAL(10, 2) NOT NULL,
	-- Relacionamentos
	criado_por_advogado_uuid CHAR(36) NOT NULL,
	servico_uuid CHAR(36) NOT NULL,
	fatura_uuid CHAR(36),
	processo_uuid CHAR(36),
	caso_uuid CHAR(36)
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- ------------------------------------------------
-- RELACIONAMENTOS
-- ------------------------------------------------
ALTER TABLE Endereco
ADD CONSTRAINT fk_endereco_advogado 
FOREIGN KEY (advogado_uuid) 
REFERENCES Advogado(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_endereco_pessoa
FOREIGN KEY (pessoa_uuid) REFERENCES Pessoa(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE;
-- ------------------------------------------------
ALTER TABLE Processo
ADD CONSTRAINT fk_processo_criado_por_advogado_uuid
FOREIGN KEY (criado_por_advogado_uuid) REFERENCES Advogado(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_processo_classe_judicial
FOREIGN KEY (classe_judicial_uuid) REFERENCES ClasseJudicial(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE;
-- ------------------------------------------------
ALTER TABLE RelacionamentoProcessoPessoa
ADD CONSTRAINT fk_relacionamento_processo_pessoa  
FOREIGN KEY (pessoa_uuid) REFERENCES Pessoa(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_relacionamento_processo_processo
FOREIGN KEY (processo_uuid) REFERENCES Processo(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT uq_relacionamento_processo_pessoa UNIQUE (processo_uuid, pessoa_uuid);
-- ------------------------------------------------
ALTER TABLE RelacionamentoCasoPessoa
ADD CONSTRAINT fk_relacionamento_caso_pessoa_pessoa
FOREIGN KEY (pessoa_uuid) REFERENCES Pessoa(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_relacionamento_caso_pessoa_caso
FOREIGN KEY (caso_uuid) REFERENCES Caso(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT uq_relacionamento_caso_pessoa UNIQUE (pessoa_uuid, caso_uuid);
-- ------------------------------------------------
ALTER TABLE RelacionamentoCasoProcesso
ADD CONSTRAINT fk_relacionamento_caso_processo_processo
FOREIGN KEY (processo_uuid) REFERENCES Processo(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_relacionamento_caso_processo_caso
FOREIGN KEY (caso_uuid) REFERENCES Caso(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT uq_relacionamento_caso_processo UNIQUE (processo_uuid, caso_uuid);
-- ------------------------------------------------
ALTER TABLE Orgao
ADD CONSTRAINT fk_orgao_tribunal
FOREIGN KEY (tribunal_uuid) REFERENCES Tribunal(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_orgao_municipio
FOREIGN KEY (municipio_uuid) REFERENCES Municipio(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE;
-- ------------------------------------------------
ALTER TABLE Processo
ADD CONSTRAINT fk_processo_orgao
FOREIGN KEY (orgao_uuid) REFERENCES Orgao(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE;
-- ------------------------------------------------
ALTER TABLE AnotacoesProcesso
ADD CONSTRAINT fk_anotacoes_processo_processo
FOREIGN KEY (processo_uuid) REFERENCES Processo(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_anotacoes_processo_criado_por_advogado_uuid
FOREIGN KEY (criado_por_advogado_uuid) REFERENCES Advogado(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE;
-- ------------------------------------------------
ALTER TABLE AnotacoesCaso
ADD CONSTRAINT fk_anotacoes_caso_caso
FOREIGN KEY (caso_uuid) REFERENCES Caso(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_anotacoes_caso_criado_por_advogado_uuid
FOREIGN KEY (criado_por_advogado_uuid) REFERENCES Advogado(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE;
-- ------------------------------------------------
ALTER TABLE Caso
ADD CONSTRAINT fk_caso_criado_por_advogado_uuid
FOREIGN KEY (criado_por_advogado_uuid) 
REFERENCES Advogado(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE;
-- ------------------------------------------------
ALTER TABLE Fatura
ADD CONSTRAINT fk_fatura_criado_por_advogado_uuid
FOREIGN KEY (criado_por_advogado_uuid) 
REFERENCES Advogado(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE;
-- ------------------------------------------------
ALTER TABLE RelacionamentoPermissaoAdvogado
ADD CONSTRAINT fk_relacionamento_permissao_advogado_advogado
FOREIGN KEY (advogado_uuid) 
REFERENCES Advogado(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_relacionamento_permissao_advogado_permissao
FOREIGN KEY (permissao_advogado_uuid) 
REFERENCES PermissaoAdvogado(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE;
-- ------------------------------------------------
ALTER TABLE ParcelaFatura
ADD CONSTRAINT fk_parcela_fatura_fatura_uuid
FOREIGN KEY (fatura_uuid) 
REFERENCES Fatura(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE;
-- ------------------------------------------------
ALTER TABLE OrdemServico
ADD CONSTRAINT fk_ordem_servico_criado_por_advogado_uuid
FOREIGN KEY (criado_por_advogado_uuid) 
REFERENCES Advogado(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_ordem_servico_servico_uuid
FOREIGN KEY (servico_uuid) 
REFERENCES Servico(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_ordem_servico_fatura_uuid
FOREIGN KEY (fatura_uuid) 
REFERENCES Fatura(uuid) 
ON DELETE SET NULL ON UPDATE CASCADE,
ADD CONSTRAINT fk_ordem_servico_processo_uuid
FOREIGN KEY (processo_uuid) 
REFERENCES Processo(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_ordem_servico_caso_uuid
FOREIGN KEY (caso_uuid) 
REFERENCES Caso(uuid) 
ON DELETE CASCADE ON UPDATE CASCADE;
