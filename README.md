# 🚔 SIGOP - Sistema Integrado de Gestão Operacional Policial

SIGOP é uma API REST Fullstack em desenvolvimento, criada para gerenciamento operacional policial, com foco em autenticação, controle de acesso por cargos e gerenciamento seguro de ocorrências.

O projeto foi desenvolvido com arquitetura backend profissional, utilizando autenticação JWT, RBAC (Role Based Access Control), ownership validation e PostgreSQL.

## Tecnologias Utilizadas

* Node.js
* Express.js
* PostgreSQL
* JWT (JSON Web Token)
* BcryptJS
* Dotenv
* Nodemon

---

## Funcionalidades Implementadas

### Autenticação e Segurança

* Registro de usuários
* Login com JWT
* Middleware de autenticação
* Controle de acesso baseado em cargos (RBAC)
* Proteção de rotas
* Criptografia de senha com bcrypt
* Ownership validation (usuários só podem acessar seus próprios recursos)

### Gerenciamento de Usuários

* Criar usuários
* Listar usuários
* Atualizar usuários
* Deletar usuários
* Controle de permissões administrativas

### Gerenciamento de Ocorrências

* Criar ocorrência
* Listar ocorrências
* Buscar ocorrência por ID
* Atualizar ocorrência
* Deletar ocorrência
* Controle de acesso baseado no criador da ocorrência

---

## Regras de Acesso

### Admin

* Gerenciar usuários
* Visualizar todas ocorrências
* Editar qualquer ocorrência
* Deletar qualquer ocorrência

### Operador

* Criar ocorrências
* Visualizar apenas suas ocorrências
* Editar apenas ocorrências próprias
* Deletar apenas ocorrências próprias

---

## Estrutura do Projeto

```txt
src/
├── config/
├── controllers/
├── middlewares/
├── routes/
└── index.js
```

---

## Instalação

Clone o repositório:

```bash
git clone https://github.com/Gascarpa/SIGOP.git
```

Entre na pasta:

```bash
cd SIGOP
```

Instale as dependências:

```bash
npm install
```

Configure o arquivo `.env`:

```env
PORT=3000
DATABASE_URL=sua_url_postgres
JWT_SECRET=sua_chave_secreta
```

Execute o projeto:

```bash
npm run dev
```

---

## Roadmap V2

* Dashboard administrativo
* Sistema de status das ocorrências
* Upload de evidências
* Frontend React
* Relatórios operacionais
* Filtros avançados
* Sistema de cargos policiais completos

---

## Autor

Desenvolvido por Gabriel Scarparo.
