const mongoose = require('mongoose');


async function connectDB() {
if (!process.env.MONGO_URI) {
console.error('MONGO_URI não definido em process.env');
return;
}


try {
await mongoose.connect(process.env.MONGO_URI, {
dbName: process.env.MONGO_DBNAME || undefined,
});
console.log('MongoDB conectado');
} catch (err) {
console.error('Erro conectando ao MongoDB:', err.message);
process.exit(1);
}
}


module.exports = connectDB;