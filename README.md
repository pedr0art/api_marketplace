# **Marketplace API – Node.js + Express + MongoDB**

API REST desenvolvida em Node.js para um sistema de marketplace simples, com gerenciamento de **produtos**, **usuários** e **pedidos**.
Inclui CRUD completo, testes automatizados e suporte para deploy em plataformas como **Render**, **Vercel** ou **Railway**.

---

# **Tecnologias Utilizadas**

* Node.js
* Express
* MongoDB + Mongoose
* Jest + Supertest (testes)
* Dotenv
* Nodemon (desenvolvimento)


# **Estrutura do Projeto**

marketplace-api/
│
├─ src/
│  ├─ config/
│  │   └─ database.js
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  └─ app.js
│
├─ tests/
│
├─ server.js
├─ package.json
└─ .env



# **Instalação e Configuração**

## Clonar o repositório


git clone https://github.com/SEU_USUARIO/marketplace-api.git
cd marketplace-api


## Instalar dependências

```bash
npm install
```

## Criar arquivo `.env`

Crie um arquivo `.env` na raiz com:

```
MONGO_URI=mongodb+srv://SEU_BANCO
PORT=3000
```

## Rodar em desenvolvimento

```bash
npm run dev
```

Servidor iniciará em:

```
http://localhost:3000
```

---

# 🧪 **Rodar Testes**

Os testes usam `supertest` + `jest`.

```bash
npm test
```

---

# 🌐 **Rotas da API**

A seguir, todas as rotas com exemplos de requisições (formato Thunder Client / Postman / cURL).

---

# 🛍️ **1. Produtos**

## ➕ **Criar Produto**

**POST /products**

### Corpo:

```json
{
  "name": "Notebook Gamer",
  "description": "RTX 3060, 16GB RAM",
  "price": 6500,
  "category": "Electronics",
  "stock": 10
}
```

### Resposta:

```json
{
  "_id": "...",
  "name": "Notebook Gamer",
  "price": 6500
}
```

---

## 📄 **Listar Produtos**

**GET /products**

Retorna todos os produtos.

---

## 🔍 **Buscar Produto por ID**

**GET /products/:id**

---

## ✏️ **Atualizar Produto**

**PUT /products/:id**

### Exemplo:

```json
{
  "price": 5999,
  "stock": 4
}
```

---

## 🗑️ **Excluir Produto**

**DELETE /products/:id**

---

# 👤 **2. Usuários**

## ➕ **Criar Usuário**

**POST /users**

### Corpo:

```json
{
  "name": "Pedro",
  "email": "pedro@email.com",
  "address": "Rua XPTO, 123"
}
```

---

## 📄 **Listar Usuários**

**GET /users**

---

## 🔍 **Buscar Usuário por ID**

**GET /users/:id**

---

## ✏️ **Atualizar Usuário**

**PUT /users/:id**

---

## 🗑️ **Excluir Usuário**

**DELETE /users/:id**

---

# 🛒 **3. Pedidos**

## ➕ **Criar Pedido**

**POST /orders**

### Corpo:

```json
{
  "user": "id_do_usuario",
  "items": [
    {
      "product": "id_do_produto",
      "quantity": 2
    }
  ],
  "status": "pending"
}
```

---

## 📄 **Listar Pedidos**

**GET /orders**

---

## 🔍 **Buscar Pedido por ID**

**GET /orders/:id**

---

## ✏️ **Atualizar Pedido**

**PUT /orders/:id**

### Exemplo:

```json
{
  "status": "paid"
}
```

---

## 🗑️ **Excluir Pedido**

**DELETE /orders/:id**

---

# 🗄️ **Modelos do MongoDB**

### **Product**

```js
{
  name: String,
  description: String,
  price: Number,
  category: String,
  stock: Number
}
```

### **User**

```js
{
  name: String,
  email: String,
  address: String
}
```

### **Order**

```js
{
  user: ObjectId,
  items: [
    {
      product: ObjectId,
      quantity: Number
    }
  ],
  status: String,
  total: Number
}
```


