const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
nome: { type: String, required: true },
descricao: { type: String },
preco: { type: Number, required: true },
estoque: { type: Number, default: 0 },
vendedor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
distribuidor: { type: mongoose.Schema.Types.ObjectId, ref: 'Distributor', required: true }
}, { timestamps: true });


module.exports = mongoose.model('Product', ProductSchema);