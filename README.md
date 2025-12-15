Documentação Oficial

## Visão Geral

A **API** é uma aplicação backend desenvolvida em Node.js para gerenciamento de um marketplace, oferecendo recursos completos de autenticação, controle de usuários, produtos, pedidos e fornecedores.
O sistema utiliza **JWT para segurança**, **MongoDB como banco de dados** e segue boas práticas de arquitetura REST.

---

## Recursos Principais

* Autenticação e cadastro de usuários com JWT
* Controle de acesso por perfil (cliente, vendedor e administrador)
* Gerenciamento completo de produtos (CRUD)
* Criação e acompanhamento de pedidos
* Cálculo automático do valor total do pedido
* Cadastro e controle de fornecedores (distribuidores)
* Filtros avançados para listagem de fornecedores
* Middleware de autenticação e autorização
* Integração com MongoDB via Mongoose
* Testes automatizados
* Estrutura preparada para expansão futura

---

## Tecnologias Utilizadas

* Node.js
* Express
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* Bcrypt
* Dotenv
* Jest
* Supertest

---

## Instalação do Projeto

### 1. Instalar dependências

```bash
npm install
```

---

### 2. Configurar variáveis de ambiente

Crie o arquivo `.env` na raiz do projeto:

```env
PORT=3000
MONGO_URI=mongodb+srv://USUARIO:SENHA@CLUSTER.mongodb.net/commercehub
JWT_SECRET=chave_secreta_jwt
```

---

### 3. Configurar ambiente de testes

Crie o arquivo `.env.test`:

```env
MONGO_URI_TEST=mongodb+srv://USUARIO:SENHA@CLUSTER.mongodb.net/commercehub_test
JWT_SECRET=chave_secreta_jwt
```

---

### 4. Iniciar o servidor

```bash
npm start
```

Saída esperada:

* Servidor ativo na porta configurada
* Conexão com MongoDB estabelecida

---

### 5. Executar testes automatizados

```bash
npm test
```

Os testes utilizam um banco isolado e não afetam os dados reais.

---

## Endereço Base da API

```
http://localhost:3000
```

---

# Autenticação e Usuários

## Registrar novo usuário

**POST** `/users/register`

```json
{
  "nome": "Carlos Silva",
  "email": "carlos@email.com",
  "senha": "123456",
  "role": "cliente"
}
```

### Perfis disponíveis

* cliente
* vendedor
* admin

---

## Login

**POST** `/auth/login`

```json
{
  "email": "carlos@email.com",
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

## Uso do Token

Para acessar rotas protegidas, envie o token no header:

```http
Authorization: Bearer SEU_TOKEN_AQUI
```

---

# Produtos

## Listar produtos

**GET** `/products`

---

## Criar produto

**POST** `/products`
Requer autenticação (**vendedor ou admin**)

```json
{
  "nome": "Smartphone Pro",
  "descricao": "128GB, câmera avançada",
  "preco": 3499.90,
  "estoque": 15
}
```

---

## Atualizar produto

**PUT** `/products/:id`
Permitido apenas para o criador do produto ou administrador.

---

## Excluir produto

**DELETE** `/products/:id`
Permitido apenas para o criador do produto ou administrador.

---

# Pedidos

## Criar pedido

**POST** `/orders`
Requer autenticação.

O valor total é **calculado automaticamente no backend** com base no preço dos produtos.

```json
{
  "usuario": "ID_DO_USUARIO",
  "itens": [
    {
      "produto": "ID_DO_PRODUTO",
      "quantidade": 2
    }
  ]
}
```

---

## Listar pedidos

**GET** `/orders`

---

## Buscar pedido por ID

**GET** `/orders/:id`

---

## Atualizar pedido

**PUT** `/orders/:id`

---

## Remover pedido

**DELETE** `/orders/:id`

---

# Fornecedores (Distribuidores)

Fornecedores representam empresas responsáveis pelo fornecimento de produtos no sistema.

---

## Estrutura do Fornecedor

```json
{
  "razaoSocial": "Tech Supplies LTDA",
  "nomeFantasia": "Tech Supplies",
  "cnpj": "12345678000199",
  "email": "contato@techsupplies.com",
  "telefone": "(11) 98888-7777",
  "endereco": {
    "logradouro": "Av. Central",
    "numero": "500",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01000-000"
  },
  "responsavel": "Ana Pereira"
}
```

---

## Listar fornecedores ativos (público)

**GET** `/distributors/public`

---

## Cadastrar fornecedor

**POST** `/distributors`
Requer autenticação.

---

## Listar fornecedores com filtros

**GET** `/distributors`

Parâmetros opcionais:

* `ativo=true|false`
* `cidade=São Paulo`
* `estado=SP`

---

## Buscar fornecedor por ID

**GET** `/distributors/:id`

---

## Buscar fornecedor por CNPJ

**GET** `/distributors/cnpj/:cnpj`

---

## Atualizar fornecedor

**PUT** `/distributors/:id`
Permitido para administrador ou usuário que cadastrou.

---

## Ativar ou desativar fornecedor

**PATCH** `/distributors/:id/status`
Permitido para administrador ou usuário responsável.

---

## Remover fornecedor

**DELETE** `/distributors/:id`
Apenas administrador.

---

## Considerações Finais

* Todas as rotas protegidas exigem autenticação via JWT
* O total do pedido é sempre calculado no servidor
* Os testes utilizam banco de dados isolado
* Estrutura preparada para novas funcionalidades e escalabilidade
