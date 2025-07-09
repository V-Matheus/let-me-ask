# NLW Agents

Este projeto é composto por duas aplicações: **server** (backend) e **web** (frontend), organizadas em uma arquitetura monorepo.

## Arquitetura

- **server**: API REST construída com Fastify, Drizzle ORM e PostgreSQL.
- **web**: SPA em React com Vite, TailwindCSS e React Query.

## Principais Bibliotecas Utilizadas

### Backend (`server`)

- [Fastify](https://www.fastify.io/): Framework web rápido e eficiente.
- [Drizzle ORM](https://orm.drizzle.team/): ORM para TypeScript.
- [PostgreSQL](https://www.postgresql.org/): Banco de dados relacional.
- [Zod](https://zod.dev/): Validação de esquemas.
- [drizzle-seed](https://github.com/drizzle-team/drizzle-seed): Seed para banco de dados.

### Frontend (`web`)

- [React](https://react.dev/): Biblioteca para interfaces de usuário.
- [Vite](https://vitejs.dev/): Bundler e dev server rápido.
- [TailwindCSS](https://tailwindcss.com/): Utilitários CSS.
- [React Router DOM](https://reactrouter.com/): Roteamento SPA.
- [React Query](https://tanstack.com/query/latest): Gerenciamento de dados assíncronos.
- [shadcn/ui](https://ui.shadcn.com/): Componentes UI.
- [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge): Utilitários de classes CSS.

## Setup do Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [Docker](https://www.docker.com/) (para o banco de dados)

### 1. Suba o banco de dados

No diretório `server`:

```sh
docker compose up -d
```

### 2. Configure as variáveis de ambiente

Copie .env.exemple para .env em server/ e ajuste se necessário.

```sh
cp [.env.exemple](http://_vscodecontentref_/0) [.env](http://_vscodecontentref_/1)
```

### 3. Instale as dependências

```sh
cd server
npm install

cd ../web
npm install
```

### 4. Rode as migrations e seed do banco

No diretório server:

```sh
npm run dev
```

A API estará disponível em http://localhost:3333.

### 6. Inicie o frontend

No diretório web:

```sh
npm run dev
```

Acesse http://localhost:5173 no navegador
