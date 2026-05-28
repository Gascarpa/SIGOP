# 🚔 SIGOP - Sistema Integrado de Gestão Operacional Policial

API REST desenvolvida para gerenciamento operacional policial, com foco em autenticação segura, controle de acesso e futura gestão de ocorrências, viaturas e agentes.

Este projeto está sendo desenvolvido como parte do meu portfólio prático em desenvolvimento backend/fullstack.

---

## Tecnologias utilizadas

* Node.js
* Express.js
* PostgreSQL
* JWT (JSON Web Token)
* bcryptjs
* dotenv
* CORS

---

## Arquitetura do Projeto

O backend segue uma estrutura organizada e escalável:

```txt
src/
│
├── config/         # Configurações (Banco de dados)
├── controllers/    # Regras de negócio
├── middlewares/    # Middlewares (auth, permissões)
├── routes/         # Rotas da aplicação
│
├── app.js
└── server.js
```

---

## Funcionalidades implementadas

### Autenticação

* Cadastro de usuários
* Login com JWT
* Senha criptografada com bcrypt
* Middleware de autenticação
* Rotas protegidas
* Validação de email duplicado

---

## Endpoints disponíveis

### Registrar usuário

**POST**

```http
/auth/register
```

Exemplo Body:

```json
{
  "name": "Gabriel",
  "email": "gabriel@gmail.com",
  "password": "123456",
  "role": "admin"
}
```

---

### Login

**POST**

```http
/auth/login
```

Exemplo Body:

```json
{
  "email": "gabriel@gmail.com",
  "password": "123456"
}
```

---

### Perfil do usuário (rota protegida)

**GET**

```http
/auth/profile
```

Necessário enviar Bearer Token.

---

## ⚙️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o arquivo `.env`

Crie um arquivo `.env` na raiz:

```env
PORT=3000

DB_USER=seu_usuario
DB_HOST=localhost
DB_DATABASE=sigop
DB_PASSWORD=sua_senha
DB_PORT=5432

JWT_SECRET=sua_chave_secreta
```

### 4. Execute o projeto

```bash
npm run dev
```

Servidor iniciará em:

```txt
http://localhost:3000
```

---

## Próximas funcionalidades

* CRUD de usuários
* Controle de permissões (RBAC)
* Gestão de ocorrências policiais
* Gestão de viaturas
* Gestão de agentes
* Dashboard operacional
* Logs do sistema
* Frontend React

---

## Desenvolvedor

Desenvolvido por **Gabriel Scarparo**
