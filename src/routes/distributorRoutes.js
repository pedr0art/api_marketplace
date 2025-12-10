const express = require('express');
const router = express.Router();
const distributorController = require('../controllers/distributorController');
const auth = require('../middleware/auth');

// Rotas públicas (sem autenticação)
// Listar distribuidoras ativas (para consulta pública)
router.get('/public', async (req, res) => {
    const Distributor = require('../models/Distributor');
    try {
        const distribuidoras = await Distributor.find({ ativo: true })
            .select('nomeFantasia razaoSocial endereco.cidade endereco.estado telefone email')
            .sort({ nomeFantasia: 1 });
        res.json(distribuidoras);
    } catch (err) {
        res.status(500).json({ erro: 'Erro interno' });
    }
});

// Rotas protegidas (requerem autenticação)
// Cadastrar nova distribuidora
router.post('/', auth, distributorController.create);

// Listar todas as distribuidoras (com filtros)
router.get('/', auth, distributorController.list);

// Buscar distribuidora por ID
router.get('/:id', auth, distributorController.getById);

// Buscar distribuidora por CNPJ
router.get('/cnpj/:cnpj', auth, distributorController.getByCnpj);

// Atualizar distribuidora
router.put('/:id', auth, distributorController.update);

// Ativar/Desativar distribuidora
router.patch('/:id/status', auth, distributorController.toggleStatus);

// Remover distribuidora (apenas admin)
router.delete('/:id', auth, distributorController.remove);

module.exports = router;

