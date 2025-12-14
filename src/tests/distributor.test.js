const request = require("supertest");
const app = require("../app");

describe("Distribuidores", () => {
  let token;
  let distribuidorId;

  beforeAll(async () => {
    const email = `admin${Date.now()}@mail.com`;

    await request(app)
      .post("/auth/register")
      .send({
        nome: "Admin",
        email,
        senha: "123456",
        role: "admin"
      });

    const login = await request(app)
      .post("/auth/login")
      .send({ email, senha: "123456" });

    token = login.body.token;
  });

  it("Deve criar distribuidor", async () => {
    const res = await request(app)
      .post("/distributors")
      .set("Authorization", `Bearer ${token}`)
      .send({
        razaoSocial: "Distribuidora Teste",
        nomeFantasia: "Dist Teste",
        cnpj: "12345678000199",
        email: "dist@test.com",
        telefone: "11999999999",
        endereco: {
          logradouro: "Rua A",
          numero: "10",
          bairro: "Centro",
          cidade: "SP",
          estado: "SP",
          cep: "00000000"
        },
        responsavel: "Fulano"
      });

    expect(res.status).toBe(201);
    distribuidorId = res.body._id;
  });

  it("Deve listar distribuidores", async () => {
    const res = await request(app)
      .get("/distributors")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
