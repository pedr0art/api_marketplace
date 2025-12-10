const mongoose = require('mongoose');


const OrderItemSchema = new mongoose.Schema({
produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
quantidade: { type: Number, required: true, min: 1 }
});


const OrderSchema = new mongoose.Schema({
usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
itens: [OrderItemSchema],
total: { type: Number, required: true },
status: { type: String, default: 'pendente', enum: ['pendente', 'confirmado', 'cancelado'] }
}, { timestamps: true });


module.exports = mongoose.model('Order', OrderSchema);