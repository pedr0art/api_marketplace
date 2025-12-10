const request = require("supertest");
const app = require("../server");

describe("Testes de usuários", () => {
  it("Deve acessar rota raiz", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
  });
});
