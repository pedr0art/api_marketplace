// src/tests/order.test.js
const request = require("supertest");
const app = require("../app");

describe("Pedidos", () => {
  let token;
  let userId;
  let productId;

  beforeAll(async () => {
    // Criar usuário
    const resUser = await request(app)
      .post("/users/register")
      .send({
        nome: "Cliente Pedido",
        email: `cliente${Date.now()}@mail.com`,
        senha: "123456"
      });

    userId = resUser.body.id;

    // Login
    const resLogin = await request(app)
      .post("/auth/login")
      .send({
        email: `cliente${Date.now()}@mail.com`,
        senha: "123456"
      });

    token = resLogin.body.token;

    // Criar produto
    const resProd = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Produto Pedido",
        preco: 50,
        estoque: 20
      });

    productId = resProd.body._id;
  });

  it("Deve criar um pedido", async () => {
    const res = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        usuario: userId,
        itens: [
          {
            produto: productId,
            quantidade: 2
          }
        ],
        total: 100
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
  });
});
