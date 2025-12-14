const mongoose = require("mongoose");

async function connectDB(uri) {
  if (!uri) {
    throw new Error("URI do MongoDB não fornecida");
  }

  // 👇 evita reconectar se já estiver conectado
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB conectado");
  } catch (err) {
    console.error("Erro conectando ao MongoDB:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
