// src/tests/product.test.js
const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

describe("Produtos", () => {
  let token;
  let productId;
  const email = `admin${Date.now()}@email.com`;

  beforeAll(async () => {
    await request(app)
      .post("/users/register")
      .send({
        nome: "Admin",
        email,
        senha: "123456"
      });

    // 🔥 PROMOVE PARA ADMIN DIRETO NO BANCO
    await User.updateOne(
      { email },
      { $set: { role: "admin" } }
    );

    const resLogin = await request(app)
      .post("/auth/login")
      .send({
        email,
        senha: "123456"
      });

    token = resLogin.body.token;
  });


  it("Deve criar um produto", async () => {
    const res = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Produto Teste",
        descricao: "Descrição teste",
        preco: 99.9,
        estoque: 10
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");

    productId = res.body._id;
  });

  it("Deve listar produtos", async () => {
    const res = await request(app).get("/products");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
