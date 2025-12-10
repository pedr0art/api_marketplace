const Order = require('../models/Order');
const Product = require('../models/Product');


exports.create = async (req, res) => {
const { itens } = req.body; // itens: [{ produto: id, quantidade }]
if (!Array.isArray(itens) || itens.length === 0) return res.status(400).json({ erro: 'Itens do pedido inválidos' });


try {
// calcular total e checar estoque
let total = 0;
for (const item of itens) {
const p = await Product.findById(item.produto);
if (!p) return res.status(400).json({ erro: `Produto ${item.produto} não encontrado` });
if (p.estoque < item.quantidade) return res.status(400).json({ erro: `Estoque insuficiente para ${p.nome}` });
total += p.preco * item.quantidade;
}


const order = new Order({ usuario: req.user.id, itens, total });
await order.save();


// decrementar estoque (simples)
for (const item of itens) {
await Product.findByIdAndUpdate(item.produto, { $inc: { estoque: -item.quantidade } });
}


res.status(201).json(order);
} catch (err) {
console.error(err);
res.status(500).json({ erro: 'Erro interno' });
}
};


exports.listMy = async (req, res) => {
try {
const orders = await Order.find({ usuario: req.user.id }).populate('itens.produto');
res.json(orders);
} catch (err) {
console.error(err);
res.status(500).json({ erro: 'Erro interno' });
}
};