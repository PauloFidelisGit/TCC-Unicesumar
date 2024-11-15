# 1. PRÉ-REQUISITOS
* Node v20 ou superior
* Docker e Docker-compose
* PNPM

# 2. BANCO DE DADOS

## 2.1. Execute o comando a seguir dentro do diretório '/database':
```bash
docker-compose up -d
```

## 2.2. Para obter o IP do container execute o comando:
```bash
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mariadb_aeonadv
```

# 3. BACKEND

## 3.1. Crie o arquivo '.env' na raiz do diretório '/backend' com o seguinte conteúdo:

BACKEND_HOST=127.0.0.1
BACKEND_PORT=4000
DATABASE_HOST=172.18.0.2
DATABASE_USER=root
DATABASE_PASSWORD=12345678
DATABASE_NAME=aeonadv
NODE_ENV=development
CRYPTO_TOKEN_SECRET=secret
ALLOW_RESET_DATABASE=true

## 3.1.1. Se necessário altere o valor de 'ENV_DEVELOPMENT.DATABASE_HOST' no arquivo './src/env.ts' para que corresponda ao IP do container do banco de dados. Veja o passo 2.2;

## 3.1.2. Observe que DATABASE_HOST deve corresponder ao IP do container do banco de dados. Veja o passo 2.2;

## 3.2. Execute o comando dentro do diretório '/backend':
```bash
pnpm install
```

## 3.3. Execute o comando dentro do diretório '/backend'. Se houver êxito será exibida a seguinte mensagem: 'Todas as tabelas da base "aeonadv" foram criadas com sucesso!';
```bash
pnpm reset-database
```

3.4. Execute o comando dentro do diretório '/backend';
```bash
pnpm build
```

## 3.6. Execute o comando dentro do diretório '/backend';
```bash
pnpm start
```

## 3.7. Se houver êxito, será exibida a seguinte mensagem:

'Servidor online: https://127.0.0.1:4000/graphql'

# 4. FRONTEND

## 4.1. Crie o arquivo '.env' na raiz do diretório '/frontend' com o seguinte conteúdo:

VITE_API_URL="https://127.0.0.1:4000/graphql"
VITE_FRONT_VERSION="1.0.0"
VITE_APP_BASE_URL="https://127.0.0.1"
VITE_LOCAL_STORAGE_CRYPTO_KEY=12345678

## 4.1.1. Observe que VITE_API_URL deve corresponder ao IP completo do backend e VITE_APP_BASE_URL ao IP base. Veja o passo 3.7;

## 4.2. Execute o comando dentro do diretório '/frontend':
```bash
pnpm install
```

## 4.3. Execute o comando dentro do diretório '/frontend':
```bash
pnpm build
```

## 4.4. Execute o comando dentro do diretório '/frontend':
```bash
pnpm preview
```

# 5. EXECUÇÃO
Pronto! Se houver êxito, será possível acessar o sistema pelo endereço http://localhost:4173/ ou outro informado no terminal.
