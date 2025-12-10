// src/app.js
const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Middleware para trabalhar com JSON
app.use(express.json());

// Rotas
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send('API Marketplace funcionando! 🚀');
});

module.exports = app;
