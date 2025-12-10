const Product = require('../models/Product');


exports.create = async (req, res) => {
const { nome, descricao, preco, estoque } = req.body;
if (!nome || preco == null) return res.status(400).json({ erro: 'Envie nome e preco' });


try {
const produto = new Product({ nome, descricao, preco, estoque: estoque || 0, vendedor: req.user.id });
await produto.save();
res.status(201).json(produto);
} catch (err) {
console.error(err);
res.status(500).json({ erro: 'Erro interno' });
}
};


exports.list = async (req, res) => {
try {
const produtos = await Product.find().populate('vendedor', 'nome email');
res.json(produtos);
} catch (err) {
res.status(500).json({ erro: 'Erro interno' });
}
};


exports.update = async (req, res) => {
const { id } = req.params;


try {
const produto = await Product.findById(id);
if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });


// apenas o vendedor que criou ou admin pode alterar
if (produto.vendedor.toString() !== req.user.id && req.user.role !== 'admin') {
return res.status(403).json({ erro: 'Acesso negado' });
}


const updates = req.body;
Object.assign(produto, updates);
await produto.save();
res.json(produto);
} catch (err) {
console.error(err);
res.status(500).json({ erro: 'Erro interno' });
}
};


exports.remove = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await Product.findById(id);
    if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });

    // apenas o vendedor que criou ou admin pode deletar
    if (produto.vendedor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ erro: 'Acesso negado' });
    }

    await produto.deleteOne(); // ⬅️ CORREÇÃO AQUI

    res.json({ mensagem: 'Produto removido' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro interno' });
  }
};
