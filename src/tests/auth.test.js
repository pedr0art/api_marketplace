const request = require("supertest");
const app = require("../app");

describe("Auth", () => {
  const email = `user${Date.now()}@teste.com`;
  const senha = "123456";

  beforeAll(async () => {
    await request(app)
      .post("/auth/register")
      .send({ nome: "User Teste", email, senha });
  });

  it("Deve logar e retornar token", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email, senha });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("Deve falhar com senha incorreta", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email, senha: "errada" });

    expect(res.status).toBe(401);
  });
});
