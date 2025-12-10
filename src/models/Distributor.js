const mongoose = require('mongoose');

const DistributorSchema = new mongoose.Schema({
    razaoSocial: { type: String, required: true },
    nomeFantasia: { type: String, required: true },
    cnpj: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
    endereco: {
        logradouro: { type: String, required: true },
        numero: { type: String, required: true },
        complemento: { type: String },
        bairro: { type: String, required: true },
        cidade: { type: String, required: true },
        estado: { type: String, required: true },
        cep: { type: String, required: true }
    },
    responsavel: { type: String, required: true },
    ativo: { type: Boolean, default: true },
    cadastradoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Distributor', DistributorSchema);

