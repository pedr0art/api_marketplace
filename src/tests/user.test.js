// src/tests/user.test.js
const request = require("supertest");
const app = require("../app");

describe("Testes de Usuários", () => {
  let userId;

  it("Deve registrar um novo usuário", async () => {
    const res = await request(app)
      .post("/users/register")
      .send({
        nome: "Teste Usuário",
        email: `teste${Date.now()}@email.com`,
        senha: "123456"
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");

    userId = res.body.id;
  });

  it("Deve impedir registro duplicado", async () => {
    const res = await request(app)
      .post("/users/register")
      .send({
        nome: "Teste Usuário",
        email: "duplicado@email.com",
        senha: "123456"
      });

    const res2 = await request(app)
      .post("/users/register")
      .send({
        nome: "Teste Usuário 2",
        email: "duplicado@email.com",
        senha: "123456"
      });

    expect(res2.status).toBe(400);
  });
});
