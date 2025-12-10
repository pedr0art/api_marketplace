Aqui está o README em formato **pronto para colar no VS Code**, sem comentários adicionais:

---

# API Marketplace – Documentação

## Descrição

Esta API oferece funcionalidades completas para gerenciamento de usuários, produtos e pedidos, incluindo autenticação com JWT, permissões de acesso e integração com MongoDB via Mongoose.

---

## Funcionalidades Principais

* Cadastro e login de usuários (JWT)
* CRUD completo de produtos
* Permissões (vendedor/admin podem criar, editar e deletar produtos)
* Pedidos com itens, total e status
* Relacionamento entre usuários, produtos e pedidos
* Middleware de autenticação
* Banco de dados MongoDB usando Mongoose
* Documentação clara para testes no Postman ou Insomnia

---

## Tecnologias Utilizadas

* Node.js
* Express
* MongoDB + Mongoose
* JWT (JSON Web Token)
* Bcrypt
* Dotenv

---

## Instalação

### Instalar dependências

```
npm install
```

### Criar arquivo `.env`

```
PORT=3000
MONGO_URI=mongodb+srv://pedroart:EiEkEY1GALLW0Uva@apimarketplace.xlxj2ii.mongodb.net/?appName=apimarketplace
JWT_SECRET=f1b9a8c32d9929d95c9af8bc2a71c6e23e09fe08ad62b0f87f7b9e148ab7cbd1
```

### Iniciar o servidor

```
npm start
```

O servidor deverá exibir:

* Servidor rodando na porta 3000
* MongoDB conectado

---

## Rotas da API

Base URL:

```
http://localhost:3000/
```

---

# Autenticação (AUTH)

### Registrar usuário

POST /auth/register

```json
{
  "nome": "Pedro",
  "email": "pedro@email.com",
  "senha": "123456",
  "role": "vendedor"
}
```

### Login

POST /auth/login

```json
{
  "email": "pedro@email.com",
  "senha": "123456"
}
```

Retorno:

```json
{
  "token": "jwt.token.aqui"
}
```

### Enviar token nas rotas protegidas

```
Authorization: Bearer SEU_TOKEN_AQUI
```

---

# Produtos (Products)

### Listar produtos

GET /products

### Criar produto

POST /products

```json
{
  "nome": "Notebook Gamer",
  "descricao": "RTX 4060, i7",
  "preco": 5999.90,
  "estoque": 10
}
```

### Atualizar produto

PUT /products/:id

### Remover produto

DELETE /products/:id

Regras: somente o vendedor criador ou um admin pode editar/remover.

---

# Pedidos (Orders)

### Criar pedido

POST /orders

```json
{
  "usuario": "ID_DO_USUARIO",
  "itens": [
    {
      "produto": "ID_DO_PRODUTO",
      "quantidade": 2
    }
  ],
  "total": 259.80
}
```

### Listar pedidos

GET /orders

### Buscar pedido por ID

GET /orders/:id

### Atualizar pedido

PUT /orders/:id

### Remover pedido

DELETE /orders/:id


