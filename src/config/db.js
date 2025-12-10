const mongoose = require('mongoose');

async function connectDB(uri) {
    // Se a URI não for passada, usa a padrão do .env
    const finalUri = uri || process.env.MONGO_URI;

    if (!finalUri) {
        console.error('MONGO_URI não definido e nenhuma URI foi fornecida');
        return;
    }

    try {
        await mongoose.connect(finalUri, {
            dbName: process.env.MONGO_DBNAME || undefined,
        });

        console.log(`MongoDB conectado → ${finalUri}`);
    } catch (err) {
        console.error('Erro conectando ao MongoDB:', err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
