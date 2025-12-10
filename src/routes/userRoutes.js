const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');


// Apenas admin deveria listar em um cenário real; aqui mostramos protegido
router.get('/', auth, userController.list);


module.exports = router;