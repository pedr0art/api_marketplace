const jwt = require('jsonwebtoken');


module.exports = function (req, res, next) {
const authHeader = req.headers.authorization;
if (!authHeader) return res.status(401).json({ erro: 'Token não enviado' });


const parts = authHeader.split(' ');
if (parts.length !== 2) return res.status(401).json({ erro: 'Formato do token inválido' });


const token = parts[1];


try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded;
return next();
} catch (err) {
return res.status(401).json({ erro: 'Token inválido' });
}
};