const Order = require('../models/Order.js');

module.exports = {
    async create(req, res) {
        try {
            const order = await Order.create(req.body);
            res.status(201).json(order);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async list(req, res) {
        try {
            const orders = await Order.find();
            res.json(orders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getById(req, res) {
        try {
            const order = await Order.findById(req.params.id);
            if (!order) return res.status(404).json({ error: 'Pedido não encontrado' });
            res.json(order);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const order = await Order.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!order) return res.status(404).json({ error: 'Pedido não encontrado' });
            res.json(order);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async remove(req, res) {
        try {
            const order = await Order.findByIdAndDelete(req.params.id);
            if (!order) return res.status(404).json({ error: 'Pedido não encontrado' });
            res.json({ message: 'Pedido removido' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
