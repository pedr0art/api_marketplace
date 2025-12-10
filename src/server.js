// server.js
require('dotenv').config();
const http = require('http');
const app = require('./app.js');
const connectDB = require('./config/db.js');

const PORT = process.env.PORT || 3000;

// Seleciona banco de dados correto
const DB_URI = process.env.NODE_ENV === "test"
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI;

// Conectar ao banco correto 
connectDB(DB_URI);

let server;

// Só sobe servidor se não for ambiente de teste
if (process.env.NODE_ENV !== "test") {
    server = http.createServer(app);
    server.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT} | Ambiente: ${process.env.NODE_ENV || "dev"}`);
    });
}

module.exports = app; // exporta app para os testes
