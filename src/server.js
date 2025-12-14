require("dotenv").config();
const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  connectDB(process.env.MONGO_URI);

  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
