const Product = require('../models/Product');
const Distributor = require('../models/Distributor');


exports.create = async (req, res) => {
const { nome, descricao, preco, estoque, distribuidorId } = req.body;
if (!nome || preco == null) return res.status(400).json({ erro: 'Envie nome e preco' });
if (!distribuidorId) return res.status(400).json({ erro: 'É obrigatório informar um distribuidor' });


try {
// Verificar se o distribuidor existe e está ativo
const distribuidor = await Distributor.findById(distribuidorId);
if (!distribuidor) {
    return res.status(404).json({ erro: 'Distribuidor não encontrado' });
}
if (!distribuidor.ativo) {
    return res.status(400).json({ erro: 'O distribuidor informado não está ativo' });
}

const produto = new Product({ 
    nome, 
    descricao, 
    preco, 
    estoque: estoque || 0, 
    vendedor: req.user.id,
    distribuidor: distribuidorId 
});
await produto.save();

// Retorna o produto com o distribuidor populado
const produtoCriado = await Product.findById(produto._id)
    .populate('vendedor', 'nome email')
    .populate('distribuidor', 'nomeFantasia razaoSocial cnpj');

res.status(201).json(produtoCriado);
} catch (err) {
console.error(err);
res.status(500).json({ erro: 'Erro interno' });
}
};


exports.list = async (req, res) => {
try {
const { distribuidorId } = req.query;
const filtro = {};

// Filtro opcional por distribuidor
if (distribuidorId) {
    filtro.distribuidor = distribuidorId;
}

const produtos = await Product.find(filtro)
    .populate('vendedor', 'nome email')
    .populate('distribuidor', 'nomeFantasia razaoSocial cnpj endereco.cidade endereco.estado');
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

// Se estiver atualizando o distribuidor, validar
if (req.body.distribuidorId) {
    const distribuidor = await Distributor.findById(req.body.distribuidorId);
    if (!distribuidor) {
        return res.status(404).json({ erro: 'Distribuidor não encontrado' });
    }
    if (!distribuidor.ativo) {
        return res.status(400).json({ erro: 'O distribuidor informado não está ativo' });
    }
    req.body.distribuidor = req.body.distribuidorId;
    delete req.body.distribuidorId;
}

const updates = req.body;
Object.assign(produto, updates);
await produto.save();

// Retorna o produto atualizado com dados populados
const produtoAtualizado = await Product.findById(produto._id)
    .populate('vendedor', 'nome email')
    .populate('distribuidor', 'nomeFantasia razaoSocial cnpj');

res.json(produtoAtualizado);
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
