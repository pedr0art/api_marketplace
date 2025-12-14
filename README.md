# API Marketplace – Documentação

## Descrição

Esta API oferece funcionalidades completas para gerenciamento de usuários, produtos, pedidos e distribuidores, incluindo autenticação com JWT, controle de permissões e integração com MongoDB via Mongoose.

---

## Funcionalidades Principais

* Cadastro e login de usuários (JWT)
* CRUD completo de produtos
* Controle de permissões por papel (cliente, vendedor, admin)
* Criação e gerenciamento de pedidos
* Cadastro e controle de distribuidores
* Filtros e status de distribuidores
* Middleware de autenticação
* Banco de dados MongoDB utilizando Mongoose
* Testes automatizados com Jest e Supertest
* Documentação pronta para Postman ou Insomnia

---

## Tecnologias Utilizadas

* Node.js
* Express
* MongoDB + Mongoose
* JWT (JSON Web Token)
* Bcrypt
* Dotenv
* Jest
* Supertest

---

## Instalação

### Instalar dependências

```bash
npm install
```

---

### Criar arquivo `.env`

```env
PORT=3000
MONGO_URI=mongodb+srv://SEU_USUARIO:SUA_SENHA@SEU_CLUSTER.mongodb.net/?appName=apimarketplace
JWT_SECRET=sua_chave_secreta_jwt
```

---

### Criar arquivo `.env.test`

```env
MONGO_URI_TEST=mongodb+srv://SEU_USUARIO:SUA_SENHA@SEU_CLUSTER.mongodb.net/apimarketplace_test
JWT_SECRET=sua_chave_secreta_jwt
```

---

### Iniciar o servidor

```bash
npm start
```

Saída esperada:

* Servidor rodando na porta 3000
* MongoDB conectado

---

### Executar testes automatizados

```bash
npm test
```

Os testes utilizam:

* Banco isolado de testes
* Criação automática de usuários, produtos, pedidos e distribuidores

---

## Rotas da API

Base URL:

```
http://localhost:3000
```

---

# Autenticação (AUTH)

### Registrar usuário

**POST** `/users/register`

```json
{
  "nome": "João",
  "email": "joao@email.com",
  "senha": "123456",
  "role": "cliente"
}
```

**Roles disponíveis:**

* cliente
* vendedor
* admin

---

### Login

**POST** `/auth/login`

```json
{
  "email": "joao@email.com",
  "senha": "123456"
}
```

Resposta:

```json
{
  "token": "jwt.token.aqui"
}
```

---

### Enviar token nas rotas protegidas

```http
Authorization: Bearer SEU_TOKEN_AQUI
```

---

# Produtos (Products)

### Listar produtos

**GET** `/products`

---

### Criar produto

**POST** `/products`
Requer autenticação (**vendedor ou admin**)

```json
{
  "nome": "Notebook Gamer",
  "descricao": "RTX 4060, i7",
  "preco": 5999.90,
  "estoque": 10
}
```

---

### Atualizar produto

**PUT** `/products/:id`
Apenas o criador do produto ou admin

---

### Remover produto

**DELETE** `/products/:id`
Apenas o criador do produto ou admin

---

# Pedidos (Orders)

### Criar pedido

**POST** `/orders`
Requer autenticação

```json
{
  "items": [
    {
      "product": "ID_DO_PRODUTO",
      "quantidade": 2
    }
  ]
}
```

---

### Listar pedidos

**GET** `/orders`

---

### Buscar pedido por ID

**GET** `/orders/:id`

---

### Atualizar pedido

**PUT** `/orders/:id`

---

### Remover pedido

**DELETE** `/orders/:id`

---

# Distribuidores (Distributors)

Distribuidores representam empresas fornecedoras cadastradas no sistema.

---

## Estrutura do Distribuidor

```json
{
  "razaoSocial": "Distribuidora Exemplo LTDA",
  "nomeFantasia": "Distribuidora Exemplo",
  "cnpj": "12345678000199",
  "email": "contato@distribuidora.com",
  "telefone": "(11) 99999-9999",
  "endereco": {
    "logradouro": "Rua das Flores",
    "numero": "123",
    "complemento": "Sala 5",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01000-000"
  },
  "responsavel": "Maria Silva"
}
```

---

### Listar distribuidores públicos (ativos)

**GET** `/distributors/public`

---

### Cadastrar distribuidor

**POST** `/distributors`
Requer autenticação

```json
{
  "razaoSocial": "Distribuidora Exemplo LTDA",
  "nomeFantasia": "Distribuidora Exemplo",
  "cnpj": "12.345.678/0001-99",
  "email": "contato@distribuidora.com",
  "telefone": "(11) 99999-9999",
  "endereco": {
    "logradouro": "Rua A",
    "numero": "100",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01000-000"
  },
  "responsavel": "Maria Silva"
}
```

---

### Listar distribuidores (com filtros)

**GET** `/distributors`

Parâmetros opcionais:

* `ativo=true|false`
* `cidade=São Paulo`
* `estado=SP`

---

### Buscar distribuidor por ID

**GET** `/distributors/:id`

---

### Buscar distribuidor por CNPJ

**GET** `/distributors/cnpj/:cnpj`

---

### Atualizar distribuidor

**PUT** `/distributors/:id`
Apenas **admin** ou **quem cadastrou**

---

### Ativar / Desativar distribuidor

**PATCH** `/distributors/:id/status`
Apenas **admin** ou **quem cadastrou**

---

### Remover distribuidor

**DELETE** `/distributors/:id`
Apenas **admin**

---

## Observações Finais

* Tokens JWT são obrigatórios para rotas protegidas
* CNPJ é validado automaticamente
* Banco de testes é limpo após execução dos testes
* Projeto preparado para expansão futura

