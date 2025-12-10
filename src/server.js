// server.js
require('dotenv').config();
const http = require('http');
const app = require('./app.js');
const connectDB = require('./config/db.js');

const PORT = process.env.PORT || 3000;

// Conectar ao banco
connectDB();

// Criar servidor HTTP
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
