# 📝 EasyList
Um projeto completo de **to-do-list**, desenvolvido com **React + TypeScript** no front-end e **Node.js + Express** no back-end.  
A aplicação conta com autenticação, gerenciamento de tarefas e integração com email para confirmação de login.

---

## 🚀 Tecnologias Utilizadas

### Front-end

- ⚛️ [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- 🔗 [React Router](https://reactrouter.com/) (navegação)
- 🔄 [React Query](https://tanstack.com/query/latest) (gerenciamento de estado servidor e cache de requisições)
- ✅ [Zod](https://zod.dev/) (validação de dados)
- 🐻 [Zustand](https://zustand-demo.pmnd.rs/) (gerenciamento de estado global)
- ⚡ [Vite](https://vitejs.dev/) (build e desenvolvimento)
- ✨ ESLint + Prettier (padronização de código)

### Back-end

- 🚀 [Express](https://expressjs.com/) + [TypeScript](https://www.typescriptlang.org/)
- ✅ [Zod](https://zod.dev/) (validação de dados)
- 🗄️ [Prisma](https://www.prisma.io/) (ORM para PostgreSQL)
- 🔑 [Argon2](https://www.npmjs.com/package/argon2) (hash de senhas)
- 🛢️ [PostgreSQL](https://www.postgresql.org/) (banco de dados principal)
- ⚡ [Redis](https://redis.io/) (rate limiting e gerenciamento de sessão)
- 🧪 [Vitest](https://vitest.dev/) (testes unitários)
- ✨ ESLint + Prettier

### Infraestrutura

- 🐳 [Docker](https://www.docker.com/) (conteinerização)
- ⚙️ [GitHub Actions](https://docs.github.com/actions) (CI/CD)
- 📧 [Resend](https://resend.com/) (envio de emails)
- ☁️ [AWS S3](https://aws.amazon.com/s3/) (armazenamento de imagens)

### Utilitários

- 📮 [Insomnia](https://insomnia.rest/) (requisições para a API)

---

## ✅ Funcionalidades

- Cadastro e login de usuário
- Envio de emails transacionais (Resend)
- Criação, listagem, edição e exclusão de tarefas
- Autenticação com JWT
- Testes unitários com Vitest
- Pipeline CI/CD automatizado com GitHub Actions

---

## 🎨 Design

As telas do projeto estão disponíveis na pasta [`designs/`](./designs).

### Principais telas

| Login                      | Register                         | Tasks Page                           |
| -------------------------- | -------------------------------- | ------------------------------------ |
| ![Login](design/login.png) | ![Register](design/register.png) | ![Tasks Page](design/tasks-page.png) |

---

## ⚙️ Rodando em desenvolvimento

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)

---

### 1. Clone o repositório

```bash
git clone https://github.com/nandev04/EasyList.git
cd EasyList
```

### 2. Suba os containers (PostgreSQL e Redis)

```bash
cd backend
cp .env.example .env
# Preencha as variáveis do .env antes de continuar
docker compose -f docker.compose.dev.yaml up -d
```

### 3. Configure e inicie o backend

```bash
cd backend
pnpm install
npx prisma migrate dev
pnpm dev
```

### 4. Configure e inicie o frontend

```bash
cd frontend
cp .env.example .env
# Preencha as variáveis do .env antes de continuar
pnpm install
pnpm dev
```

> Para visualizar as tabelas do banco, utilize o Prisma Studio: `npx prisma studio`
