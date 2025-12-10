// server.js
require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 3000;

// Conectar ao banco
connectDB();

// Criar servidor HTTP
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
