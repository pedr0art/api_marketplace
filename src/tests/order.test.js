// src/tests/order.test.js
const request = require("supertest");
const app = require("../app");

describe("Pedidos", () => {
  let tokenCliente;
  let tokenAdmin;
  let productId;

  const emailCliente = `cliente${Date.now()}@mail.com`;
  const emailAdmin = `admin${Date.now()}@mail.com`;

  beforeAll(async () => {
    // 🔹 Criar cliente
    await request(app).post("/users/register").send({
      nome: "Cliente Pedido",
      email: emailCliente,
      senha: "123456"
    });

    const resLoginCliente = await request(app)
      .post("/auth/login")
      .send({
        email: emailCliente,
        senha: "123456"
      });

    tokenCliente = resLoginCliente.body.token;

    // 🔹 Criar admin
    await request(app).post("/users/register").send({
      nome: "Admin Pedido",
      email: emailAdmin,
      senha: "123456",
      role: "admin"
    });

    const resLoginAdmin = await request(app)
      .post("/auth/login")
      .send({
        email: emailAdmin,
        senha: "123456"
      });

    tokenAdmin = resLoginAdmin.body.token;

    // 🔹 Criar produto (COM ADMIN)
    const resProd = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${tokenAdmin}`)
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
      .set("Authorization", `Bearer ${tokenCliente}`)
      .send({
        itens: [
          {
            produto: productId,
            quantidade: 2
          }
        ]
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
  });

});
