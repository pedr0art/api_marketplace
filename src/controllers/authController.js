const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
const { nome, email, senha, role } = req.body;
if (!nome || !email || !senha) return res.status(400).json({ erro: 'Envie nome, email e senha' });


try {
const existing = await User.findOne({ email });
if (existing) return res.status(409).json({ erro: 'E-mail já cadastrado' });


const hash = await bcrypt.hash(senha, 10);
const user = new User({ nome, email, senha: hash, role });
await user.save();


return res.status(201).json({ mensagem: 'Usuário criado' });
} catch (err) {
console.error(err);
return res.status(500).json({ erro: 'Erro interno' });
}
};


exports.login = async (req, res) => {
const { email, senha } = req.body;
if (!email || !senha) return res.status(400).json({ erro: 'Envie email e senha' });


try {
const user = await User.findOne({ email });
if (!user) return res.status(401).json({ erro: 'Credenciais inválidas' });


const match = await bcrypt.compare(senha, user.senha);
if (!match) return res.status(401).json({ erro: 'Credenciais inválidas' });


const token = jwt.sign({ id: user._id, role: user.role, nome: user.nome }, process.env.JWT_SECRET, { expiresIn: '7d' });


return res.json({ token });
} catch (err) {
console.error(err);
return res.status(500).json({ erro: 'Erro interno' });
}
};