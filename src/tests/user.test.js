const request = require("supertest");
const app = require("../app");

describe("Usuários", () => {

  it("Deve registrar um novo usuário", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        nome: "Teste Usuário",
        email: `teste${Date.now()}@email.com`,
        senha: "123456"
      });

    expect(res.status).toBe(201);
  });

  it("Deve impedir registro duplicado", async () => {
    const email = `dup${Date.now()}@email.com`;

    await request(app)
      .post("/auth/register")
      .send({
        nome: "Usuário 1",
        email,
        senha: "123456"
      });

    const res = await request(app)
      .post("/auth/register")
      .send({
        nome: "Usuário 2",
        email,
        senha: "123456"
      });

    expect(res.status).toBe(409);
  });
});
