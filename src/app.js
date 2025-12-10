const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const distributorRoutes = require('./routes/distributorRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Montando as rotas:
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/distributors', distributorRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.send('API funcionando!');
});

module.exports = app;
