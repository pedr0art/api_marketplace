const Order = require('../models/Order');
const Product = require('../models/Product');

module.exports = {
  // Criar pedido com total automático
  async create(req, res) {
    try {
      const { usuario, itens } = req.body;

      if (!usuario) {
        return res.status(400).json({ error: 'Usuário é obrigatório' });
      }

      if (!itens || itens.length === 0) {
        return res.status(400).json({ error: 'Pedido sem itens' });
      }

      let total = 0;

      for (const item of itens) {
        const product = await Product.findById(item.produto);

        if (!product) {
          return res.status(400).json({ error: 'Produto não encontrado' });
        }

        if (product.estoque < item.quantidade) {
          return res.status(400).json({
            error: `Estoque insuficiente para ${product.nome}`
          });
        }

        total += product.preco * item.quantidade;
      }

      const order = await Order.create({
        usuario,
        itens,
        total
      });

      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async list(req, res) {
    try {
      const orders = await Order.find()
        .populate('usuario', 'nome email')
        .populate('itens.produto', 'nome preco');
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const order = await Order.findById(req.params.id)
        .populate('usuario', 'nome email')
        .populate('itens.produto', 'nome preco');

      if (!order) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

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

      if (!order) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      res.json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async remove(req, res) {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);

      if (!order) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      res.json({ message: 'Pedido removido' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
