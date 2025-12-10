const Distributor = require('../models/Distributor');

// Cadastrar nova distribuidora
exports.create = async (req, res) => {
    const { razaoSocial, nomeFantasia, cnpj, email, telefone, endereco, responsavel } = req.body;

    if (!razaoSocial || !nomeFantasia || !cnpj || !email || !telefone || !endereco || !responsavel) {
        return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos' });
    }

    // Validação básica do CNPJ (14 dígitos)
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    if (cnpjLimpo.length !== 14) {
        return res.status(400).json({ erro: 'CNPJ inválido' });
    }

    try {
        // Verificar se já existe distribuidora com este CNPJ
        const existente = await Distributor.findOne({ cnpj: cnpjLimpo });
        if (existente) {
            return res.status(400).json({ erro: 'Já existe uma distribuidora cadastrada com este CNPJ' });
        }

        const distribuidora = new Distributor({
            razaoSocial,
            nomeFantasia,
            cnpj: cnpjLimpo,
            email,
            telefone,
            endereco,
            responsavel,
            cadastradoPor: req.user.id
        });

        await distribuidora.save();
        res.status(201).json(distribuidora);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro interno' });
    }
};

// Listar todas as distribuidoras
exports.list = async (req, res) => {
    try {
        const { ativo, cidade, estado } = req.query;
        const filtro = {};

        // Filtros opcionais
        if (ativo !== undefined) {
            filtro.ativo = ativo === 'true';
        }
        if (cidade) {
            filtro['endereco.cidade'] = new RegExp(cidade, 'i');
        }
        if (estado) {
            filtro['endereco.estado'] = new RegExp(estado, 'i');
        }

        const distribuidoras = await Distributor.find(filtro)
            .populate('cadastradoPor', 'nome email')
            .sort({ createdAt: -1 });

        res.json(distribuidoras);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro interno' });
    }
};

// Buscar distribuidora por ID
exports.getById = async (req, res) => {
    const { id } = req.params;

    try {
        const distribuidora = await Distributor.findById(id)
            .populate('cadastradoPor', 'nome email');

        if (!distribuidora) {
            return res.status(404).json({ erro: 'Distribuidora não encontrada' });
        }

        res.json(distribuidora);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro interno' });
    }
};

// Buscar distribuidora por CNPJ
exports.getByCnpj = async (req, res) => {
    const { cnpj } = req.params;
    const cnpjLimpo = cnpj.replace(/\D/g, '');

    try {
        const distribuidora = await Distributor.findOne({ cnpj: cnpjLimpo })
            .populate('cadastradoPor', 'nome email');

        if (!distribuidora) {
            return res.status(404).json({ erro: 'Distribuidora não encontrada' });
        }

        res.json(distribuidora);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro interno' });
    }
};

// Atualizar distribuidora
exports.update = async (req, res) => {
    const { id } = req.params;

    try {
        const distribuidora = await Distributor.findById(id);
        if (!distribuidora) {
            return res.status(404).json({ erro: 'Distribuidora não encontrada' });
        }

        // Apenas admin ou quem cadastrou pode alterar
        if (distribuidora.cadastradoPor && 
            distribuidora.cadastradoPor.toString() !== req.user.id && 
            req.user.role !== 'admin') {
            return res.status(403).json({ erro: 'Acesso negado' });
        }

        // Se estiver atualizando CNPJ, validar
        if (req.body.cnpj) {
            const cnpjLimpo = req.body.cnpj.replace(/\D/g, '');
            if (cnpjLimpo.length !== 14) {
                return res.status(400).json({ erro: 'CNPJ inválido' });
            }
            
            // Verificar se o novo CNPJ já existe em outra distribuidora
            const existente = await Distributor.findOne({ cnpj: cnpjLimpo, _id: { $ne: id } });
            if (existente) {
                return res.status(400).json({ erro: 'Já existe outra distribuidora com este CNPJ' });
            }
            req.body.cnpj = cnpjLimpo;
        }

        const updates = req.body;
        Object.assign(distribuidora, updates);
        await distribuidora.save();

        res.json(distribuidora);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro interno' });
    }
};

// Remover distribuidora
exports.remove = async (req, res) => {
    const { id } = req.params;

    try {
        const distribuidora = await Distributor.findById(id);
        if (!distribuidora) {
            return res.status(404).json({ erro: 'Distribuidora não encontrada' });
        }

        // Apenas admin pode deletar
        if (req.user.role !== 'admin') {
            return res.status(403).json({ erro: 'Apenas administradores podem remover distribuidoras' });
        }

        await distribuidora.deleteOne();
        res.json({ mensagem: 'Distribuidora removida com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro interno' });
    }
};

// Ativar/Desativar distribuidora
exports.toggleStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const distribuidora = await Distributor.findById(id);
        if (!distribuidora) {
            return res.status(404).json({ erro: 'Distribuidora não encontrada' });
        }

        // Apenas admin ou quem cadastrou pode alterar status
        if (distribuidora.cadastradoPor && 
            distribuidora.cadastradoPor.toString() !== req.user.id && 
            req.user.role !== 'admin') {
            return res.status(403).json({ erro: 'Acesso negado' });
        }

        distribuidora.ativo = !distribuidora.ativo;
        await distribuidora.save();

        res.json({ 
            mensagem: `Distribuidora ${distribuidora.ativo ? 'ativada' : 'desativada'} com sucesso`,
            ativo: distribuidora.ativo 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro interno' });
    }
};

